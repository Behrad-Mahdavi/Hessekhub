// apps/web/src/components/blocks/HeroLeafBlock.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";

export interface HeroLeafBlockProps {
  content?: {
    headlineFa?: string;
    subheadlineFa?: string;
    primaryCtaTitleFa?: string;
    primaryCtaUrl?: string;
    secondaryCtaTitleFa?: string;
    secondaryCtaUrl?: string;
    badgeFa?: string;
    glyphId?: string;
  };
}

const FEATURED_HERO_MEALS = [
  {
    id: "salmon",
    dayLabel: "شنبه · ناهار اصلی",
    titleFa: "خوراک فیله سالمون نروژی با کینوا و سبزیجات بخارپز",
    descriptionFa:
      "طبخ با بخار بدون روغن با سس شوید و لیموی تازه ارگانیک، بهینه‌سازی‌شده برای بالاترین جذب اسیدهای چرب امگا-۳ و پروتئین زودهضم.",
    calories: "۴۸۰",
    protein: "۴۲",
    carbs: "۳۲",
    fat: "۱۴",
    glyphKey: "plate" as const,
    tags: ["امگا-۳ بالا", "بدون گلوتن", "پروتئین دریایی"],
  },
  {
    id: "saffron-chicken",
    dayLabel: "یک‌شنبه · ناهار اصلی",
    titleFa: "چلو مرغ ارگانیک زعفرانی با برنج قهوه‌ای و زرشک کوهی",
    descriptionFa:
      "سینه مرغ مرینیت‌شده با زعفران اصیل قائنات، برنج قهوه‌ای سبوس‌دار با شاخص گلیسمی پایین و خلال پسته خام بدون نمک.",
    calories: "۵۲۰",
    protein: "۴۵",
    carbs: "۵۵",
    fat: "۹",
    glyphKey: "avocado" as const,
    tags: ["پروتئین بالا", "کم‌چرب", "انرژی پایدار"],
  },
  {
    id: "tenderloin-bowl",
    dayLabel: "دوشنبه · شام سبک",
    titleFa: "بول استیک فیله گوساله با پوره گل‌کلم و قارچ برشته",
    descriptionFa:
      "استیک فیله کم‌چرب گوساله با پوره خامه‌ای گل‌کلم بدون افزودن خامه صنعتی، سس فلفل سیاه تازه و سبزیجات برگ سبز.",
    calories: "۴۴۰",
    protein: "۴۶",
    carbs: "۱۸",
    fat: "۱۲",
    glyphKey: "salad-bowl" as const,
    tags: ["کتوژنیک", "عضله‌ساز", "بدون قند"],
  },
];

export function HeroLeafBlock({ content = {} }: HeroLeafBlockProps) {
  const [activeMealIndex, setActiveMealIndex] = useState(0);
  const currentMeal = FEATURED_HERO_MEALS[activeMealIndex] ?? FEATURED_HERO_MEALS[0]!;
  const activeGlyph = BRAND_GLYPHS[currentMeal.glyphKey];

  return (
    <section className="relative w-full pt-6 pb-10 md:pt-10 md:pb-16 bg-canvas overflow-hidden text-center">
      {/* Apple Studio Ambient Light Diffusion */}
      <div
        className="absolute top-0 inset-x-0 h-[640px] pointer-events-none opacity-50 blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(38, 79, 163, 0.14) 0%, rgba(217, 130, 43, 0.07) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        {/* Apple Style Editorial Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill bg-surface/90 border border-border-subtle shadow-xs mb-3 select-none">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold text-strong">
            {content.badgeFa || "نوآوری در تغذیه بالینی و رژیم‌درمانی مشهد · از ۱۳۹۷"}
          </span>
        </div>

        {/* Monumental Persian Display Headline (Apple Typography Grade) */}
        <h1 className="max-w-4xl text-2xl sm:text-4xl lg:text-[42px] font-black text-strong leading-[1.22] sm:leading-[1.18] lg:leading-[1.15] tracking-normal mb-2.5">
          {content.headlineFa || "حس خوب زندگی سالم، در هر وعده غذای شما."}
        </h1>

        {/* Punchy Subtitle with strict line-length and readable contrast */}
        <p className="max-w-xl text-sm sm:text-base lg:text-lg text-muted font-normal leading-relaxed mb-5">
          {content.subheadlineFa ||
            "طبخ روزانه با مواد اولیه ارگانیک و کنترل گرمی ماکروها، تحت نظارت کارشناس ارشد تغذیه، با ارسال اختصاصی صبحگاهی به تمام نقاط مشهد."}
        </p>

        {/* Apple Dual Action Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 w-full sm:w-auto">
          <Link href={content.primaryCtaUrl || "/start"} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto rounded-pill h-11 px-7 text-sm font-bold shadow-elevation-1 hover:shadow-elevation-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {content.primaryCtaTitleFa || "محاسبه کالری و شروع اشتراک"}
            </Button>
          </Link>

          <Link href={content.secondaryCtaUrl || "/programs"} className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto rounded-pill h-11 px-6 text-sm font-bold text-primary border-primary/30 hover:bg-primary-subtle hover:border-primary active:scale-[0.98] transition-all group"
            >
              <span>{content.secondaryCtaTitleFa || "مشاهده و مقایسه پکیج‌ها"}</span>
              <span className="inline-block ms-2 transition-transform duration-fast group-hover:-translate-x-1">
                ←
              </span>
            </Button>
          </Link>
        </div>

        {/* Apple Studio Floating Showcase with Natural Plate Depth */}
        <div className="w-full max-w-5xl relative mx-auto">
          <div className="relative rounded-[28px] bg-surface border border-border-default/80 shadow-[0_20px_60px_-15px_rgba(16,15,13,0.07)] p-5 sm:p-7 lg:p-8 overflow-hidden text-start">
            
            {/* Top Showcase Toolbar: Day Selector (Apple Segmented Style) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-bold text-strong">
                  نمای زنده بشقاب سلامت امروز · منوی چرخشی ۱۴ روزه
                </span>
              </div>

              {/* Interactive Day Tabs */}
              <div className="inline-flex items-center p-1 rounded-pill bg-canvas border border-border-subtle self-start sm:self-auto">
                {FEATURED_HERO_MEALS.map((meal, idx) => (
                  <button
                    key={meal.id}
                    type="button"
                    onClick={() => setActiveMealIndex(idx)}
                    className={`px-3 py-1 text-xs font-bold rounded-pill transition-all select-none ${
                      activeMealIndex === idx
                        ? "bg-surface text-primary shadow-xs"
                        : "text-muted hover:text-strong"
                    }`}
                  >
                    {meal.dayLabel.split(" · ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Centerpiece Presentation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
              
              {/* Product Visual Presentation (Plate & Studio Pedestal) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
                <div className="relative w-full h-48 sm:h-56 rounded-2xl bg-canvas border border-border-subtle flex items-center justify-center overflow-hidden p-4 shadow-inner">
                  {/* Subtle Studio Pedestal */}
                  <div className="absolute inset-x-8 bottom-3 h-12 bg-surface/70 rounded-full blur-md opacity-80" />

                  {activeGlyph ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={currentMeal.id}
                      src={activeGlyph.path}
                      alt={activeGlyph.faTitle}
                      className="w-36 h-36 sm:w-44 sm:h-44 object-contain relative z-10 transition-transform duration-base hover:scale-105 drop-shadow-[0_20px_25px_rgba(0,0,0,0.08)]"
                    />
                  ) : (
                    <div className="w-36 h-36 rounded-full bg-calm flex items-center justify-center text-primary font-bold text-base">
                      بشقاب روز سرآشپز
                    </div>
                  )}

                  {/* Organic Badge Floating */}
                  <div className="absolute top-3 start-3 px-3 py-1 bg-surface/95 backdrop-blur-md rounded-pill border border-border-subtle shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-primary select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    <span>۱۰۰٪ مواد اولیه تازه و ارگانیک</span>
                  </div>

                  {/* Meal Timing Chip Floating */}
                  <div className="absolute bottom-3 end-3 px-3 py-1 bg-surface/95 backdrop-blur-md rounded-pill border border-border-subtle shadow-xs text-[11px] font-medium text-muted select-none">
                    {currentMeal.dayLabel}
                  </div>
                </div>
              </div>

              {/* Dish Breakdown & Nutritional Integrity */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    {currentMeal.tags.map((tag) => (
                      <Badge key={tag} variant="neutral" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-strong mb-1.5 leading-snug">
                    {currentMeal.titleFa}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {currentMeal.descriptionFa}
                  </p>
                </div>

                {/* Macro Specs Matrix (Apple Hardware Specs Style) */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-canvas border border-border-subtle text-center">
                    <span className="text-[10px] text-muted block mb-0.5">کالری کل</span>
                    <span className="text-sm sm:text-base font-black text-strong font-sans">
                      {currentMeal.calories}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-canvas border border-border-subtle text-center">
                    <span className="text-[10px] text-muted block mb-0.5">پروتئین</span>
                    <span className="text-sm sm:text-base font-black text-primary font-sans">
                      {currentMeal.protein}گ
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-canvas border border-border-subtle text-center">
                    <span className="text-[10px] text-muted block mb-0.5">کربوهیدرات</span>
                    <span className="text-sm sm:text-base font-black text-strong font-sans">
                      {currentMeal.carbs}گ
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-canvas border border-border-subtle text-center">
                    <span className="text-[10px] text-muted block mb-0.5">چربی مفید</span>
                    <span className="text-sm sm:text-base font-black text-strong font-sans">
                      {currentMeal.fat}گ
                    </span>
                  </div>
                </div>

                {/* Clinical Guarantee Footer */}
                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-muted">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
                    <span className="font-bold text-strong text-[11px]">نظارت مستقیم متخصص تغذیه</span>
                  </span>

                  <Link
                    href="/programs"
                    className="font-bold text-primary hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    <span>جزئیات منو</span>
                    <span>←</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
