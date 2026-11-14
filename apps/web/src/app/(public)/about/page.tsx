// apps/web/src/app/(public)/about/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LeafCard, Card, Badge, Button } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const metadata: Metadata = {
  title: "درباره ما و داستان حس خوب | از ۱۳۹۷ در مشهد",
  description:
    "آشنایی با تاریخچه حس خوب، کارشناس ارشد تغذیه (اشرف رهبری) و کافه‌بوتیک سلامت سجاد مشهد. تعهد به طبخ روزانه و بدون نگه‌دارنده.",
  alternates: {
    canonical: "https://hessekhub.ir/about",
  },
};

export default function AboutPage() {
  const hourglassGlyph = BRAND_GLYPHS["brand-hourglass"];
  const leafGlyph = BRAND_GLYPHS["leaf"];
  const targetGlyph = BRAND_GLYPHS["target"];
  const heartGlyph = BRAND_GLYPHS["heart"];

  return (
    <>
      <JsonLdGraph />

      <main className="w-full py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* AEO Capsule */}
          <DirectAnswerCapsule
            question="داستان و پیشینه مجموعه حس خوب در مشهد چیست؟"
            answer="مجموعه حس خوب در سال ۱۳۹۷ با هدف ارائه سبک زندگی سالم و غذاهای رژیمی و ارگانیک در مشهد تأسیس شد. این برند با افتتاح اولین کافه‌بوتیک سلامت در بلوار سجاد و راه‌اندازی آشپزخانه تخصصی تحت نظارت کارشناس ارشد تغذیه (اشرف رهبری)، هزاران مشترک را در دستیابی به وزن ایده‌آل و ارتقای انرژی روزانه همراهی کرده است."
          />

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" size="md" className="mb-4">
              اصالت و تعهد از سال ۱۳۹۷ در مشهد
            </Badge>

            <h1 className="text-3xl md:text-5xl font-extrabold text-strong mb-6 leading-tight">
              سلامتی یک مقصد نیست؛ یک سبک زندگی خوشایند است
            </h1>

            <p className="text-base md:text-lg text-muted leading-relaxed">
              ما در حس خوب معتقدیم رژیم غذایی نباید مترادف با گرسنگی، بوی زهم مرغ آب‌پز یا محرومیت از طعم‌های لذیذ باشد. ما هنر آشپزی سلامت را با علم تغذیه بالینی پیوند زده‌ایم.
            </p>
          </div>

          {/* Core Story Leaf */}
          <LeafCard glowBorder className="mb-16 p-8 md:p-12 text-start">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold text-primary uppercase mb-2 block">
                  نظارت تخصصی بالینی
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-strong mb-4">
                  برنامه‌ریزی تغذیه زیر نظر اشرف رهبری (کارشناس ارشد تغذیه)
                </h2>
                <p className="text-muted leading-relaxed text-sm md:text-base mb-6">
                  تمامی پکیج‌های غذایی و آیتم‌های کافه‌بوتیک حس خوب، زیر نظر مستقیم سرکار خانم اشرف رهبری (کارشناس ارشد تغذیه و رژیم‌درمانی با شماره نظام پزشکی ت-۵۸۸۹) فرموله و کالیبره می‌شوند. در سیستم حس خوب، نسبت درشت‌مغذی‌ها (پروتئین، کربوهیدرات پیچیده و چربی‌های مفید) و ریزمغذی‌ها متناسب با شرایط بالینی و فیزیولوژیک هر کاربر تنظیم می‌گردد.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="px-4 py-2 rounded-xl bg-canvas border border-border-default text-xs font-bold text-strong">
                    نظام پزشکی: ت-۵۸۸۹
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-canvas border border-border-default text-xs font-bold text-strong">
                    بیش از ۶ سال سابقه در مشهد
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-48 h-48 rounded-full bg-calm border border-border-default flex items-center justify-center shadow-elevation-2">
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
          </LeafCard>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-start">
              <div className="w-12 h-12 rounded-xl bg-calm border border-border-default flex items-center justify-center mb-4">
                {leafGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={leafGlyph.path} alt="ارگانیک" className="w-6 h-6 object-contain" />
                )}
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">۱۰۰٪ پخت روزانه و تازه</h3>
              <p className="text-xs text-muted leading-relaxed">
                غذای شما بامداد همان روزی طبخ می‌شود که تحویل می‌گیرید؛ بدون هیچ‌گونه ماده نگه‌دارنده شیمیایی یا انجماد صنعتی.
              </p>
            </Card>

            <Card className="p-6 text-start">
              <div className="w-12 h-12 rounded-xl bg-calm border border-border-default flex items-center justify-center mb-4">
                {targetGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={targetGlyph.path} alt="هدفمند" className="w-6 h-6 object-contain" />
                )}
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">دقت گرمی کالری و ماکرو</h3>
              <p className="text-xs text-muted leading-relaxed">
                هر ظرف شامل برچسب شفاف ارزش غذایی (کالری، پروتئین، کربوهیدرات، فیبر و چربی) وزن‌شده با ترازوی دیجیتال آشپزخانه است.
              </p>
            </Card>

            <Card className="p-6 text-start">
              <div className="w-12 h-12 rounded-xl bg-calm border border-border-default flex items-center justify-center mb-4">
                {heartGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={heartGlyph.path} alt="سلامت" className="w-6 h-6 object-contain" />
                )}
              </div>
              <h3 className="text-lg font-bold text-strong mb-2">کافه‌بوتیک در بلوار سجاد</h3>
              <p className="text-xs text-muted leading-relaxed">
                حس خوب علاوه بر آشپزخانه ارسال، یک کافه‌بوتیک لوکس و آرام در بلوار سجاد دارد؛ محلی برای دورهمی سلامت و تحویل حضوری پکیج‌ها.
              </p>
            </Card>
          </div>

          {/* CTA Row */}
          <div className="text-center p-8 rounded-3xl bg-calm border border-border-default">
            <h3 className="text-xl font-extrabold text-strong mb-3">
              آماده‌اید تجربه متفاوتی از سبک زندگی سالم داشته باشید؟
            </h3>
            <p className="text-sm text-muted mb-6">
              همین امروز پکیج غذایی متناسب با بدن خود را با نظارت کارشناس تغذیه شروع کنید.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/tools/calorie-calculator">
                <Button variant="primary" size="md">
                  محاسبه کالری اختصاصی
                </Button>
              </Link>
              <Link href="/cafe">
                <Button variant="secondary" size="md">
                  مشاهده کافه‌بوتیک سجاد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
