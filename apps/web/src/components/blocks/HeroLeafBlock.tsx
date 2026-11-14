// apps/web/src/components/blocks/HeroLeafBlock.tsx
import React from "react";
import Link from "next/link";
import { Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";

export interface HeroLeafBlockProps {
  content: {
    headlineFa: string;
    subheadlineFa: string;
    primaryCtaTitleFa: string;
    primaryCtaUrl: string;
    secondaryCtaTitleFa?: string;
    secondaryCtaUrl?: string;
    badgeFa?: string;
    glyphId?: string;
  };
}

export function HeroLeafBlock({ content }: HeroLeafBlockProps) {
  const plateGlyph = BRAND_GLYPHS["plate"];

  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 bg-canvas overflow-hidden text-center">
      {/* Apple Studio Ambient Light Diffusion */}
      <div
        className="absolute top-0 inset-x-0 h-[600px] pointer-events-none opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(ellipse at top, rgba(38, 79, 163, 0.12) 0%, rgba(217, 130, 43, 0.06) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        {/* Apple-Style Micro Announcement Tag */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-surface/90 border border-border-subtle shadow-xs backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
          <span className="text-xs font-medium text-strong">
            {content.badgeFa || "پلتفرم تخصصی سبک زندگی سالم و کافه‌بوتیک سجاد مشهد · از ۱۳۹۷"}
          </span>
          <span className="text-border-default">•</span>
          <span className="text-xs text-primary font-bold">نظارت اشرف رهبری</span>
        </div>

        {/* Monumental Persian Display Headline */}
        <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-black text-strong leading-[1.25] sm:leading-[1.2] lg:leading-[1.15] tracking-normal mb-6">
          {content.headlineFa || "حس خوب زندگی سالم، در هر وعده غذای شما."}
        </h1>

        {/* Punchy 1-Sentence Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-muted font-normal leading-relaxed mb-8">
          {content.subheadlineFa || "طبخ روزانه با مواد اولیه ارگانیک و کنترل گرمی ماکروها، تحت نظارت کارشناس ارشد تغذیه، با ارسال اختصاصی صبحگاهی به تمام نقاط مشهد."}
        </p>

        {/* Apple-Style Dual Action Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 w-full sm:w-auto">
          <Link href={content.primaryCtaUrl || "/start"} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto rounded-pill h-13 px-9 text-base font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {content.primaryCtaTitleFa || "محاسبه کالری و شروع اشتراک"}
            </Button>
          </Link>

          <Link href={content.secondaryCtaUrl || "/programs"} className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto rounded-pill h-13 px-8 text-base font-bold text-primary border-primary/30 hover:bg-primary/5 hover:border-primary active:scale-[0.98] transition-all"
            >
              <span>{content.secondaryCtaTitleFa || "مشاهده و مقایسه پکیج‌ها"}</span>
              <span className="inline-block ms-2 transition-transform group-hover:-translate-x-1">←</span>
            </Button>
          </Link>
        </div>

        {/* Apple Studio Floating Showcase with Natural Plate Depth */}
        <div className="w-full max-w-5xl relative mx-auto">
          <div className="relative rounded-3xl bg-surface border border-border-subtle/80 shadow-[0_30px_70px_-15px_rgba(20,35,70,0.08)] p-6 sm:p-10 lg:p-12 overflow-hidden">
            
            {/* Top Showcase Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border-subtle/70 mb-8 text-start">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-bold text-strong">
                  نمای زنده بشقاب سلامت امروز · منوی چرخشی ۱۴ روزه
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="neutral" size="sm">کالری کنترل‌شده</Badge>
                <Badge variant="primary" size="sm">پروتئین بالا</Badge>
                <Badge variant="luxe" size="sm">بدون روغن ترانس</Badge>
              </div>
            </div>

            {/* Visual Centerpiece Presentation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start">
              
              {/* Product Visual Presentation */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-canvas border border-border-subtle flex items-center justify-center overflow-hidden p-8 shadow-inner">
                  {/* Subtle Studio Pedestal */}
                  <div className="absolute inset-x-8 bottom-4 h-16 bg-surface/60 rounded-full blur-md opacity-80" />
                  
                  {plateGlyph ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={plateGlyph.path}
                      alt={plateGlyph.faTitle}
                      className="w-52 h-52 sm:w-64 sm:h-64 object-contain relative z-10 transition-transform duration-medium hover:scale-105 drop-shadow-[0_20px_25px_rgba(0,0,0,0.08)]"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-calm flex items-center justify-center text-primary font-bold text-lg">
                      بشقاب روز سرآشپز
                    </div>
                  )}

                  {/* Organic Badge Floating */}
                  <div className="absolute top-4 start-4 px-3 py-1 bg-surface/95 backdrop-blur-md rounded-pill border border-border-subtle shadow-sm flex items-center gap-1.5 text-[11px] font-bold text-primary">
                    <span>۱۰۰٪ مواد اولیه تازه و ارگانیک</span>
                  </div>
                </div>
              </div>

              {/* Dish Breakdown & Nutritional Integrity */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-normal mb-1 block">
                    وعده اصلی رژیمی پیشنهادی
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-strong mb-2">
                    خوراک فیله سالمون نروژی با کینوا و سبزیجات بخارپز
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    طبخ با بخار بدون روغن، همراه با سس شوید و لیموی تازه ارگانیک، محاسبه‌شده برای حفظ حداکثر اسیدهای چرب امگا-۳ و پروتئین زودهضم.
                  </p>
                </div>

                {/* Macro Specs Matrix (Apple Hardware Specs Style) */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-canvas border border-border-subtle text-center">
                    <span className="text-[10px] text-muted block mb-0.5 font-medium">کالری خالص</span>
                    <span className="text-base sm:text-lg font-black text-strong">۴۸۰</span>
                    <span className="text-[10px] text-muted block">کیلوکالری</span>
                  </div>
                  <div className="p-3 rounded-xl bg-canvas border border-border-subtle text-center">
                    <span className="text-[10px] text-muted block mb-0.5 font-medium">پروتئین خالص</span>
                    <span className="text-base sm:text-lg font-black text-primary">۴۲</span>
                    <span className="text-[10px] text-muted block">گرم</span>
                  </div>
                  <div className="p-3 rounded-xl bg-canvas border border-border-subtle text-center">
                    <span className="text-[10px] text-muted block mb-0.5 font-medium">چربی مفید</span>
                    <span className="text-base sm:text-lg font-black text-strong">۱۴</span>
                    <span className="text-[10px] text-muted block">گرم</span>
                  </div>
                </div>

                {/* Clinical Guarantee Footer */}
                <div className="pt-4 border-t border-border-subtle flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-calm text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    AR
                  </div>
                  <div className="text-[11px] text-muted leading-tight">
                    <span className="font-bold text-strong block">تأییدیه بالینی اشرف رهبری</span>
                    <span>شماره نظام پزشکی: ت-۵۶۲۸ · مشهد</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
