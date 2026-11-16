"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Badge, toPersianDigits } from "@hessekhub/ui";
import { BRAND_GLYPHS, BrandGlyphId } from "@hessekhub/design-tokens";

export interface HeroMealPreview {
  id: string;
  dayShort: string;
  dayLabel: string;
  titleFa: string;
  descriptionFa: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  glyphKey: BrandGlyphId;
  tags: string[];
}

export interface HeroLeafBlockProps {
  content?: {
    headlineFa?: string;
    subheadlineFa?: string;
    primaryCtaTitleFa?: string;
    primaryCtaUrl?: string;
    secondaryCtaTitleFa?: string;
    secondaryCtaUrl?: string;
    badgeFa?: string;
    featuredMeals?: HeroMealPreview[];
  };
}

const DEFAULT_HERO_MEALS: HeroMealPreview[] = [
  {
    id: "salmon",
    dayShort: "شنبه",
    dayLabel: "شنبه · ناهار اصلی",
    titleFa: "فیله سالمون نروژی بخارپز با کینوا و سبزیجات ارگانیک",
    descriptionFa:
      "طبخ بدون روغن با سس لیمو و شوید تازه، بهینه‌سازی‌شده برای بالاترین جذب اسیدهای چرب امگا-۳ و پروتئین زودهضم.",
    calories: 480,
    protein: 42,
    carbs: 32,
    fat: 14,
    glyphKey: "plate",
    tags: ["امگا-۳ بالا", "بدون گلوتن", "پروتئین دریایی"],
  },
  {
    id: "saffron-chicken",
    dayShort: "یک‌شنبه",
    dayLabel: "یک‌شنبه · ناهار اصلی",
    titleFa: "چلو مرغ ارگانیک زعفرانی با برنج قهوه‌ای و زرشک کوهی",
    descriptionFa:
      "سینه مرغ مرینیت‌شده با زعفران اصیل قائنات، برنج قهوه‌ای سبوس‌دار با شاخص گلیسمی پایین و خلال پسته خام.",
    calories: 520,
    protein: 45,
    carbs: 55,
    fat: 9,
    glyphKey: "avocado",
    tags: ["پروتئین بالا", "کم‌چرب", "انرژی پایدار"],
  },
  {
    id: "tenderloin-bowl",
    dayShort: "دوشنبه",
    dayLabel: "دوشنبه · شام سبک",
    titleFa: "بول استیک فیله گوساله با پوره گل‌کلم و قارچ برشته",
    descriptionFa:
      "استیک فیله کم‌چرب گوساله با پوره خامه‌ای گل‌کلم بدون خامه صنعتی، سس فلفل سیاه تازه و سبزیجات برگ سبز.",
    calories: 440,
    protein: 46,
    carbs: 18,
    fat: 12,
    glyphKey: "salad-bowl",
    tags: ["کتوژنیک", "عضله‌ساز", "بدون قند"],
  },
];

export function HeroLeafBlock({ content = {} }: HeroLeafBlockProps) {
  const meals = content.featuredMeals?.length ? content.featuredMeals : DEFAULT_HERO_MEALS;
  const [activeIndex, setActiveIndex] = useState(0);
  const currentMeal = meals[activeIndex] ?? meals[0]!;
  const activeGlyph = BRAND_GLYPHS[currentMeal.glyphKey] ?? BRAND_GLYPHS.plate;

  return (
    <section className="relative w-full pt-8 pb-14 md:pt-14 md:pb-24 bg-canvas overflow-hidden">
      {/* Subtle Apple-style Top Ambient Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--hk-primary-subtle) 0%, var(--hk-bg-calm) 45%, transparent 100%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Minimal Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-surface border border-border-subtle shadow-1 mb-6">
          <span className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
          <span className="text-xs font-medium text-text-muted">
            {content.badgeFa || "پلتفرم تغذیه بالینی و سبک زندگی سالم مشهد · از ۱۳۹۷"}
          </span>
        </div>

        {/* Monumental Display Headline */}
        <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-[52px] font-black text-text-strong leading-[1.2] mb-5">
          {content.headlineFa || "تغذیه‌ای به دقت علم، به لذت یک رستوران بوتیک."}
        </h1>

        {/* Clean Lead Paragraph */}
        <p className="max-w-[58ch] text-base sm:text-lg text-text-muted leading-relaxed mb-8">
          {content.subheadlineFa ||
            "برنامه‌های غذایی شخصی‌سازی‌شده بر پایه متابولیسم بدن شما؛ طبخ روزانه با مواد اولیه ارگانیک و ارسال صبحگاهی در مشهد."}
        </p>

        {/* Primary & Secondary Action Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-12 md:mb-16">
          <Link href={content.primaryCtaUrl || "/start"} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-8 shadow-2 transition-transform duration-instant active:scale-[0.98]"
            >
              {content.primaryCtaTitleFa || "طراحی برنامه و محاسبه کالری"}
            </Button>
          </Link>

          <Link href={content.secondaryCtaUrl || "/programs"} className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto px-6 group">
              <span>{content.secondaryCtaTitleFa || "مقایسه پکیج‌ها"}</span>
              <span
                aria-hidden="true"
                className="inline-block ms-2 transition-transform duration-fast group-hover:-translate-x-1"
              >
                ←
              </span>
            </Button>
          </Link>
        </div>

        {/* Apple Studio Product Showcase Stage */}
        <div className="w-full max-w-5xl rounded-xl bg-surface border border-border-default shadow-2 overflow-hidden text-start">
          {/* Top Bar: Title + Apple Segmented Control */}
          <div className="px-5 py-4 sm:px-8 sm:py-5 bg-subtle/60 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-text-strong">
                پیش‌نمایش زنده منوی چرخشی ۱۴ روزه
              </span>
            </div>

            {/* Segmented Pill Control */}
            <div
              role="tablist"
              aria-label="انتخاب روز نمونه"
              className="inline-flex items-center p-1 rounded-pill bg-sunken self-start sm:self-auto"
            >
              {meals.map((meal, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={meal.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-pill transition-all duration-fast ${
                      isActive
                        ? "bg-surface text-text-strong font-bold shadow-1"
                        : "text-text-muted hover:text-text-strong"
                    }`}
                  >
                    {meal.dayShort}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Stage Grid */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Visual Studio Pedestal (7 Cols) */}
            <div className="lg:col-span-6">
              <div className="relative h-60 sm:h-72 rounded-lg bg-canvas border border-border-subtle flex flex-col items-center justify-center p-6 overflow-hidden">
                {/* Soft Studio Floor Shadow */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-7 w-44 h-6 rounded-pill bg-text-strong/10 blur-md"
                />

                {/* Brand Glyph Centerpiece */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={currentMeal.id}
                  src={activeGlyph.path}
                  alt={activeGlyph.faTitle}
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain relative z-10 transition-transform duration-slow ease-flow hover:scale-105"
                />

                {/* Top Corner Quiet Pill */}
                <div className="absolute top-4 start-4 px-3 py-1 rounded-pill bg-surface/90 backdrop-blur-md border border-border-subtle text-xs font-medium text-text-muted">
                  {currentMeal.dayLabel}
                </div>

                {/* Bottom Corner Organic Indicator */}
                <div className="absolute bottom-4 end-4 px-3 py-1 rounded-pill bg-calm text-info-text text-xs font-medium">
                  ۱۰۰٪ تازه و بدون نگهدارنده
                </div>
              </div>
            </div>

            {/* Dish Editorial Specs (5 Cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {currentMeal.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-text-strong leading-snug mb-3">
                  {currentMeal.titleFa}
                </h2>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {currentMeal.descriptionFa}
                </p>
              </div>

              {/* Hardware-Style Macro Matrix */}
              <div className="grid grid-cols-4 gap-2.5">
                <div className="p-3 rounded-md bg-canvas border border-border-subtle text-center">
                  <span className="text-xs text-text-subtle block mb-1">کالری</span>
                  <span className="text-base sm:text-lg font-black text-text-strong tabular-nums">
                    {toPersianDigits(currentMeal.calories)}
                  </span>
                </div>
                <div className="p-3 rounded-md bg-primary-subtle border border-primary/20 text-center">
                  <span className="text-xs text-primary-text block mb-1">پروتئین</span>
                  <span className="text-base sm:text-lg font-black text-primary-text tabular-nums">
                    {toPersianDigits(currentMeal.protein)} گ
                  </span>
                </div>
                <div className="p-3 rounded-md bg-canvas border border-border-subtle text-center">
                  <span className="text-xs text-text-subtle block mb-1">کربوهیدرات</span>
                  <span className="text-base sm:text-lg font-black text-text-strong tabular-nums">
                    {toPersianDigits(currentMeal.carbs)} گ
                  </span>
                </div>
                <div className="p-3 rounded-md bg-canvas border border-border-subtle text-center">
                  <span className="text-xs text-text-subtle block mb-1">چربی مفید</span>
                  <span className="text-base sm:text-lg font-black text-text-strong tabular-nums">
                    {toPersianDigits(currentMeal.fat)} گ
                  </span>
                </div>
              </div>

              {/* Clean Clinical Guarantee Footer */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2 text-text-muted font-medium">
                  <span className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
                  تنظیم‌شده در ۵ تیپ کالری (۱۲۰۰ تا ۲۵۰۰)
                </span>
                <Link
                  href="/start"
                  className="font-bold text-primary-text hover:underline inline-flex items-center gap-1"
                >
                  <span>ساخت برنامه شخصی</span>
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}