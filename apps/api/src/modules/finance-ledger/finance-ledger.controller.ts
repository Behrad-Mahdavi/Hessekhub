// apps/api/src/modules/finance-ledger/finance-ledger.controller.ts
import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { FinanceLedgerService } from "./finance-ledger.service";
import { ActivationService } from "./activation.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CurrentUser, CurrentUserPayload } from "../../common/decorators/current-user.decorator";
import { prisma, SubscriptionStatus } from "@hessekhub/database";

@Controller("finance")
export class FinanceLedgerController {
  constructor(
    private readonly financeLedger: FinanceLedgerService,
    private readonly activationService: ActivationService
  ) {}

  // Protected: Checkout subscription (Creates pending Subscription & Invoice, initiates IPG)
  @Post("checkout/subscription")
  @UseGuards(AuthGuard)
  async checkoutSubscription(
    @CurrentUser() user: CurrentUserPayload,
    @Body("coverageTierId") coverageTierId: string,
    @Body("deliveryAddressId") deliveryAddressId?: string,
    @Body("deliverySlotId") deliverySlotId?: string
  ) {
    if (!coverageTierId) {
      throw new BadRequestException("شناسه پکیج غذایی (coverageTierId) الزامی است.");
    }

    const tier = await prisma.mealCoverageTier.findUniqueOrThrow({
      where: { id: coverageTierId },
    });

    let customerId = user.customerId;
    if (!customerId) {
      let customer = await prisma.customer.findFirst({
        where: { userId: user.userId },
      });
      if (!customer) {
        const referralCode = "HK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        customer = await prisma.customer.create({
          data: {
            userId: user.userId,
            referralCode,
          },
        });
      }
      customerId = customer.id;
    }

    const startDate = new Date();
    // Default to tomorrow
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);

    // Create DRAFT/PENDING_PAYMENT Subscription
    const subscription = await prisma.subscription.create({
      data: {
        customerId,
        coverageTierId: tier.id,
        status: SubscriptionStatus.PENDING_PAYMENT,
        startDate,
        endDate,
        deliveryAddressId,
        deliverySlotId,
      },
    });

    // Create Invoice
    const invoice = await this.financeLedger.createInvoice(
      customerId,
      tier.basePriceToman,
      subscription.id
    );

    // Initiate Payment Gateway
    const payment = await this.financeLedger.initiatePayment(invoice.id, user.mobile);

    return {
      subscriptionId: subscription.id,
      invoiceId: invoice.id,
      payableToman: Number(invoice.payableToman),
      authority: payment.authority,
      paymentUrl: payment.paymentUrl,
    };
  }

  // Public/Callback: Verify payment gateway callback
  @Get("verify")
  async verifyPaymentCallback(@Query("Authority") authority: string) {
    return this.activationService.processPaymentCallback(authority);
  }
}

