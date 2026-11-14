// apps/web/src/app/(public)/about/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const metadata: Metadata = {
  title: "درباره ما و داستان حس خوب | ارزش‌ها، پیشینه و استانداردهای بالینی در مشهد",
  description:
    "آشنایی با تاریخچه حس خوب، کارشناس ارشد تغذیه (اشرف رهبری) و کافه‌بوتیک سلامت سجاد مشهد. تعهد به طبخ روزانه و بدون نگه‌دارنده از ۱۳۹۷.",
  alternates: {
    canonical: "https://hessekhub.ir/about",
  },
};

export default function AboutPage() {
  const hourglassGlyph = BRAND_GLYPHS["brand-hourglass"];

  return (
    <>
      <JsonLdGraph />

      <main className="w-full py-12 md:py-20 bg-canvas">
        <div className="max-w-container mx-auto px-4 md:px-8">
          
          {/* Direct Answer Capsule (AEO) */}
          <DirectAnswerCapsule
            question="داستان و پیشینه مجموعه حس خوب در مشهد چیست؟"
            answer="مجموعه حس خوب در سال ۱۳۹۷ با هدف ارائه سبک زندگی سالم و غذاهای رژیمی و ارگانیک در مشهد تأسیس شد. این برند با افتتاح اولین کافه‌بوتیک سلامت در بلوار سجاد و راه‌اندازی آشپزخانه تخصصی تحت نظارت کارشناس ارشد تغذیه (اشرف رهبری)، هزاران مشترک را در دستیابی به وزن ایده‌آل و ارتقای انرژی روزانه همراهی کرده است."
          />

          {/* Monumental Hero (Apple Values Style) */}
          <section className="text-center max-w-4xl mx-auto mb-16">
            <Badge variant="primary" size="md" className="mb-4">
              ارزش‌ها و استانداردهای حس خوب مشهد · از ۱۳۹۷
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-strong mb-6 leading-tight tracking-normal">
              سلامتی یک محرومیت نیست؛ یک هنر خوشایند است.
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-12">
              ما در حس خوب باور داریم که تغذیه سالم نباید مترادف با گرسنگی کشیدن یا محروم شدن از طعم‌های دلپذیر باشد. ما هنر آشپزی ممتاز را با علم رژیم‌درمانی بالینی پیوند زده‌ایم.
            </p>

            {/* Apple Big Stats Callouts (4 Columns) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <div className="p-6 rounded-3xl bg-surface border border-border-subtle text-center shadow-xs">
                <span className="text-3xl sm:text-4xl font-black text-strong block mb-1">
                  ۵۰,۰۰۰+
                </span>
                <span className="text-xs text-muted">وعده غذایی ارگانیک طبخ‌شده</span>
              </div>

              <div className="p-6 rounded-3xl bg-surface border border-border-subtle text-center shadow-xs">
                <span className="text-3xl sm:text-4xl font-black text-primary block mb-1">
                  ۷ سال
                </span>
                <span className="text-xs text-muted">سابقه پیوسته در مشهد</span>
              </div>

              <div className="p-6 rounded-3xl bg-surface border border-border-subtle text-center shadow-xs">
                <span className="text-3xl sm:text-4xl font-black text-strong block mb-1">
                  ۰٪
                </span>
                <span className="text-xs text-muted">نگه‌دارنده و روغن ترانس</span>
              </div>

              <div className="p-6 rounded-3xl bg-surface border border-border-subtle text-center shadow-xs">
                <span className="text-3xl sm:text-4xl font-black text-primary block mb-1">
                  ۱۰۰٪
                </span>
                <span className="text-xs text-muted">نظارت کارشناس تغذیه</span>
              </div>
            </div>
          </section>

          {/* Clinical Supervision Card (Apple Feature Presentation) */}
          <section className="rounded-3xl bg-surface border border-border-subtle p-8 sm:p-14 mb-16 text-start shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold text-accent uppercase block mb-1">
                  ستون علمی پلتفرم
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-strong mb-4">
                  برنامه‌ریزی تغذیه زیر نظر مستقیم اشرف رهبری
                </h2>
                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                  تمامی پکیج‌های غذایی و آیتم‌های کافه‌بوتیک حس خوب، زیر نظر مستقیم سرکار خانم اشرف رهبری (کارشناس ارشد تغذیه و رژیم‌درمانی با شماره نظام پزشکی ت-۵۶۲۸) فرموله و کالیبره می‌شوند. در سیستم حس خوب، نسبت درشت‌مغذی‌ها (پروتئین، کربوهیدرات پیچیده و چربی‌های مفید) و ریزمغذی‌ها متناسب با شرایط بالینی و فیزیولوژیک هر کاربر تنظیم می‌گردد.
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 rounded-pill bg-canvas border border-border-subtle text-xs font-bold text-strong">
                    شماره نظام پزشکی: ت-۵۶۲۸
                  </div>
                  <div className="px-4 py-2 rounded-pill bg-canvas border border-border-subtle text-xs font-bold text-strong">
                    پایش هفتگی مشترکین با چک‌این آنلاین
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-44 h-44 rounded-full bg-canvas border border-border-subtle flex items-center justify-center p-8">
                  {hourglassGlyph && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={hourglassGlyph.path}
                      alt="حس خوب"
                      className="w-24 h-24 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 3 Pillars of Standards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-8 rounded-3xl bg-surface border border-border-subtle text-start shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-calm text-primary flex items-center justify-center font-bold text-lg mb-4">
                🌿
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">۱۰۰٪ پخت روزانه و بامداد</h3>
              <p className="text-xs text-muted leading-relaxed">
                غذای شما بامداد همان روزی طبخ می‌شود که تحویل می‌گیرید؛ بدون هیچ‌گونه ماده نگه‌دارنده صنعتی یا انجماد پیش‌ساخته.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface border border-border-subtle text-start shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-calm text-primary flex items-center justify-center font-bold text-lg mb-4">
                ⚖️
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">دقت گرمی کالری و ماکرو</h3>
              <p className="text-xs text-muted leading-relaxed">
                هر ظرف شامل برچسب شفاف ارزش غذایی (کالری، پروتئین، کربوهیدرات و چربی مفید) وزن‌شده با ترازوی دقیق آشپزخانه است.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface border border-border-subtle text-start shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-calm text-primary flex items-center justify-center font-bold text-lg mb-4">
                ☕
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">کافه‌بوتیک در سجاد مشهد</h3>
              <p className="text-xs text-muted leading-relaxed">
                حس خوب علاوه بر آشپزخانه ارسال، یک کافه‌بوتیک لوکس و آرام در بلوار سجاد دارد؛ محلی برای دورهمی سلامت و تحویل حضوری پکیج‌ها.
              </p>
            </div>
          </section>

          {/* Dual Action Pill CTA Footer */}
          <div className="text-center p-8 sm:p-12 rounded-3xl bg-surface border border-border-subtle max-w-3xl mx-auto shadow-xs">
            <h3 className="text-2xl font-black text-strong mb-3">
              آماده‌اید تجربه استانداردی از سبک زندگی سلامت داشته باشید؟
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-8 max-w-md mx-auto">
              همین امروز پکیج غذایی متناسب با بدن خود را با نظارت کارشناس ارشد تغذیه آغاز کنید.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/start">
                <Button variant="primary" size="lg" className="rounded-pill px-8 text-sm font-bold shadow-xs">
                  آغاز ثبت‌نام اختصاصی
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="secondary" size="lg" className="rounded-pill px-8 text-sm font-bold text-primary border-primary/30">
                  مشاهده لاین‌آپ پکیج‌ها ←
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
