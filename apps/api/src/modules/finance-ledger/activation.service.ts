// apps/api/src/modules/finance-ledger/activation.service.ts
import { Injectable, BadRequestException, Logger } from "@nestjs/common";
import { prisma, SubscriptionStatus, CalorieDecisionAction } from "@hessekhub/database";
import { ZarinpalAdapter } from "./payment-gateway.adapter";
import { RotationalMenuAllocatorService } from "../nutrition-engine/rotational-menu-allocator.service";

export interface ActivationResult {
  success: boolean;
  status: SubscriptionStatus;
  refId?: string;
  subscriptionId?: string;
  redirectUrl: string;
  message: string;
}

@Injectable()
export class ActivationService {
  private readonly logger = new Logger(ActivationService.name);

  constructor(
    private readonly paymentGateway: ZarinpalAdapter,
    private readonly menuAllocator: RotationalMenuAllocatorService
  ) {}

  async processPaymentCallback(authority: string): Promise<ActivationResult> {
    const transaction = await prisma.paymentTransaction.findUnique({
      where: { authority },
      include: {
        invoice: {
          include: {
            subscription: {
              include: {
                coverageTier: true,
                customer: {
                  include: {
                    healthProfiles: { orderBy: { version: "desc" }, take: 1 },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      throw new BadRequestException("تراکنش یافت نشد.");
    }

    if (transaction.status === "VERIFIED") {
      return {
        success: true,
        status: transaction.invoice.subscription?.status || SubscriptionStatus.ACTIVE,
        refId: transaction.refId || undefined,
        subscriptionId: transaction.invoice.subscriptionId || undefined,
        redirectUrl: "/app/today",
        message: "این تراکنش قبلاً با موفقیت تایید و فعال شده است.",
      };
    }

    // Verify with Payment Gateway
    const verifyResult = await this.paymentGateway.verifyPayment(authority, transaction.amountToman);

    if (!verifyResult.isSuccess) {
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: { status: "FAILED" },
      });
      return {
        success: false,
        status: SubscriptionStatus.PENDING_PAYMENT,
        redirectUrl: "/checkout?status=failed",
        message: verifyResult.message,
      };
    }

    // Mark transaction verified & invoice paid
    await prisma.paymentTransaction.update({
      where: { id: transaction.id },
      data: {
        status: "VERIFIED",
        refId: verifyResult.refId,
      },
    });

    await prisma.invoice.update({
      where: { id: transaction.invoiceId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    const subscription = transaction.invoice.subscription;
    if (!subscription) {
      return {
        success: true,
        status: SubscriptionStatus.ACTIVE,
        refId: verifyResult.refId,
        redirectUrl: "/cafe/checkout?status=confirmed",
        message: "پرداخت سفارش کافه با موفقیت تایید شد.",
      };
    }

    // Automatic Activation Flow for Subscription
    const customer = subscription.customer;
    const latestHealthProfile = customer.healthProfiles[0];
    const isHighRisk = latestHealthProfile?.isMedicalHighRisk || false;

    const targetStatus = isHighRisk
      ? SubscriptionStatus.PENDING_MEDICAL_REVIEW
      : SubscriptionStatus.ACTIVE;

    // Transition Subscription status
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: targetStatus },
    });

    const tier = subscription.coverageTier;
    const targetKcal = latestHealthProfile?.calculatedTdee || 1800;

    // Generate Week 1 CaloriePlan
    const packageKcal = Math.round((targetKcal * tier.calorieSharePercent) / 100);
    const homePlateKcal = targetKcal - packageKcal;

    await prisma.caloriePlan.create({
      data: {
        subscriptionId: subscription.id,
        effectiveFrom: subscription.startDate,
        totalDailyKcal: targetKcal,
        packageKcal,
        homePlateKcal,
        proteinGrams: Math.round((targetKcal * 0.3) / 4),
        carbsGrams: Math.round((targetKcal * 0.45) / 4),
        fatGrams: Math.round((targetKcal * 0.25) / 9),
        decisionAction: CalorieDecisionAction.MAINTAIN,
        reasonFa: isHighRisk
          ? "ارجاع به سرپرست تغذیه جهت بررسی شرایط پزشکی پرخطر."
          : "فعال‌سازی آنی سیستم بر پایه آنالیز متابولیک هفته اول.",
      },
    });

    // Populate Rotational Menu Assignments for subscription active days
    await this.menuAllocator.allocateSubscriptionDays({
      subscriptionId: subscription.id,
      customerId: customer.id,
      calorieTierKcal: targetKcal,
      startDate: subscription.startDate,
      daysCount: tier.daysCount,
      includedMealTypes: tier.includedMealTypes,
      userAllergies: latestHealthProfile?.allergies || [],
      dislikedIngredients: latestHealthProfile?.dislikedIngredients || [],
      frozenDates: subscription.frozenDates,
    });

    // Fire Analytics Event (Module I)
    await prisma.analyticsEvent.create({
      data: {
        eventName: "subscription_activated",
        customerId: customer.id,
        properties: {
          subscriptionId: subscription.id,
          tierType: tier.tierType,
          isHighRisk,
          amountToman: Number(transaction.amountToman),
        },
      },
    });

    this.logger.log(`[Activation] Subscription ${subscription.id} successfully activated (Status: ${targetStatus})`);

    return {
      success: true,
      status: targetStatus,
      refId: verifyResult.refId,
      subscriptionId: subscription.id,
      redirectUrl: isHighRisk ? "/app/today?notice=medical_review" : "/app/today?notice=welcome",
      message: isHighRisk
        ? "پرداخت شما با موفقیت ثبت شد و پلن شما ظرف حداکثر ۲ ساعت توسط کارشناس تغذیه تایید می‌شود."
        : "اشتراک شما بلافاصله فعال شد و برنامه غذایی هفته اول شما تخصیص یافت.",
    };
  }
}

