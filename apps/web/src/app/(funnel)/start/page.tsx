// apps/web/src/app/(funnel)/start/page.tsx
import React, { Suspense } from "react";
import { Metadata } from "next";
import { StartFunnelClient } from "./StartFunnelClient";

export const metadata: Metadata = {
  title: "ثبت‌نام و تنظیم برنامه اختصاصی | حس خوب مشهد",
  description:
    "مراحل ۶گانه تعیین کالری هدف، غربالگری سلامت، انتخاب سطح پوشش وعده و فعال‌سازی پکیج غذای رژیمی حس خوب مشهد.",
};

export default function StartPage() {
  return (
    <main className="w-full py-10 md:py-16">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-4 text-center py-20 text-muted text-sm">
            در حال بارگذاری فرم هوشمند...
          </div>
        }
      >
        <StartFunnelClient />
      </Suspense>
    </main>
  );
}

