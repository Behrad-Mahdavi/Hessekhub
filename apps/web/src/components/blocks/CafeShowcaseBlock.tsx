// apps/web/src/components/blocks/CafeShowcaseBlock.tsx
import React from "react";
import Link from "next/link";
import { LeafCard, Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";

export interface CafeShowcaseBlockProps {
  content: {
    titleFa: string;
    descriptionFa: string;
    openHoursFa: string;
    locationAddressFa: string;
    ctaTextFa: string;
    ctaUrl: string;
  };
}

export function CafeShowcaseBlock({ content }: CafeShowcaseBlockProps) {
  const saladGlyph = BRAND_GLYPHS["salad-bowl"];
  const avocadoGlyph = BRAND_GLYPHS["avocado"];

  return (
    <section className="relative w-full py-12 md:py-20 bg-surface/50">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <LeafCard glowBorder className="overflow-hidden bg-surface shadow-elevation-2 border-border-default/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Right: Info & Story */}
            <div className="lg:col-span-7 text-start">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="luxe" size="md">
                  کافه‌بوتیک فیزیکی حس خوب در مشهد (فعال از ۱۳۹۷)
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-calm text-primary text-xs font-bold rounded-pill border border-border-subtle">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span>سرو حضوری و بیرون‌بر</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-strong mb-4 leading-tight">
                {content.titleFa}
              </h2>

              <p className="text-base sm:text-lg text-muted mb-8 leading-relaxed max-w-xl">
                {content.descriptionFa}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-canvas border border-border-default flex flex-col gap-1.5">
                  <span className="text-xs text-muted font-bold flex items-center gap-1.5">
                    <span>🕒</span> ساعات کاری کافه‌بوتیک
                  </span>
                  <span className="text-sm font-black text-strong font-sans">
                    {content.openHoursFa}
                  </span>
                  <span className="text-[11px] text-faint">همه‌روزه حتی ایام تعطیل</span>
                </div>

                <div className="p-4 rounded-2xl bg-canvas border border-border-default flex flex-col gap-1.5">
                  <span className="text-xs text-muted font-bold flex items-center gap-1.5">
                    <span>📍</span> موقعیت در مشهد
                  </span>
                  <span className="text-sm font-black text-strong">
                    {content.locationAddressFa}
                  </span>
                  <span className="text-[11px] text-faint">دسترسی آسان با پارکینگ مناسب</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href={content.ctaUrl}>
                  <Button variant="primary" size="lg">
                    {content.ctaTextFa}
                  </Button>
                </Link>

                <Link href="/cafe">
                  <Button variant="secondary" size="lg">
                    درباره کافه‌بوتیک و تصاویر فضا
                  </Button>
                </Link>
              </div>
            </div>

            {/* Left: Atmospheric Visual Badges */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full p-8 rounded-3xl bg-calm/70 border border-border-default shadow-elevation-1 flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-6">
                  {saladGlyph && (
                    <div className="w-18 h-18 p-3 rounded-2xl bg-surface border border-border-default flex items-center justify-center shadow-elevation-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={saladGlyph.path}
                        alt={saladGlyph.faTitle}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}
                  {avocadoGlyph && (
                    <div className="w-18 h-18 p-3 rounded-2xl bg-surface border border-border-default flex items-center justify-center shadow-elevation-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={avocadoGlyph.path}
                        alt={avocadoGlyph.faTitle}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-black text-strong mb-2">
                  قهوه تخصصی، برانچ سلامت و ناهار پرپروتئین
                </h3>
                <p className="text-xs text-muted leading-relaxed max-w-sm mb-4">
                  طبخ بدون روغن‌های ترانس و با مواد اولیه ارگانیک تازه روز. مشترکین پکیج‌های رژیمی می‌توانند قهوه و نوشیدنی‌های سلامتی خود را در کافه با تخفیف ویژه دریافت کنند.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-primary">
                  <span>مشاهده بیش از ۳۵ قلم منوی سالم ←</span>
                </div>
              </div>
            </div>
          </div>
        </LeafCard>
      </div>
    </section>
  );
}

