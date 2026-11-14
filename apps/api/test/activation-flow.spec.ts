// apps/api/test/activation-flow.integration-spec.ts
import { prisma, SubscriptionStatus, UserRole, FitnessGoal, ActivityLevel, Gender } from "@hessekhub/database";
import { ActivationService } from "../src/modules/finance-ledger/activation.service";
import { FinanceLedgerService } from "../src/modules/finance-ledger/finance-ledger.service";
import { ZarinpalAdapter } from "../src/modules/finance-ledger/payment-gateway.adapter";
import { RotationalMenuAllocatorService } from "../src/modules/nutrition-engine/rotational-menu-allocator.service";

describe("End-to-End Activation Flow (Integration Test)", () => {
  let activationService: ActivationService;
  let financeLedgerService: FinanceLedgerService;
  let testCustomerId: string;
  let testUserId: string;

  beforeAll(async () => {
    const paymentGateway = new ZarinpalAdapter();
    const menuAllocator = new RotationalMenuAllocatorService();
    financeLedgerService = new FinanceLedgerService(paymentGateway);
    activationService = new ActivationService(paymentGateway, menuAllocator);

    // Create a dedicated test user & customer
    const user = await prisma.user.create({
      data: {
        mobile: "09990001122",
        role: UserRole.CUSTOMER,
        fullName: "کاربر تست تراکنش",
      },
    });
    testUserId = user.id;

    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
        referralCode: "TEST-ACT-01",
      },
    });
    testCustomerId = customer.id;

    // Create HealthProfile
    await prisma.healthProfile.create({
      data: {
        customerId: customer.id,
        gender: Gender.MALE,
        birthYearShamsi: 1370,
        heightCm: 182,
        startingWeightKg: 85,
        targetWeightKg: 78,
        activityLevel: ActivityLevel.MODERATELY_ACTIVE,
        goal: FitnessGoal.WEIGHT_LOSS,
        isMedicalHighRisk: false,
        calculatedBmr: 1850,
        calculatedTdee: 2200,
      },
    });
  });

  afterAll(async () => {
    // Cleanup test records
    await prisma.menuAssignment.deleteMany({ where: { customerId: testCustomerId } });
    await prisma.caloriePlan.deleteMany({ where: { subscription: { customerId: testCustomerId } } });
    await prisma.paymentTransaction.deleteMany({ where: { invoice: { customerId: testCustomerId } } });
    await prisma.invoice.deleteMany({ where: { customerId: testCustomerId } });
    await prisma.subscription.deleteMany({ where: { customerId: testCustomerId } });
    await prisma.healthProfile.deleteMany({ where: { customerId: testCustomerId } });
    await prisma.customer.deleteMany({ where: { id: testCustomerId } });
    await prisma.user.deleteMany({ where: { id: testUserId } });
    await prisma.$disconnect();
  });

  it("should execute full flow: Pending Subscription -> Invoice -> Payment -> Instant Activation & Weekly Menu", async () => {
    // 1. Pick a seeded MealCoverageTier (e.g. Executive Workday or Full Board)
    const tier = await prisma.mealCoverageTier.findFirstOrThrow({
      where: { isActive: true },
    });

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + tier.daysCount);

    // 2. Create pending subscription
    const subscription = await prisma.subscription.create({
      data: {
        customerId: testCustomerId,
        coverageTierId: tier.id,
        status: SubscriptionStatus.PENDING_PAYMENT,
        startDate,
        endDate,
      },
    });
    expect(subscription.status).toBe(SubscriptionStatus.PENDING_PAYMENT);

    // 3. Create invoice & initiate payment
    const invoice = await financeLedgerService.createInvoice(
      testCustomerId,
      tier.basePriceToman,
      subscription.id
    );
    expect(invoice.isPaid).toBe(false);

    const payment = await financeLedgerService.initiatePayment(invoice.id, "09990001122");
    expect(payment.authority).toBeDefined();

    // 4. Simulate payment gateway callback verification
    const activationResult = await activationService.processPaymentCallback(payment.authority);

    expect(activationResult.success).toBe(true);
    expect(activationResult.status).toBe(SubscriptionStatus.ACTIVE);
    expect(activationResult.redirectUrl).toContain("/app/today");

    // 5. Verify database state transitions
    const updatedSub = await prisma.subscription.findUniqueOrThrow({
      where: { id: subscription.id },
      include: { caloriePlans: true, invoices: true },
    });
    expect(updatedSub.status).toBe(SubscriptionStatus.ACTIVE);

    const updatedInvoice = await prisma.invoice.findUniqueOrThrow({
      where: { id: invoice.id },
      include: { transactions: true },
    });
    expect(updatedInvoice.isPaid).toBe(true);
    expect(updatedInvoice.transactions[0]?.status).toBe("VERIFIED");

    // 6. Verify CaloriePlan is generated
    expect(updatedSub.caloriePlans.length).toBeGreaterThanOrEqual(1);
    const plan = updatedSub.caloriePlans[0]!;
    expect(plan.packageKcal).toBeGreaterThan(0);
    expect(plan.proteinGrams).toBeGreaterThan(0);

    // 7. Verify MenuAssignments are populated
    const assignments = await prisma.menuAssignment.findMany({
      where: { subscriptionId: subscription.id },
    });
    expect(assignments.length).toBeGreaterThanOrEqual(1);
    expect(assignments[0]?.qrFeedbackToken).toBeDefined();
  });
});
