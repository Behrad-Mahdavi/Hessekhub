// apps/web/src/app/(public)/cafe/menu/page.tsx
import React from "react";
import { Metadata } from "next";
import { getCafeMenuItems } from "@/lib/api";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { Badge } from "@hessekhub/ui";
import { CafeMenuClient } from "./CafeMenuClient";

export const revalidate = 1800; // 30-min ISR

export const metadata: Metadata = {
  title: "منوی دیجیتال کافه‌بوتیک سلامت حس خوب مشهد | برانچ، سالاد و قهوه تخصصی",
  description:
    "مشاهده آنلاین منوی کافه‌بوتیک حس خوب بلوار سجاد مشهد همراه با کالری دقیق، پروتئین و ماکروها. امکان سفارش آنلاین جهت میل در کافه یا ارسال فوری.",
  alternates: {
    canonical: "https://hessekhub.ir/cafe/menu",
  },
};

export default async function CafeMenuPage() {
  const items = await getCafeMenuItems();

  const menuSchema = {
    "@type": "Menu",
    "@id": "https://hessekhub.ir/cafe/menu#menu",
    name: "منوی دیجیتال کافه‌بوتیک سلامت حس خوب",
    hasMenuItem: items.map((item) => ({
      "@type": "MenuItem",
      name: item.titleFa,
      description: item.descriptionFa,
      offers: {
        "@type": "Offer",
        price: Number(item.priceToman),
        priceCurrency: "IRR",
      },
      nutrition: {
        "@type": "NutritionInformation",
        calories: `${item.caloriesKcal} calories`,
        proteinContent: `${item.proteinGrams} grams`,
        carbohydrateContent: `${item.carbsGrams} grams`,
        fatContent: `${item.fatGrams} grams`,
      },
    })),
  };

  const clientItems = items.map((item) => ({
    id: item.id,
    nameFa: item.titleFa,
    descriptionFa: item.descriptionFa,
    categoryFa: item.categoryFa,
    priceToman: Number(item.priceToman),
    calories: item.caloriesKcal,
    proteinGrams: item.proteinGrams,
    carbsGrams: item.carbsGrams,
    fatGrams: item.fatGrams,
    allergens: item.allergens,
    isAvailable: item.isAvailable,
  }));

  return (
    <>
      <JsonLdGraph customSchemas={[menuSchema]} />

      <main className="w-full py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* Direct Answer Capsule (AEO) */}
          <DirectAnswerCapsule
            question="منوی کافه‌بوتیک سلامت حس خوب مشهد شامل چه غذاها و نوشیدنی‌هایی است؟"
            answer="منوی کافه‌بوتیک حس خوب در سجاد مشهد شامل انواع صبحانه و برانچ پروتئینی، سالادهای دست‌ساز با فیله مرغ یا بوقلمون ارگانیک، میان‌وعده‌های بدون قند صنعتی، اسموتی‌های پروتئینی و قهوه‌های تخصصی ۱۰۰٪ عربیکا است که همگی با درج دقیق کالری و ماکروها سرو می‌شوند."
          />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="luxe" size="md" className="mb-4">
              منوی سلامت کافه‌بوتیک سجاد مشهد
            </Badge>

            <h1 className="text-3xl md:text-5xl font-extrabold text-strong mb-4">
              منوی دیجیتال حس خوب
            </h1>

            <p className="text-sm md:text-base text-muted leading-relaxed">
              هر غذا با وسواس در کیفیت مواد اولیه، بدون روغن‌های پالم و بدون شکر تصفیه‌شده تهیه می‌شود.
            </p>
          </div>

          <CafeMenuClient initialItems={clientItems} />
        </div>
      </main>
    </>
  );
}
