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
  const waterGlyph = BRAND_GLYPHS["water-bottle"];

  return (
    <section className="relative w-full py-16 md:py-24 bg-surface/60 overflow-hidden border-t border-border-subtle/80">
      {/* Background radial warmth */}
      <div className="absolute top-1/2 start-0 w-[500px] h-[500px] bg-luxe/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        <LeafCard glowBorder className="overflow-hidden bg-surface shadow-[0_20px_50px_-15px_rgba(20,35,70,0.06)] border-border-default/90 p-8 md:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Right: Info & Story */}
            <div className="lg:col-span-7 text-start">
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <Badge variant="luxe" size="md">
                  کافه‌بوتیک سلامت سجاد مشهد · تاسیس ۱۳۹۷
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-calm text-primary text-xs font-bold rounded-pill border border-border-subtle shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span>سرو حضوری، بیرون‌بر و دلیوری سریع</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-strong mb-5 leading-tight">
                {content.titleFa}
              </h2>

              <p className="text-base sm:text-lg text-muted mb-8 leading-relaxed max-w-xl">
                {content.descriptionFa}
              </p>

              {/* Physical specs cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-canvas border border-border-subtle flex flex-col gap-1.5 shadow-sm">
                  <span className="text-xs text-muted font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    ساعات کاری کافه‌بوتیک:
                  </span>
                  <span className="text-sm font-black text-strong font-sans">
                    {content.openHoursFa}
                  </span>
                  <span className="text-[11px] text-faint">همه‌روزه حتی ایام تعطیل سال</span>
                </div>

                <div className="p-4 rounded-2xl bg-canvas border border-border-subtle flex flex-col gap-1.5 shadow-sm">
                  <span className="text-xs text-muted font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-luxe" />
                    آدرس و موقعیت در مشهد:
                  </span>
                  <span className="text-sm font-black text-strong">
                    {content.locationAddressFa}
                  </span>
                  <span className="text-[11px] text-faint">دسترسی آسان با پارکینگ اختصاصی</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href={content.ctaUrl}>
                  <Button variant="primary" size="lg" className="shadow-elevation-2 font-bold px-8 py-3.5">
                    {content.ctaTextFa} ←
                  </Button>
                </Link>

                <Link href="/cafe">
                  <Button variant="secondary" size="lg" className="border-border-default px-6 py-3.5">
                    درباره فضای کافه و منوی دیجیتال
                  </Button>
                </Link>
              </div>
            </div>

            {/* Left: Atmospheric Interactive Taste Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full p-8 rounded-3xl bg-gradient-to-b from-calm/80 to-surface border border-border-default/90 shadow-elevation-2 flex flex-col items-center text-center relative overflow-hidden">
                
                {/* 3 Bespoke Glyphs Row */}
                <div className="flex items-center gap-3 mb-6">
                  {saladGlyph && (
                    <div className="w-16 h-16 p-3 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={saladGlyph.path}
                        alt={saladGlyph.faTitle}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  )}
                  {avocadoGlyph && (
                    <div className="w-16 h-16 p-3 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center shadow-sm scale-110 ring-2 ring-primary/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={avocadoGlyph.path}
                        alt={avocadoGlyph.faTitle}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  )}
                  {waterGlyph && (
                    <div className="w-16 h-16 p-3 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={waterGlyph.path}
                        alt={waterGlyph.faTitle}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-black text-strong mb-2">
                  قهوه تخصصی، برانچ سلامت و دتاکس
                </h3>
                
                <p className="text-xs text-muted leading-relaxed max-w-sm mb-6">
                  طبخ روزانه با مواد اولیه ۱۰۰٪ ارگانیک، بدون شکر افزوده و بدون روغن‌های ترانس. مناسب برای قرارهای کاری، استراحت بعد از تمرین و دورهمی‌های سالم.
                </p>

                {/* Popular items pills */}
                <div className="w-full space-y-2 mb-6 text-start">
                  <div className="p-2.5 rounded-xl bg-canvas border border-border-subtle flex items-center justify-between text-xs">
                    <span className="font-bold text-strong">تست آووکادو با تخم‌مرغ پوچد</span>
                    <span className="font-sans font-black text-primary">۳۸۰ kcal</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-canvas border border-border-subtle flex items-center justify-between text-xs">
                    <span className="font-bold text-strong">اسموتی دتاکس سوپرگرین</span>
                    <span className="font-sans font-black text-primary">۱۱۰ kcal</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-canvas border border-border-subtle flex items-center justify-between text-xs">
                    <span className="font-bold text-strong">کلدبرو تخصصی حس خوب (۱۸ ساعته)</span>
                    <span className="font-sans font-black text-primary">۵ kcal</span>
                  </div>
                </div>

                <Link href="/cafe/menu" className="w-full">
                  <Button variant="ghost" size="sm" className="w-full text-primary font-bold hover:bg-calm">
                    مشاهده تمام آیتم‌های منوی دیجیتال کافه ←
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </LeafCard>
      </div>
    </section>
  );
}
