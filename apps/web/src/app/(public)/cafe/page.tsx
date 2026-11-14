// apps/web/src/app/(public)/cafe/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LeafCard, Card, Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const metadata: Metadata = {
  title: "کافه‌بوتیک سلامت حس خوب مشهد (سجاد) | قهوه تخصصی و منوی پروتئینی",
  description:
    "کافه‌بوتیک سلامت حس خوب در بلوار سجاد مشهد (فعال از ۱۳۹۷). قهوه تخصصی، برانچ و سالادهای سلامت، ناهار پروتئینی و تحویل حضوری پکیج‌های رژیمی مشترکین.",
  alternates: {
    canonical: "https://hessekhub.ir/cafe",
  },
};

export default function CafeLandingPage() {
  const saladGlyph = BRAND_GLYPHS["salad-bowl"];
  const avocadoGlyph = BRAND_GLYPHS["avocado"];
  const bottleGlyph = BRAND_GLYPHS["water-bottle"];

  const cafeSchema = {
    "@type": "CafeOrCoffeeShop",
    "@id": "https://hessekhub.ir/cafe#place",
    name: "کافه‌بوتیک سلامت حس خوب (سجاد مشهد)",
    telephone: "05137660000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "مشهد، بلوار سجاد، خیابان بهارستان، بهارستان ۲",
      addressLocality: "Mashhad",
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.3155,
      longitude: 59.5421,
    },
    openingHours: "Mo-Su 08:00-24:00",
    servesCuisine: "Healthy, Specialty Coffee, Protein Brunch, Fresh Salads",
    priceRange: "$$",
  };

  return (
    <>
      <JsonLdGraph customSchemas={[cafeSchema]} />

      <main className="w-full py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* Direct Answer Capsule (AEO) */}
          <DirectAnswerCapsule
            question="کافه‌بوتیک سلامت حس خوب مشهد کجاست و چه امکاناتی دارد؟"
            answer="کافه‌بوتیک حس خوب در بلوار سجاد (بهارستان ۲) مشهد واقع شده و همه‌روزه از ۸ صبح تا ۲۴ بامداد دایر است. این کافه فضایی اختصاصی برای نوشیدنی‌های سلامت، برانچ پروتئینی، سالادهای ارگانیک و ایستگاه تحویل حضوری پکیج‌های رژیمی مشترکین بدون هزینه پیک می‌باشد."
          />

          {/* Hero Leaf */}
          <LeafCard glowBorder className="mb-16 p-8 md:p-12 text-start">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <Badge variant="luxe" size="md" className="mb-4">
                  کافه‌بوتیک سلامت حس خوب (شعبه مرکزی سجاد مشهد)
                </Badge>

                <h1 className="text-3xl md:text-5xl font-extrabold text-strong mb-6 leading-tight">
                  طعم ناب قهوه تخصصی و برانچ پروتئینی در فضایی آرام
                </h1>

                <p className="text-base md:text-lg text-muted leading-relaxed mb-8">
                  اولین کافه‌بوتیک سلامت مشهد (تأسیس ۱۳۹۷) محلی است برای کسانی که به تغذیه پاک، شادابی جسم و زیبایی فضا اهمیت می‌دهند. بدون شکر صنعتی، بدون روغن‌های سرخ‌کردنی و با شفافیت کامل کالری و پروتئین هر بشقاب.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/cafe/menu">
                    <Button variant="primary" size="md">
                      مشاهده منوی دیجیتال و سفارش
                    </Button>
                  </Link>

                  <a
                    href="https://maps.google.com/?q=36.3155,59.5421"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="md">
                      مسیریابی در نقشه (گوگل مپ / نشان)
                    </Button>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4">
                <div className="w-full p-6 rounded-2xl bg-calm border border-border-default text-center">
                  <span className="text-xs font-bold text-primary block mb-1">
                    ساعات کاری کافه
                  </span>
                  <span className="text-xl font-extrabold text-strong block mb-3">
                    ۸:۰۰ صبح الی ۲۴:۰۰ بامداد
                  </span>
                  <span className="text-xs text-muted block">
                    مشهد، بلوار سجاد، بهارستان ۲
                  </span>
                </div>
              </div>
            </div>
          </LeafCard>

          {/* Highlights 3-col */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-start">
              <div className="w-12 h-12 rounded-xl bg-calm border border-border-default flex items-center justify-center mb-4">
                {saladGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={saladGlyph.path} alt="سالاد" className="w-6 h-6 object-contain" />
                )}
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">برانچ و سالادهای اختصاصی</h3>
              <p className="text-xs text-muted leading-relaxed">
                ترکیب سبزیجات ارگانیک تازه مشهد، فیله‌های طعم‌دار با ادویه‌های اصیل و سس‌های خانگی بر پایه روغن زیتون فرابکر و ماست یونانی.
              </p>
            </Card>

            <Card className="p-6 text-start">
              <div className="w-12 h-12 rounded-xl bg-calm border border-border-default flex items-center justify-center mb-4">
                {bottleGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={bottleGlyph.path} alt="نوشیدنی" className="w-6 h-6 object-contain" />
                )}
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">نوشیدنی‌های سم‌زدا و پروتئینی</h3>
              <p className="text-xs text-muted leading-relaxed">
                اسموتی‌های پروتئینی با پودر پروتئین ایزوله استاندارد، ماچا لاته طبیعی، دتاکس واترها و قهوه‌های تخصصی ۱۰۰٪ عربیکا.
              </p>
            </Card>

            <Card className="p-6 text-start">
              <div className="w-12 h-12 rounded-xl bg-calm border border-border-default flex items-center justify-center mb-4">
                {avocadoGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avocadoGlyph.path} alt="تحویل" className="w-6 h-6 object-contain" />
                )}
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">ایستگاه تحویل حضوری مشترکین</h3>
              <p className="text-xs text-muted leading-relaxed">
                مشترکین پکیج‌های رژیمی می‌توانند بسته‌های خود را هنگام ورزش صبحگاهی بدون هزینه پیک مستقیماً از کافه‌بوتیک سجاد تحویل بگیرند.
              </p>
            </Card>
          </div>

          {/* Menu Callout Banner */}
          <div className="p-8 md:p-12 rounded-3xl bg-surface border border-border-default text-center">
            <h2 className="text-2xl font-extrabold text-strong mb-3">
              منوی کامل دیجیتال کافه‌بوتیک حس خوب
            </h2>
            <p className="text-sm text-muted mb-8 max-w-xl mx-auto">
              مشاهده تمامی غذاها، سالادها و نوشیدنی‌ها همراه با مقادیر دقیق کالری، پروتئین، کربوهیدرات و امکان ثبت سفارش آنلاین:
            </p>
            <Link href="/cafe/menu">
              <Button variant="primary" size="md">
                مشاهده منو و سفارش آنلاین کافه
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

