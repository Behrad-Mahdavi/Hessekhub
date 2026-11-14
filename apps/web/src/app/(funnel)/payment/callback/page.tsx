// apps/web/src/app/(funnel)/payment/callback/page.tsx
import React, { Suspense } from "react";
import { Metadata } from "next";
import { PaymentCallbackClient } from "./PaymentCallbackClient";

export const metadata: Metadata = {
  title: "نتیجه تراکنش و فعال‌سازی اشتراک | حس خوب مشهد",
  description: "وضعیت تایید پرداخت و فعال‌سازی اشتراک بسته غذای رژیمی حس خوب مشهد.",
};

export default function PaymentCallbackPage() {
  return (
    <main className="w-full min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-md mx-auto px-4 py-20 text-center text-muted text-sm">
            در حال بارگذاری وضعیت پرداخت...
          </div>
        }
      >
        <PaymentCallbackClient />
      </Suspense>
    </main>
  );
}

