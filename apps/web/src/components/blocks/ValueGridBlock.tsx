// apps/web/src/components/blocks/ValueGridBlock.tsx
import React from "react";
import { Card, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS, BrandGlyphId } from "@hessekhub/design-tokens";

export interface ValueGridItem {
  glyphId: string;
  titleFa: string;
  descriptionFa: string;
}

export interface ValueGridBlockProps {
  content: {
    sectionTitleFa: string;
    sectionSubtitleFa?: string;
    items: ValueGridItem[];
  };
}

const PILL_TAGS = ["تنوع و عدم تکرار", "استاندارد ارگانیک", "پایش بیومتریک", "کافه‌بوتیک سلامت"];

export function ValueGridBlock({ content }: ValueGridBlockProps) {
  const persianNumbers = ["۰۱", "۰۲", "۰۳", "۰۴"];

  return (
    <section className="relative w-full py-16 md:py-24 bg-surface/50 border-y border-border-subtle/80 overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/2 start-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-luxe/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="primary" size="md" className="mb-4">
            تمایز و استانداردهای کیفی حس خوب
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-strong mb-4">
            {content.sectionTitleFa}
          </h2>
          {content.sectionSubtitleFa && (
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-[54ch] mx-auto">
              {content.sectionSubtitleFa}
            </p>
          )}
        </div>

        {/* 4-Column Luxury Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {content.items.map((item, idx) => {
            const glyph = BRAND_GLYPHS[item.glyphId as BrandGlyphId];
            const number = persianNumbers[idx] || `۰${idx + 1}`;
            const tag = PILL_TAGS[idx] || "استاندارد حس خوب";

            return (
              <Card
                key={idx}
                interactive
                className="group relative flex flex-col justify-between p-8 text-start h-full bg-surface border-border-default/80 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_10px_25px_-5px_rgba(16,15,13,0.04)] hover:shadow-[0_20px_35px_-10px_rgba(16,15,13,0.08)] overflow-hidden"
              >
                {/* Large Subtle Editorial Number watermark */}
                <span className="absolute top-4 end-6 text-4xl font-black text-border-default/60 font-sans select-none transition-colors group-hover:text-primary/20">
                  {number}
                </span>

                <div>
                  {/* Glyph Container with ambient glow on hover */}
                  <div className="w-16 h-16 rounded-2xl bg-calm/80 border border-border-subtle flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:border-primary/30 transition-all duration-300 shrink-0">
                    {glyph ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={glyph.path}
                        alt={item.titleFa}
                        className="w-9 h-9 object-contain"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-primary" />
                    )}
                  </div>

                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-primary px-2 py-0.5 rounded bg-primary-subtle border border-primary/20 inline-block mb-2">
                      {tag}
                    </span>
                    <h3 className="text-lg font-bold text-strong leading-snug">
                      {item.titleFa}
                    </h3>
                  </div>

                  <p className="text-sm text-muted leading-relaxed mt-2.5">
                    {item.descriptionFa}
                  </p>
                </div>

                {/* Bottom luxury accent border */}
                <div className="mt-6 pt-4 border-t border-border-subtle/70 flex items-center justify-between text-xs text-muted">
                  <span className="font-sans font-medium text-[11px]">HESSEKHUB STANDARD</span>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    ←
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
