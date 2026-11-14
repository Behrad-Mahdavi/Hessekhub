// apps/api/src/modules/finance-ledger/finance-ledger.service.ts
import { Injectable } from "@nestjs/common";
import { prisma, LedgerEntryType, Invoice } from "@hessekhub/database";
import { ZarinpalAdapter } from "./payment-gateway.adapter";

@Injectable()
export class FinanceLedgerService {
  constructor(private readonly paymentGateway: ZarinpalAdapter) {}

  async createInvoice(
    customerId: string,
    subtotalToman: bigint,
    subscriptionId?: string,
    discountToman: bigint = BigInt(0)
  ): Promise<Invoice> {
    const payableToman = subtotalToman - discountToman;
    const invoiceNumber = "INV-" + Date.now().toString().slice(-8);

    return prisma.invoice.create({
      data: {
        invoiceNumber,
        customerId,
        subscriptionId,
        subtotalToman,
        discountToman,
        payableToman,
        isPaid: false,
      },
    });
  }

  async initiatePayment(invoiceId: string, mobile?: string) {
    const invoice = await prisma.invoice.findUniqueOrThrow({ where: { id: invoiceId } });
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment/callback`;

    const { authority, paymentUrl } = await this.paymentGateway.requestPayment(invoice.payableToman, callbackUrl, mobile);

    await prisma.paymentTransaction.create({
      data: {
        invoiceId: invoice.id,
        gateway: "ZARINPAL",
        authority,
        amountToman: invoice.payableToman,
        status: "INITIATED",
      },
    });

    return { authority, paymentUrl };
  }

  async recordLedgerEntry(
    walletId: string,
    entryType: LedgerEntryType,
    amountToman: bigint,
    description: string,
    referenceId?: string
  ) {
    const entry = await prisma.ledgerEntry.create({
      data: {
        walletId,
        entryType,
        amountToman,
        description,
        referenceId,
      },
    });

    // Update wallet balance
    await prisma.wallet.update({
      where: { id: walletId },
      data: {
        balanceToman: {
          increment: amountToman,
        },
      },
    });

    return entry;
  }
}

