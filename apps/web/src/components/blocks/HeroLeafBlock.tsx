// apps/web/src/components/blocks/HeroLeafBlock.tsx
import React from "react";
import Link from "next/link";
import { LeafCard, Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS, BrandGlyphId } from "@hessekhub/design-tokens";

export interface HeroLeafBlockProps {
  content: {
    headlineFa: string;
    subheadlineFa: string;
    primaryCtaTitleFa: string;
    primaryCtaUrl: string;
    secondaryCtaTitleFa?: string;
    secondaryCtaUrl?: string;
    badgeFa?: string;
    glyphId?: string;
  };
}

export function HeroLeafBlock({ content }: HeroLeafBlockProps) {
  const glyph = content.glyphId ? BRAND_GLYPHS[content.glyphId as BrandGlyphId] : BRAND_GLYPHS["brand-hourglass"];

  return (
    <section className="relative w-full py-8 md:py-16 overflow-hidden">
      {/* Warm Ambient Glow in Light Mode */}
      <div
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(208, 223, 249, 0.6) 0%, rgba(243, 247, 255, 0.2) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        <LeafCard glowBorder className="max-w-5xl mx-auto text-start relative overflow-hidden shadow-elevation-2 border-border-default/80 bg-surface/95 backdrop-blur-sm">
          {content.badgeFa && (
            <div className="mb-6 flex items-center gap-2">
              <Badge variant="primary" size="md" dot>
                {content.badgeFa}
              </Badge>
              <span className="text-xs text-muted font-medium hidden sm:inline">
                مشهد · سجاد، ملک‌آباد، وکیل‌آباد، احمدآباد
              </span>
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-strong leading-tight sm:leading-tight lg:leading-tight mb-6">
                {content.headlineFa}
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-[56ch] mb-8">
                {content.subheadlineFa}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link href={content.primaryCtaUrl}>
                  <Button variant="primary" size="lg">
                    {content.primaryCtaTitleFa}
                  </Button>
                </Link>

                {content.secondaryCtaTitleFa && content.secondaryCtaUrl && (
                  <Link href={content.secondaryCtaUrl}>
                    <Button variant="secondary" size="lg">
                      {content.secondaryCtaTitleFa}
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mashhad Social Proof Row */}
              <div className="pt-6 border-t border-border-subtle grid grid-cols-3 gap-4 text-start">
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-primary font-sans">
                    +۱۵,۰۰۰
                  </span>
                  <span className="text-xs text-muted font-medium">وعده غذایی تحویل شده</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-strong font-sans">
                    ۶+ سال
                  </span>
                  <span className="text-xs text-muted font-medium">پیشگامی در مشهد</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-luxe font-sans">
                    ۱۰۰٪
                  </span>
                  <span className="text-xs text-muted font-medium">نظارت کارشناس تغذیه</span>
                </div>
              </div>
            </div>

            {/* Visual Glass Hourglass Card */}
            {glyph && (
              <div className="w-full lg:w-64 shrink-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-calm/70 border border-border-default shadow-elevation-1">
                <div className="w-28 h-28 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center shadow-elevation-1 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={glyph.path}
                    alt={glyph.faTitle}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <span className="font-bold text-sm text-strong mb-1">کافه‌بوتیک و کترینگ سلامت</span>
                <span className="text-xs text-muted text-center">مشهد، بلوار سجاد · اشرف رهبری</span>
              </div>
            )}
          </div>
        </LeafCard>
      </div>
    </section>
  );
}

