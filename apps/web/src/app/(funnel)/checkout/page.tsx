// apps/web/src/app/(funnel)/checkout/page.tsx
import React, { Suspense } from "react";
import { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "تسویه حساب و پرداخت پکیج | حس خوب مشهد",
  description: "انتخاب آدرس تحویل در مشهد و پرداخت آنلاین از طریق درگاه بانکی شاپرک.",
};

export default function CheckoutPage() {
  return (
    <main className="w-full py-10 md:py-16">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-4 text-center py-20 text-muted text-sm">
            در حال بارگذاری صفحه پرداخت...
          </div>
        }
      >
        <CheckoutClient />
      </Suspense>
    </main>
  );
}

