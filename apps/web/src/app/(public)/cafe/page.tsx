// apps/web/src/app/(public)/cafe/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";
import { ChapterNav } from "@/components/navigation/ChapterNav";
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

const CAFE_CHAPTERS = [
  { href: "/cafe", label: "کافه‌بوتیک سجاد", badge: "شعبه مرکزی" },
  { href: "/cafe/menu", label: "منوی آنلاین و سفارش" },
  { href: "/programs", label: "پکیج‌های رژیمی" },
  { href: "/cafe/checkout", label: "سبد سفارش" },
];

export default function CafeLandingPage() {
  const saladGlyph = BRAND_GLYPHS["salad-bowl"];

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

      {/* ChapterNav */}
      <ChapterNav items={CAFE_CHAPTERS} ariaLabel="کافه‌بوتیک حس خوب" />

      <main className="w-full py-12 md:py-20 bg-canvas">
        <div className="max-w-container mx-auto px-4 md:px-8">
          
          {/* Direct Answer Capsule (AEO) */}
          <DirectAnswerCapsule
            question="کافه‌بوتیک سلامت حس خوب مشهد کجاست و چه امکاناتی دارد؟"
            answer="کافه‌بوتیک حس خوب در بلوار سجاد (بهارستان ۲) مشهد واقع شده و همه‌روزه از ۸ صبح تا ۲۴ بامداد دایر است. این کافه فضایی اختصاصی برای نوشیدنی‌های سلامت، برانچ پروتئینی، سالادهای ارگانیک و ایستگاه تحویل حضوری پکیج‌های رژیمی مشترکین بدون هزینه پیک می‌باشد."
          />

          {/* Monumental Hero (Apple Retail Style) */}
          <section className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-surface border border-border-subtle shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-strong">
                شعبه حضوری بلوار سجاد مشهد · از سال ۱۳۹۷
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-strong mb-6 leading-tight tracking-normal">
              کافه‌بوتیک سلامت؛ آرامش، طعم اصیل و نشاط پایدار.
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
              فضایی دنج و فاخر در قلب بلوار سجاد مشهد برای آنان که به سلامت خود احترام می‌گذارند. منوی برانچ پروتئینی، قهوه تخصصی و نوشیدنی‌های بدون شکر افزوده.
            </p>

            {/* Dual Action Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
              <Link href="/cafe/menu">
                <Button variant="primary" size="lg" className="rounded-pill px-8 text-sm font-bold shadow-xs">
                  مشاهده منوی دیجیتال و سفارش
                </Button>
              </Link>
              <a href="tel:05137660000" dir="ltr">
                <Button variant="secondary" size="lg" className="rounded-pill px-8 text-sm font-bold text-primary border-primary/30">
                  رزرو و تماس: ۰۵۱-۳۷۶۶۰۰۰۰
                </Button>
              </a>
            </div>

            {/* Apple Retail Store Showcase Card */}
            <div className="rounded-3xl bg-surface border border-border-subtle p-8 sm:p-12 shadow-xs text-start">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="text-xs font-bold text-accent uppercase block mb-1">
                    فضای حضور و دیدار
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-strong mb-4">
                    فراتر از یک کافه؛ ایستگاه مرکزی سبک زندگی سالم.
                  </h2>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    در کافه‌بوتیک حس خوب، هر نوشیدنی و بشقاب غذایی با شناسنامه کالری و مواد ارگانیک سرو می‌شود. همچنین مشترکین پکیج‌های رژیمی می‌توانند بدون پرداخت هزینه پیک، وعده‌های روزانه خود را روزانه به صورت حضوری تحویل بگیرند.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-canvas border border-border-subtle">
                      <span className="font-bold text-strong block mb-0.5">ساعات فعالیت:</span>
                      <span className="text-muted">۸:۰۰ صبح تا ۲۴:۰۰ بامداد</span>
                    </div>
                    <div className="p-3 rounded-xl bg-canvas border border-border-subtle">
                      <span className="font-bold text-strong block mb-0.5">نشانی دقیق:</span>
                      <span className="text-muted">سجاد، خیابان بهارستان ۲، پلاک ۱۸</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full aspect-square rounded-2xl bg-canvas border border-border-subtle flex items-center justify-center p-8">
                    {saladGlyph && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={saladGlyph.path}
                        alt="کافه‌بوتیک سلامت"
                        className="w-40 h-40 object-contain drop-shadow-sm"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3 Experience Pillars (Apple Style Bento) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-8 rounded-3xl bg-surface border border-border-subtle text-start shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-calm text-primary flex items-center justify-center font-bold text-lg mb-4">
                ☕
              </div>
              <h3 className="text-xl font-bold text-strong mb-2">قهوه تخصصی و بار سرد</h3>
              <p className="text-xs text-muted leading-relaxed">
                دانه‌های دست‌چین اسپشیالتی عربیکا، شیرهای گیاهی بدون لاکتوز (بادام، جو دوسر) و دمنوش‌های درمانی سرشار از آنتی‌اکسیدان.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface border border-border-subtle text-start shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-calm text-primary flex items-center justify-center font-bold text-lg mb-4">
                🥑
              </div>
              <h3 className="text-xl font-bold text-strong mb-2">برانچ و کاسه‌های پروتئینی</h3>
              <p className="text-xs text-muted leading-relaxed">
                تست‌های آووکادو روی نان خمیرترش دست‌ساز، کاسه‌های اسموتی غنی‌شده با پروتئین ایزوله و تخم‌مرغ‌های ارگانیک.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface border border-border-subtle text-start shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-calm text-primary flex items-center justify-center font-bold text-lg mb-4">
                📦
              </div>
              <h3 className="text-xl font-bold text-strong mb-2">ایستگاه تحویل مشترکین</h3>
              <p className="text-xs text-muted leading-relaxed">
                تحویل حضوری بسته‌های روزانه رژیمی با حفظ زنجیره سرما، صرفه‌جویی در هزینه پیک و امکان گپ‌وگفت با مشاورین تغذیه.
              </p>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
