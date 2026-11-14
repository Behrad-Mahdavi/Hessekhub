// apps/web/src/components/blocks/RotationalMenuSliderBlock.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS, BrandGlyphId } from "@hessekhub/design-tokens";

export interface MenuItemData {
  id: string;
  dayLabel: string;
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

export function RotationalMenuSliderBlock() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // In RTL: scrollLeft negative or positive depending on browser implementation
      const offset = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-14 md:py-24 bg-surface border-y border-border-subtle overflow-hidden">
      <div className="max-w-container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">
              منوی چرخشی ۱۴ روزه حس خوب
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-strong tracking-normal">
              هر روز یک طعم تازه؛ بدون یکنواختی رژیم.
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-2 max-w-xl">
              تنوع غذایی متضمن ماندگاری رژیم شماست. سرآشپزان حس خوب با نظارت کارشناس تغذیه، منویی پویا با کیفیت رستورانی و سلامت بالینی طبخ می‌کنند.
            </p>
          </div>

          {/* Slider Arrow Controls (Apple Carousel Style) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-canvas border border-border-subtle flex items-center justify-center text-strong hover:bg-surface-hover hover:border-primary transition-all active:scale-95 shadow-xs"
              aria-label="آیتم قبلی"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-canvas border border-border-subtle flex items-center justify-center text-strong hover:bg-surface-hover hover:border-primary transition-all active:scale-95 shadow-xs"
              aria-label="آیتم بعدی"
            >
              ←
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic Horizontal Slider Container */}
      <div
        ref={scrollRef}
        className="w-full flex items-stretch gap-5 px-4 md:px-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {SAMPLE_ROTATIONAL_DISHES.map((dish) => {
          const glyph = dish.glyphId ? BRAND_GLYPHS[dish.glyphId as BrandGlyphId] : undefined;

          return (
            <div
              key={dish.id}
              className="snap-start shrink-0 w-[290px] sm:w-[340px] rounded-3xl bg-canvas border border-border-subtle p-6 flex flex-col justify-between hover:border-border-default transition-all duration-medium group shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold text-primary bg-calm px-2.5 py-1 rounded-pill">
                    {dish.dayLabel} · {dish.mealType}
                  </span>
                  <div className="flex items-center gap-1">
                    {dish.dietTags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-muted bg-surface px-2 py-0.5 rounded-pill border border-border-subtle">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dish Visual Preview */}
                <div className="w-full h-40 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center mb-5 overflow-hidden group-hover:scale-[1.02] transition-transform duration-medium">
                  {glyph ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={glyph.path}
                      alt={dish.title}
                      className="w-24 h-24 object-contain drop-shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-calm text-primary font-bold flex items-center justify-center">
                      غذا
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-strong leading-snug mb-2 group-hover:text-primary transition-colors">
                  {dish.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
                  {dish.description}
                </p>
              </div>

              {/* Macro Specs Bar */}
              <div className="pt-4 border-t border-border-subtle">
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="p-1.5 rounded-lg bg-surface border border-border-subtle">
                    <span className="text-[10px] text-muted block">کالری</span>
                    <span className="text-xs font-bold text-strong">{dish.calories}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-surface border border-border-subtle">
                    <span className="text-[10px] text-muted block">پروتئین</span>
                    <span className="text-xs font-bold text-primary">{dish.proteinGrams}g</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-surface border border-border-subtle">
                    <span className="text-[10px] text-muted block">کربوهیدرات</span>
                    <span className="text-xs font-bold text-strong">{dish.carbsGrams}g</span>
                  </div>
                </div>

                <Link href="/start" className="block w-full">
                  <Button
                    variant="tonal"
                    size="sm"
                    isFullWidth
                    className="rounded-pill text-xs font-bold hover:bg-primary hover:text-white transition-colors"
                  >
                    سفارش در پکیج اشتراک
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
