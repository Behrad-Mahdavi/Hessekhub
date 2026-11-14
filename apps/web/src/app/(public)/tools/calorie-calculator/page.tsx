// apps/web/src/app/(public)/tools/calorie-calculator/page.tsx
import React from "react";
import { Metadata } from "next";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { Badge } from "@hessekhub/ui";
import { CalorieCalculatorClient } from "./CalorieCalculatorClient";

export const metadata: Metadata = {
  title: "محاسبه‌گر آنلاین BMR و کالری هدف | حس خوب مشهد",
  description:
    "محاسبه آنلاین و دقیق متابولیسم پایه (BMR) و کالری روزانه (TDEE) با فرمول میفلین-سنت جور جهت رژیم لاغری یا عضله‌سازی در مشهد.",
  alternates: {
    canonical: "https://hessekhub.ir/tools/calorie-calculator",
  },
};

export default function CalorieCalculatorPage() {
  return (
    <>
      <JsonLdGraph />

      <main className="w-full py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* Direct Answer Capsule (AEO) */}
          <DirectAnswerCapsule
            question="فرمول محاسبه کالری و BMR در حس خوب مشهد چگونه کار می‌کند؟"
            answer="ماشین‌حساب حس خوب بر پایه استاندارد طلایی بالینی میفلین-سنت جور (Mifflin-St Jeor) با ارزیابی جنسیت، سن، قد، وزن و ضریب فعالیت فیزیکی، ابتدا متابولیسم پایه (BMR) و کل انرژی مصرفی (TDEE) را محاسبه نموده و سپس با اعمال کسری استاندارد ایمن، کالری هدف را به نزدیک‌ترین تیپ استاندارد آشپزخانه (۱۲۰۰ تا ۲۵۰۰ کیلوکالری) متصل می‌کند."
          />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="primary" size="md" className="mb-4">
              ابزار هوشمند سنجش بیومتریک
            </Badge>

            <h1 className="text-3xl md:text-5xl font-extrabold text-strong mb-4">
              محاسبه آنلاین کالری و متابولیسم
            </h1>

            <p className="text-sm md:text-base text-muted leading-relaxed">
              مشخصات خود را وارد کنید تا بهترین تیپ کالری و توزیع پروتئین و ماکروهای پکیج شما بلافاصله مشخص شود.
            </p>
          </div>

          <CalorieCalculatorClient />
        </div>
      </main>
    </>
  );
}

