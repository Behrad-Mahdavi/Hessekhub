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
  const avocadoGlyph = BRAND_GLYPHS.avocado;
  const bottleGlyph = BRAND_GLYPHS["water-bottle"];

  return (
    <section className="w-full py-16 md:py-24 bg-subtle border-t border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <LeafCard className="bg-surface border border-border-default shadow-2 p-7 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Editorial Narrative (7 Cols) */}
            <div className="lg:col-span-7 text-start">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <Badge variant="luxe">کافه‌بوتیک سلامتی حس خوب</Badge>
                <span className="text-xs font-medium text-text-muted">
                  حضور فیزیکی برند در مشهد
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-text-strong leading-tight mb-4">
                {content.titleFa}
              </h2>

              <p className="text-base text-text-muted leading-relaxed max-w-[54ch] mb-8">
                {content.descriptionFa}
              </p>

              {/* Location & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-canvas border border-border-subtle">
                  <span className="text-xs text-text-subtle block mb-1">ساعات میزبانی</span>
                  <span className="text-sm font-bold text-text-strong tabular-nums">
                    {content.openHoursFa}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-canvas border border-border-subtle">
                  <span className="text-xs text-text-subtle block mb-1">موقعیت کافه‌بوتیک</span>
                  <span className="text-sm font-bold text-text-strong">
                    {content.locationAddressFa}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href={content.ctaUrl}>
                  <Button variant="accent" size="md" className="w-full sm:w-auto px-7">
                    {content.ctaTextFa} ←
                  </Button>
                </Link>

                <Link href="/cafe">
                  <Button variant="secondary" size="md" className="w-full sm:w-auto px-6">
                    تحویل حضوری پکیج و چیت‌دی
                  </Button>
                </Link>
              </div>
            </div>

            {/* Cafe Signature Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="p-7 rounded-xl bg-calm border border-border-subtle text-center">
                {/* 3 Brand Glyphs Trio */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  {[saladGlyph, avocadoGlyph, bottleGlyph].map((glyph, i) => (
                    <div
                      key={glyph.id}
                      className={`w-16 h-16 rounded-lg bg-surface border border-border-subtle flex items-center justify-center shadow-1 ${
                        i === 1 ? "scale-110" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={glyph.path} alt={glyph.faTitle} className="w-9 h-9 object-contain" />
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-text-strong mb-2">
                  منوی دیجیتال با محاسبه خودکار کالری
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  هر آیتم که در کافه میل می‌کنید، مستقیماً در بودجه کالری روزانه اپلیکیشن شما ثبت می‌شود.
                </p>

                <div className="space-y-2 mb-6 text-start">
                  <div className="p-3 rounded-md bg-surface border border-border-subtle flex items-center justify-between text-xs">
                    <span className="font-bold text-text-strong">تست آووکادو و تخم‌مرغ پوچد</span>
                    <span className="font-bold text-primary-text tabular-nums">۳۸۰ کیلوکالری</span>
                  </div>
                  <div className="p-3 rounded-md bg-surface border border-border-subtle flex items-center justify-between text-xs">
                    <span className="font-bold text-text-strong">اسموتی سوپرگرین دتاکس</span>
                    <span className="font-bold text-primary-text tabular-nums">۱۱۰ کیلوکالری</span>
                  </div>
                  <div className="p-3 rounded-md bg-surface border border-border-subtle flex items-center justify-between text-xs">
                    <span className="font-bold text-text-strong">کلدبرو تخصصی ۱۸ ساعته</span>
                    <span className="font-bold text-primary-text tabular-nums">۵ کیلوکالری</span>
                  </div>
                </div>

                <Link href="/cafe/menu" className="block w-full">
                  <Button variant="secondary" size="sm" className="w-full">
                    سفارش آنلاین از منوی کافه ←
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