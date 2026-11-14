// apps/web/src/components/blocks/ValueGridBlock.tsx
import React from "react";
import { Card } from "@hessekhub/ui";
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

export function ValueGridBlock({ content }: ValueGridBlockProps) {
  return (
    <section className="relative w-full py-12 md:py-20 bg-surface/40">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-primary uppercase block mb-2">
            مزیت‌های تمایز حس خوب در مشهد
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-strong mb-4">
            {content.sectionTitleFa}
          </h2>
          {content.sectionSubtitleFa && (
            <p className="text-base md:text-lg text-muted leading-relaxed">
              {content.sectionSubtitleFa}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item, idx) => {
            const glyph = BRAND_GLYPHS[item.glyphId as BrandGlyphId];

            return (
              <Card
                key={idx}
                interactive
                className="flex flex-col items-start p-6 text-start h-full bg-surface border-border-default/70 hover:border-primary/40 transition-all duration-base shadow-elevation-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-calm border border-border-subtle flex items-center justify-center mb-6 shadow-elevation-1 shrink-0">
                  {glyph ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={glyph.path}
                      alt={item.titleFa}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-strong mb-2.5">
                  {item.titleFa}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {item.descriptionFa}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

