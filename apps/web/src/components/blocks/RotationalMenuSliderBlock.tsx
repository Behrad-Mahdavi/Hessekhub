// apps/web/src/components/blocks/RotationalMenuSliderBlock.tsx
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
  glyphId?: string;
}

const SAMPLE_ROTATIONAL_DISHES: MenuItemData[] = [
  {
    id: "dish-1",
    dayLabel: "شنبه",
    dayKey: "sat",
    mealType: "ناهار اصلی",
    title: "خوراک فیله سالمون نروژی با کینوا و سبزیجات بخارپز",
    description: "فیله سالمون گریل با سس لیمو-شوید تازه، کینوای سفید پرو و بروکلی سس کنجد.",
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
    mealType: "ناهار اصلی",
    title: "چلو مرغ ارگانیک زعفرانی با برنج قهوه‌ای و زرشک کوهی",
    description: "سینه مرغ مرینیت‌شده با زعفران اصیل قائنات، برنج قهوه‌ای سبوس‌دار و خلال پسته.",
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
    mealType: "شام سبک",
    title: "بول استیک فیله گوساله با پوره گل‌کلم و قارچ برشته",
    description: "استیک فیله کم‌چرب با پوره نرم گل‌کلم بدون خامه، سس فلفل سیاه و گوجه گیلاسی.",
    calories: 440,
    proteinGrams: 46,
    carbsGrams: 18,
    fatGrams: 12,
    dietTags: ["کتوژنیک", "عضله‌ساز"],
    glyphId: "plate",
  },
  {
    id: "dish-4",
    dayLabel: "سه‌شنبه",
    dayKey: "tue",
    mealType: "ناهار اصلی",
    title: "کاسه توفوی دودی ارگانیک با ادامامه و نودل کدو",
    description: "توفوی دست‌ساز سویا با ادامامه تازه، جوانه‌ماش، هویج فرنگی و سس بادام‌زمینی لایت.",
    calories: 390,
    proteinGrams: 28,
    carbsGrams: 34,
    fatGrams: 11,
    dietTags: ["۱۰۰٪ گیاهی", "تخمیری"],
    glyphId: "salad-bowl",
  },
  {
    id: "dish-5",
    dayLabel: "چهارشنبه",
    dayKey: "wed",
    mealType: "برانچ و میان‌وعده",
    title: "تست آووکادو و تخم‌مرغ پوچد روی نان خمیرترش چاودار",
    description: "تخم‌مرغ محلی ارگانیک با آووکادوی لهیده، پرک فلفل قرمز و دانه‌های چیا.",
    calories: 360,
    proteinGrams: 22,
    carbsGrams: 28,
    fatGrams: 16,
    dietTags: ["انرژی پایدار", "فیبر بالا"],
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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-surface border-y border-border-subtle overflow-hidden">
      <div className="max-w-container mx-auto px-4 md:px-8 mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-start">
            <Badge variant="primary" size="sm" className="mb-3">
              منوی چرخشی ۱۴ روزه حس خوب
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-strong tracking-normal">
              هر روز یک طعم تازه؛ بدون یکنواختی رژیم.
            </h2>
            <p className="text-sm text-muted mt-2.5 max-w-xl leading-relaxed">
              تنوع غذایی متضمن ماندگاری رژیم شماست. سرآشپزان حس خوب با نظارت مستقیم متخصص تغذیه، منویی پویا با کیفیت رستورانی و سلامت بالینی طبخ می‌کنند.
            </p>
          </div>

          {/* Slider Arrow Controls (Apple Carousel Style) */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full bg-canvas border border-border-subtle flex items-center justify-center text-strong hover:bg-surface-hover hover:border-primary transition-all active:scale-95 shadow-xs select-none"
              aria-label="آیتم قبلی"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full bg-canvas border border-border-subtle flex items-center justify-center text-strong hover:bg-surface-hover hover:border-primary transition-all active:scale-95 shadow-xs select-none"
              aria-label="آیتم بعدی"
            >
              ←
            </button>
          </div>
        </div>

        {/* Apple Segmented Day Filter Pill Strip */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 select-none">
          {DAY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedDay(tab.key)}
              className={`px-4 py-1.5 text-xs font-bold rounded-pill transition-all whitespace-nowrap ${
                selectedDay === tab.key
                  ? "bg-primary text-white shadow-xs"
                  : "bg-canvas text-muted border border-border-subtle hover:text-strong hover:border-border-control"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic Horizontal Slider Container */}
      <div
        ref={scrollRef}
        className="w-full flex items-stretch gap-6 px-4 md:px-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {filteredDishes.map((dish) => {
          const glyph = dish.glyphId ? BRAND_GLYPHS[dish.glyphId as BrandGlyphId] : undefined;

          return (
            <div
              key={dish.id}
              className="snap-start shrink-0 w-[300px] sm:w-[360px] rounded-[28px] bg-canvas border border-border-subtle p-6 sm:p-7 flex flex-col justify-between hover:border-border-default transition-all duration-medium group shadow-xs hover:shadow-md text-start"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-primary bg-calm px-3 py-1 rounded-pill">
                    {dish.dayLabel} · {dish.mealType}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {dish.dietTags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-muted bg-surface px-2.5 py-0.5 rounded-pill border border-border-subtle font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dish Visual Preview with Subtle Studio Pedestal */}
                <div className="w-full h-44 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center mb-5 overflow-hidden group-hover:scale-[1.02] transition-transform duration-medium relative shadow-inner">
                  <div className="absolute inset-x-6 bottom-3 h-10 bg-canvas/80 rounded-full blur-md opacity-80" />
                  {glyph ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={glyph.path}
                      alt={dish.title}
                      className="w-28 h-28 object-contain drop-shadow-sm relative z-10 transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-calm text-primary font-bold flex items-center justify-center">
                      بشقاب سلامت
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-black text-strong leading-snug mb-2 group-hover:text-primary transition-colors">
                  {dish.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                  {dish.description}
                </p>
              </div>

              {/* Macro Specs Bar (Apple Clean Metrics) */}
              <div className="pt-4 border-t border-border-subtle">
                <div className="grid grid-cols-4 gap-2 mb-5 text-center">
                  <div className="p-2 rounded-xl bg-surface border border-border-subtle">
                    <span className="text-[10px] text-muted block mb-0.5">کالری</span>
                    <span className="text-xs sm:text-sm font-black text-strong font-sans">
                      {toPersianDigits(dish.calories)}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface border border-border-subtle">
                    <span className="text-[10px] text-muted block mb-0.5">پروتئین</span>
                    <span className="text-xs sm:text-sm font-black text-primary font-sans">
                      {toPersianDigits(dish.proteinGrams)}گ
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface border border-border-subtle">
                    <span className="text-[10px] text-muted block mb-0.5">کربوهیدرات</span>
                    <span className="text-xs sm:text-sm font-black text-strong font-sans">
                      {toPersianDigits(dish.carbsGrams)}گ
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface border border-border-subtle">
                    <span className="text-[10px] text-muted block mb-0.5">چربی</span>
                    <span className="text-xs sm:text-sm font-black text-strong font-sans">
                      {toPersianDigits(dish.fatGrams)}گ
                    </span>
                  </div>
                </div>

                <Link href="/start" className="block w-full">
                  <Button
                    variant="tonal"
                    size="sm"
                    isFullWidth
                    className="rounded-pill text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-xs"
                  >
                    انتخاب در پکیج اشتراک ←
                  </Button>
                </Link>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
