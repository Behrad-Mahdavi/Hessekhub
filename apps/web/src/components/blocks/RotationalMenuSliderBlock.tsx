"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button, Badge, toPersianDigits } from "@hessekhub/ui";
import { BRAND_GLYPHS, BrandGlyphId } from "@hessekhub/design-tokens";

export interface MenuItemData {
  id: string;
  dayLabel: string;
  dayKey: "sat" | "sun" | "mon" | "tue" | "wed" | "all";
  mealType: string;
  title: string;
  description: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  dietTags: string[];
  glyphId?: BrandGlyphId;
}

const SAMPLE_ROTATIONAL_DISHES: MenuItemData[] = [
  {
    id: "dish-1",
    dayLabel: "شنبه",
    dayKey: "sat",
    mealType: "ناهار · گزینه ۱",
    title: "فیله سالمون نروژی با کینوا و سبزیجات بخارپز",
    description: "فیله سالمون گریل با سس لیمو و شوید تازه، کینوای سفید و بروکلی بخارپز.",
    calories: 480,
    proteinGrams: 42,
    carbsGrams: 32,
    fatGrams: 14,
    dietTags: ["امگا-۳ بالا", "بدون گلوتن"],
    glyphId: "plate",
  },
  {
    id: "dish-2",
    dayLabel: "یک‌شنبه",
    dayKey: "sun",
    mealType: "ناهار · گزینه ۱",
    title: "چلو مرغ ارگانیک زعفرانی با برنج قهوه‌ای و زرشک",
    description: "سینه مرغ مرینیت‌شده با زعفران قائنات، برنج قهوه‌ای سبوس‌دار و خلال پسته خام.",
    calories: 520,
    proteinGrams: 45,
    carbsGrams: 55,
    fatGrams: 9,
    dietTags: ["پروتئین بالا", "کم‌چرب"],
    glyphId: "avocado",
  },
  {
    id: "dish-3",
    dayLabel: "دوشنبه",
    dayKey: "mon",
    mealType: "شام · گزینه ۲",
    title: "بول استیک فیله گوساله با پوره گل‌کلم و قارچ برشته",
    description: "استیک فیله کم‌چرب با پوره نرم گل‌کلم بدون خامه و سس فلفل سیاه تازه.",
    calories: 440,
    proteinGrams: 46,
    carbsGrams: 18,
    fatGrams: 12,
    dietTags: ["کتوژنیک", "عضله‌ساز"],
    glyphId: "bicep-arm",
  },
  {
    id: "dish-4",
    dayLabel: "سه‌شنبه",
    dayKey: "tue",
    mealType: "ناهار · گزینه ۲",
    title: "کاسه توفوی دودی ارگانیک با ادامامه و نودل کدو",
    description: "توفوی دست‌ساز سویا با ادامامه تازه، جوانه ماش و سس کنجد لایت.",
    calories: 390,
    proteinGrams: 28,
    carbsGrams: 34,
    fatGrams: 11,
    dietTags: ["گیاهی", "فیبر بالا"],
    glyphId: "leaf",
  },
  {
    id: "dish-5",
    dayLabel: "چهارشنبه",
    dayKey: "wed",
    mealType: "صبحانه · گزینه ۱",
    title: "تست آووکادو و تخم‌مرغ پوچد روی نان چاودار",
    description: "تخم‌مرغ محلی ارگانیک با آووکادوی تازه و دانه‌های چیا روی نان خمیرترش.",
    calories: 360,
    proteinGrams: 22,
    carbsGrams: 28,
    fatGrams: 16,
    dietTags: ["انرژی پایدار", "چربی مفید"],
    glyphId: "avocado",
  },
];

const DAY_TABS = [
  { key: "all", label: "همه روزها" },
  { key: "sat", label: "شنبه" },
  { key: "sun", label: "یک‌شنبه" },
  { key: "mon", label: "دوشنبه" },
  { key: "tue", label: "سه‌شنبه" },
  { key: "wed", label: "چهارشنبه" },
] as const;

export function RotationalMenuSliderBlock() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<string>("all");

  const filteredDishes =
    selectedDay === "all"
      ? SAMPLE_ROTATIONAL_DISHES
      : SAMPLE_ROTATIONAL_DISHES.filter((d) => d.dayKey === selectedDay);

  const scrollByStep = (direction: "next" | "prev") => {
    if (!scrollRef.current) return;
    // In RTL, scrolling forward (next) moves along negative X
    const distance = direction === "next" ? -380 : 380;
    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16 md:py-24 bg-surface border-y border-border-subtle overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-start">
            <span className="text-xs font-bold text-primary-text block mb-2">
              منوی چرخشی ۱۴ روزه · ۲ گزینه انتخابی در هر وعده
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-text-strong leading-tight">
              تنوع رستورانی، با دقت گرم‌کشی آزمایشگاهی.
            </h2>
            <p className="text-sm sm:text-base text-text-muted mt-3 max-w-[58ch] leading-relaxed">
              در اپلیکیشن حس خوب می‌توانید تا ۴۸ ساعت قبل از پخت، بین دو گزینه استاندارد هر روز غذای محبوب خود را انتخاب کنید.
            </p>
          </div>

          {/* Circular Studio Controls */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button
              type="button"
              onClick={() => scrollByStep("prev")}
              aria-label="وعده قبلی"
              className="w-11 h-11 rounded-pill bg-canvas border border-border-default flex items-center justify-center text-text-strong hover:bg-surface-hover hover:border-border-control transition-all duration-fast active:scale-95"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => scrollByStep("next")}
              aria-label="وعده بعدی"
              className="w-11 h-11 rounded-pill bg-canvas border border-border-default flex items-center justify-center text-text-strong hover:bg-surface-hover hover:border-border-control transition-all duration-fast active:scale-95"
            >
              ←
            </button>
          </div>
        </div>

        {/* Segmented Day Filter */}
        <div
          role="tablist"
          aria-label="فیلتر روزهای هفته"
          className="mt-7 inline-flex items-center gap-1.5 p-1 rounded-pill bg-sunken overflow-x-auto max-w-full"
        >
          {DAY_TABS.map((tab) => {
            const isSelected = selectedDay === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedDay(tab.key)}
                className={`px-4 py-1.5 text-xs font-medium rounded-pill transition-all duration-fast whitespace-nowrap ${
                  isSelected
                    ? "bg-surface text-text-strong font-bold shadow-1"
                    : "text-text-muted hover:text-text-strong"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Edge-Aligned Horizontal Track */}
      <div
        ref={scrollRef}
        className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-stretch gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {filteredDishes.map((dish) => {
          const glyph = dish.glyphId ? BRAND_GLYPHS[dish.glyphId] : BRAND_GLYPHS.plate;

          return (
            <article
              key={dish.id}
              className="snap-start shrink-0 w-[300px] sm:w-[350px] rounded-xl bg-canvas border border-border-default hover:border-border-control p-6 flex flex-col justify-between transition-all duration-base group text-start"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-info-text bg-info-subtle px-3 py-1 rounded-pill">
                    {dish.dayLabel} · {dish.mealType}
                  </span>
                  <div className="flex items-center gap-1">
                    {dish.dietTags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Studio Plate Preview */}
                <div className="w-full h-40 rounded-lg bg-surface border border-border-subtle flex items-center justify-center mb-5 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={glyph.path}
                    alt={dish.title}
                    className="w-24 h-24 object-contain transition-transform duration-base ease-flow group-hover:scale-105"
                  />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-text-strong leading-snug mb-2">
                  {dish.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2 mb-5">
                  {dish.description}
                </p>
              </div>

              {/* Nutrition Bar & CTA */}
              <div className="pt-4 border-t border-border-subtle">
                <div className="grid grid-cols-4 gap-1.5 mb-4 text-center">
                  <div className="p-2 rounded-sm bg-surface border border-border-subtle">
                    <span className="text-[11px] text-text-subtle block">کالری</span>
                    <span className="text-xs font-black text-text-strong tabular-nums">
                      {toPersianDigits(dish.calories)}
                    </span>
                  </div>
                  <div className="p-2 rounded-sm bg-surface border border-border-subtle">
                    <span className="text-[11px] text-text-subtle block">پروتئین</span>
                    <span className="text-xs font-black text-primary-text tabular-nums">
                      {toPersianDigits(dish.proteinGrams)} گ
                    </span>
                  </div>
                  <div className="p-2 rounded-sm bg-surface border border-border-subtle">
                    <span className="text-[11px] text-text-subtle block">کربوهیدرات</span>
                    <span className="text-xs font-black text-text-strong tabular-nums">
                      {toPersianDigits(dish.carbsGrams)} گ
                    </span>
                  </div>
                  <div className="p-2 rounded-sm bg-surface border border-border-subtle">
                    <span className="text-[11px] text-text-subtle block">چربی</span>
                    <span className="text-xs font-black text-text-strong tabular-nums">
                      {toPersianDigits(dish.fatGrams)} گ
                    </span>
                  </div>
                </div>

                <Link href="/start" className="block w-full">
                  <Button variant="tonal" size="sm" className="w-full">
                    افزودن به برنامه شخصی ←
                  </Button>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}