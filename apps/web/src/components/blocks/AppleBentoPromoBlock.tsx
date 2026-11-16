// apps/web/src/components/blocks/AppleBentoPromoBlock.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@hessekhub/ui";
import { BRAND_GLYPHS, BrandGlyphId } from "@hessekhub/design-tokens";

export interface BentoCardData {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  badge?: string;
  glyphId?: string;
  stats?: { label: string; value: string }[];
}

export interface AppleBentoPromoBlockProps {
  content?: {
    headingFa?: string;
    subheadingFa?: string;
  };
  cards?: BentoCardData[];
}

const DEFAULT_CARDS: BentoCardData[] = [
  {
    id: "weight-loss",
    eyebrow: "پکیج اختصاصی ۱۲ هفته‌ای",
    title: "تغییر ماندگار، بدون احساس گرسنگی.",
    description: "کالری‌شماری دقیق گرم‌به‌گرم، چربی‌سوزی علمی بدون افت عضلانی و نظارت هفتگی کارشناس ارشد تغذیه.",
    primaryCtaLabel: "سفارش پکیج لاغری",
    primaryCtaHref: "/programs/weight-loss",
    secondaryCtaLabel: "جزئیات بیشتر",
    secondaryCtaHref: "/programs/weight-loss",
    glyphId: "plate",
    stats: [
      { label: "میانگین کاهش ماهانه", value: "۳ تا ۵ کیلو" },
      { label: "تعداد وعده", value: "۳ اصلی + ۲ میان‌وعده" },
    ],
  },
  {
    id: "workday",
    eyebrow: "نهار ارگانیک در محل کار",
    title: "تمرکز بالا، انرژی پایدار در ساعات کاری.",
    description: "ویژه پزشکان، وکلا و مدیران مشهد. ارسال اختصاصی گرم دقیقاً رأس ساعت ۱۱:۳۰ در سجاد، احمدآباد و وکیل‌آباد.",
    primaryCtaLabel: "سفارش پکیج روز کاری",
    primaryCtaHref: "/programs/executive-workday",
    secondaryCtaLabel: "منوی شرکتی",
    secondaryCtaHref: "/programs/executive-workday",
    glyphId: "avocado",
    stats: [
      { label: "ساعت تحویل", value: "۱۱:۰۰ تا ۱۲:۳۰" },
      { label: "پروتئین هر وعده", value: "۳۵+ گرم" },
    ],
  },
  {
    id: "cafe-boutique",
    eyebrow: "شعبه حضوری بلوار هاشمیه",
    title: "کافه‌بوتیک سلامت؛ آرامش در قلب مشهد.",
    description: "برانچ‌های پروتئینی، سالادبارهای غنی‌شده، قهوه تخصصی و ایستگاه تحویل حضوری پکیج‌های رژیمی بدون هزینه پیک.",
    primaryCtaLabel: "مشاهده منوی کافه",
    primaryCtaHref: "/cafe/menu",
    secondaryCtaLabel: "درباره کافه‌بوتیک",
    secondaryCtaHref: "/cafe",
    glyphId: "salad-bowl",
    stats: [
      { label: "ساعت کاری", value: "۸:۰۰ تا ۲۴:۰۰" },
      { label: "موقعیت", value: "مشهد، بلوار هاشمیه" },
    ],
  },
  {
    id: "bmr-tool",
    eyebrow: "موتور آنلاین ارزیابی متابولیک",
    title: "بدن شما دقیقاً به چه میزان کالری نیاز دارد؟",
    description: "محاسبه رایگان نرخ سوخت‌وساز پایه (BMR) و کل انرژی روزانه (TDEE) بر اساس استاندارد جهانی میفلین-سنت‌جور.",
    primaryCtaLabel: "محاسبه آنلاین کالری",
    primaryCtaHref: "/tools/calorie-calculator",
    secondaryCtaLabel: "شروع برنامه",
    secondaryCtaHref: "/start",
    glyphId: "target",
    stats: [
      { label: "زمان محاسبه", value: "کمتر از ۲ دقیقه" },
      { label: "دقت محاسباتی", value: "بالینی ۱۰۰٪" },
    ],
  },
];

export function AppleBentoPromoBlock({ content, cards = DEFAULT_CARDS }: AppleBentoPromoBlockProps) {
  return (
    <section className="w-full py-12 md:py-20 bg-canvas">
      <div className="max-w-container mx-auto px-4 md:px-8">
        {/* Optional Section Header */}
        {content?.headingFa && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-strong mb-4 tracking-normal">
              {content.headingFa}
            </h2>
            {content.subheadingFa && (
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {content.subheadingFa}
              </p>
            )}
          </div>
        )}

        {/* 2x2 Edge-to-Edge Bento Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {cards.map((card) => {
            const glyph = card.glyphId ? BRAND_GLYPHS[card.glyphId as BrandGlyphId] : undefined;

            return (
              <div
                key={card.id}
                className="group relative rounded-3xl bg-surface border border-border-subtle hover:border-border-default transition-all duration-medium shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden p-8 sm:p-10 text-center"
              >
                {/* Top Typography Stack (Apple 3-Layer Formula) */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-accent mb-2 tracking-normal">
                    {card.eyebrow}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-strong leading-tight mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md mb-6">
                    {card.description}
                  </p>

                  {/* Dual Action Pills */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <Link href={card.primaryCtaHref}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-pill px-5 py-2 text-xs font-bold shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {card.primaryCtaLabel}
                      </Button>
                    </Link>

                    {card.secondaryCtaLabel && card.secondaryCtaHref && (
                      <Link
                        href={card.secondaryCtaHref}
                        className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 group/link transition-colors"
                      >
                        <span>{card.secondaryCtaLabel}</span>
                        <span className="inline-block transition-transform group-hover/link:-translate-x-0.5">←</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Bottom Center Visual Presentation */}
                <div className="relative mt-auto pt-4 flex flex-col items-center justify-center">
                  <div className="w-full h-44 sm:h-52 rounded-2xl bg-canvas border border-border-subtle/80 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-medium">
                    {/* Ambient studio glow */}
                    <div className="absolute inset-x-8 bottom-4 h-12 bg-surface/70 rounded-full blur-md opacity-80" />

                    {glyph ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={glyph.path}
                        alt={glyph.faTitle}
                        className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-sm transition-transform duration-medium group-hover:scale-105 relative z-10"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-calm text-primary flex items-center justify-center font-bold text-sm">
                        حس خوب
                      </div>
                    )}

                    {/* Dynamic Floating Pill for specific cards */}
                    {card.id === "cafe-boutique" && (
                      <div className="absolute top-3 start-3 px-3 py-1 bg-surface/95 backdrop-blur-md rounded-pill border border-border-subtle text-[11px] font-bold text-primary flex items-center gap-1.5 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span>قهوه تخصصی و سالادبار</span>
                      </div>
                    )}

                    {card.id === "bmr-tool" && (
                      <div className="absolute top-3 start-3 px-3 py-1 bg-surface/95 backdrop-blur-md rounded-pill border border-border-subtle text-[11px] font-bold text-accent flex items-center gap-1.5 shadow-xs">
                        <span>فرمول Mifflin-St Jeor</span>
                      </div>
                    )}

                    {/* Micro Stats Bar Overlay */}
                    {card.stats && card.stats.length > 0 && (
                      <div className="absolute bottom-3 inset-x-3 bg-surface/90 backdrop-blur-md rounded-xl p-2.5 border border-border-subtle flex items-center justify-around text-center z-10">
                        {card.stats.map((stat, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-[10px] text-muted">{stat.label}</span>
                            <span className="text-xs font-bold text-strong font-sans">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
