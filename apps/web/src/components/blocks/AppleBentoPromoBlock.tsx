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
  glyphId?: BrandGlyphId;
  featured?: boolean;
  stats?: { label: string; value: string }[];
}

export interface AppleBentoPromoBlockProps {
  content?: {
    headingFa?: string;
    subheadingFa?: string;
    cards?: BentoCardData[];
  };
}

const DEFAULT_BENTO_CARDS: BentoCardData[] = [
  {
    id: "weight-loss",
    eyebrow: "برنامه نتیجه ۱۲ هفته‌ای",
    title: "تغییر پایدار، با پایش علمی وزن و سایز.",
    description:
      "کالری‌شماری دقیق در ۵ تیپ استاندارد آشپزخانه، بدون حذف گروه‌های غذایی و همراه با تنظیم هفتگی توسط کارشناس ارشد تغذیه.",
    primaryCtaLabel: "شروع برنامه کاهش وزن",
    primaryCtaHref: "/programs/weight-loss",
    secondaryCtaLabel: "جزئیات علمی",
    secondaryCtaHref: "/programs/weight-loss",
    glyphId: "target",
    featured: true,
    stats: [
      { label: "مراحل برنامه", value: "۴ فاز علمی" },
      { label: "تنوع منو", value: "چرخه ۱۴ روزه دوگزینه‌ای" },
    ],
  },
  {
    id: "workday",
    eyebrow: "پکیج روز کاری مشهد",
    title: "تمرکز کامل در ساعات کاری، بدون دغدغه ناهار.",
    description:
      "ویژه پزشکان، مدیران و متخصصان در سجاد، احمدآباد و وکیل‌آباد. ناهار و ۲ میان‌وعده انرژی‌بخش در محل کار، همراه با راهنمای شام خانگی.",
    primaryCtaLabel: "سفارش پکیج روز کاری",
    primaryCtaHref: "/programs/executive-workday",
    secondaryCtaLabel: "مقایسه پوشش‌ها",
    secondaryCtaHref: "/programs",
    glyphId: "bicep-arm",
    stats: [
      { label: "بازه تحویل", value: "۱۱:۳۰ تا ۱۳:۰۰" },
      { label: "پروتئین هر وعده", value: "۳۵ تا ۴۵ گرم" },
    ],
  },
  {
    id: "trial-box",
    eyebrow: "تجربه بدون تعهد",
    title: "پکیج تست ۳ روزه؛ کیفیت را لمس کنید.",
    description:
      "پیش از ثبت‌نام ماهانه، سه روز کامل طعم غذاها، بسته‌بندی و دقت محاسبه کالری حس خوب را در منزل یا محل کار تجربه کنید.",
    primaryCtaLabel: "رزرو پکیج تست ۳ روزه",
    primaryCtaHref: "/start?tier=TRIAL_3_DAY",
    glyphId: "milestone-flag",
    stats: [
      { label: "مدت تست", value: "۳ روز کامل" },
      { label: "شامل", value: "آنالیز متابولیک رایگان" },
    ],
  },
  {
    id: "cafe-boutique",
    eyebrow: "کافه‌بوتیک سلامتی حس خوب",
    title: "صبحانه، سالادبار و قهوه تخصصی در مشهد.",
    description:
      "محیطی آرام برای قرارهای کاری، صرف برانچ‌های سالم بدون شکر افزوده و تحویل حضوری پکیج‌های اشتراک بدون هزینه پیک.",
    primaryCtaLabel: "مشاهده منوی کافه",
    primaryCtaHref: "/cafe/menu",
    secondaryCtaLabel: "آدرس و ساعات کاری",
    secondaryCtaHref: "/cafe",
    glyphId: "salad-bowl",
    stats: [
      { label: "ساعت فعالیت", value: "۸:۰۰ تا ۲۴:۰۰" },
      { label: "چیت‌دی جمعه", value: "رزرو اختصاصی مشترکان" },
    ],
  },
];

export function AppleBentoPromoBlock({ content }: AppleBentoPromoBlockProps) {
  const cards = content?.cards?.length ? content.cards : DEFAULT_BENTO_CARDS;

  return (
    <section className="w-full py-16 md:py-24 bg-canvas">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-text-strong leading-tight mb-4">
            {content?.headingFa || "یک اکوسیستم کامل برای سبک زندگی سالم."}
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            {content?.subheadingFa ||
              "از برنامه‌های ۱۲ هفته‌ای تحول بدن تا پکیج‌های روز کاری و کافه‌بوتیک حضوری در مشهد؛ هر بخش با دقت طراحی شده است."}
          </p>
        </div>

        {/* Asymmetric Apple Bento Grid (12 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {cards.map((card, index) => {
            const glyph = card.glyphId ? BRAND_GLYPHS[card.glyphId] : BRAND_GLYPHS.plate;
            // Card 0 & 3 span 7 cols, Card 1 & 2 span 5 cols for dynamic editorial rhythm
            const colSpanClass =
              index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5";
            const isLeafSignature = index === 0;

            return (
              <article
                key={card.id}
                className={`${colSpanClass} group relative bg-surface border border-border-default hover:border-border-control transition-all duration-base shadow-1 hover:shadow-2 p-7 sm:p-9 flex flex-col justify-between overflow-hidden text-start ${
                  isLeafSignature ? "hk-leaf-card" : "rounded-xl"
                }`}
              >
                {/* Top Copy */}
                <div>
                  <span className="text-xs font-bold text-primary-text block mb-2.5">
                    {card.eyebrow}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-text-strong leading-snug mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed max-w-[52ch] mb-6">
                    {card.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <Link href={card.primaryCtaHref}>
                      <Button variant={isLeafSignature ? "primary" : "tonal"} size="sm">
                        {card.primaryCtaLabel}
                      </Button>
                    </Link>

                    {card.secondaryCtaLabel && card.secondaryCtaHref && (
                      <Link
                        href={card.secondaryCtaHref}
                        className="text-xs font-bold text-primary-text hover:underline inline-flex items-center gap-1 px-2 py-2"
                      >
                        <span>{card.secondaryCtaLabel}</span>
                        <span aria-hidden="true">←</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Bottom Studio Visual Strip */}
                <div className="mt-auto rounded-lg bg-canvas border border-border-subtle p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
                  {/* Glyph Presentation */}
                  <div className="w-20 h-20 rounded-lg bg-surface border border-border-subtle flex items-center justify-center shrink-0 transition-transform duration-base ease-flow group-hover:scale-105">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={glyph.path}
                      alt={glyph.faTitle}
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  {/* Specs Strip */}
                  {card.stats && card.stats.length > 0 && (
                    <div className="flex-1 w-full grid grid-cols-2 gap-3">
                      {card.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-md bg-surface border border-border-subtle"
                        >
                          <span className="text-xs text-text-subtle block mb-1">
                            {stat.label}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-text-strong tabular-nums">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}