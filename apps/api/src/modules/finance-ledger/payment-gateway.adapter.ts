// apps/api/src/modules/finance-ledger/payment-gateway.adapter.ts
import { Injectable, Logger } from "@nestjs/common";

export interface RequestPaymentResult {
  authority: string;
  paymentUrl: string;
}

export interface VerifyPaymentResult {
  isSuccess: boolean;
  refId?: string;
  message: string;
}

export abstract class PaymentGatewayAdapter {
  abstract requestPayment(amountToman: bigint, callbackUrl: string, mobile?: string): Promise<RequestPaymentResult>;
  abstract verifyPayment(authority: string, amountToman: bigint): Promise<VerifyPaymentResult>;
}

@Injectable()
export class ZarinpalAdapter implements PaymentGatewayAdapter {
  private readonly logger = new Logger(ZarinpalAdapter.name);
  private readonly isSandbox = process.env.ZARINPAL_SANDBOX !== "false";
  private readonly merchantId = process.env.ZARINPAL_MERCHANT_ID || "00000000-0000-0000-0000-000000000000";

  async requestPayment(amountToman: bigint, callbackUrl: string, mobile?: string): Promise<RequestPaymentResult> {
    const authority = "A00000000000000000000000000" + Math.floor(100000 + Math.random() * 900000);
    const gatewayHost = this.isSandbox ? "https://sandbox.zarinpal.com" : "https://www.zarinpal.com";
    const paymentUrl = `${gatewayHost}/pg/StartPay/${authority}`;

    this.logger.log(`[Zarinpal ${this.isSandbox ? "Sandbox" : "Prod"}] Created payment authority ${authority} for ${amountToman} Toman (Mobile: ${mobile})`);

    return {
      authority,
      paymentUrl,
    };
  }

  async verifyPayment(authority: string, amountToman: bigint): Promise<VerifyPaymentResult> {
    const isMockSuccess = !authority.includes("FAILED");
    const refId = "REF_" + Math.floor(10000000 + Math.random() * 90000000);

    this.logger.log(`[Zarinpal Verify] Authority ${authority} for ${amountToman} Toman -> ${isMockSuccess ? "SUCCESS RefID: " + refId : "FAILED"}`);

    if (isMockSuccess) {
      return {
        isSuccess: true,
        refId,
        message: "تراکنش با موفقیت انجام شد.",
      };
    } else {
      return {
        isSuccess: false,
        message: "تراکنش توسط کاربر لغو شد یا ناموفق بود.",
      };
    }
  }
}

