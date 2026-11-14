// apps/web/src/components/blocks/HeroLeafBlock.tsx
import React from "react";
import Link from "next/link";
import { LeafCard, Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";

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
  const hourglassGlyph = BRAND_GLYPHS["brand-hourglass"];
  const plateGlyph = BRAND_GLYPHS["plate"];

  return (
    <section className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Ambient Organic Radiant Glows (Light Mode Luxury) */}
      <div
        className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-60 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(208, 223, 249, 0.45) 0%, rgba(244, 224, 203, 0.25) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        <LeafCard glowBorder className="max-w-6xl mx-auto text-start relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(20,35,70,0.07)] border-border-default/90 bg-surface/90 backdrop-blur-xl p-8 md:p-12 lg:p-14">
          
          {/* Header Metadata Pill & Live Indicator */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/80 pb-6">
            <div className="flex items-center gap-3">
              <Badge variant="primary" size="md" dot>
                {content.badgeFa || "پیشگام سبک زندگی سالم از ۱۳۹۷ در مشهد"}
              </Badge>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-canvas text-xs font-medium text-muted border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                تحویل روزانه ۶:۳۰ تا ۸:۳۰ صبح در مشهد
              </span>
            </div>

            <div className="text-xs text-muted font-sans font-bold flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-calm text-primary text-[11px]">CLINICALLY SUPERVISED</span>
              <span>EST. 1397 / MHD</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14">
            
            {/* Left Content Column */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-strong leading-[1.25] sm:leading-[1.25] lg:leading-[1.2] mb-6">
                {content.headlineFa}
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-[58ch]">
                {content.subheadlineFa}
              </p>

              {/* CTAs & Service Assurance */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link href={content.primaryCtaUrl}>
                  <Button variant="primary" size="lg" className="shadow-elevation-2 hover:shadow-elevation-3 transition-all text-base px-8 py-3.5">
                    {content.primaryCtaTitleFa} ←
                  </Button>
                </Link>

                {content.secondaryCtaTitleFa && content.secondaryCtaUrl && (
                  <Link href={content.secondaryCtaUrl}>
                    <Button variant="secondary" size="lg" className="border-border-default/90 text-base px-6 py-3.5 hover:bg-surface-hover">
                      {content.secondaryCtaTitleFa}
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mashhad Social Proof & Clinical Trust Strip */}
              <div className="pt-8 border-t border-border-subtle/80 grid grid-cols-3 gap-6 text-start">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-primary font-sans">
                    +۱۵,۰۰۰
                  </span>
                  <span className="text-xs text-muted font-medium mt-1 block">وعده غذایی ارگانیک</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-strong font-sans">
                    ۶+ سال
                  </span>
                  <span className="text-xs text-muted font-medium mt-1 block">پیشگامی در مشهد</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-luxe font-sans">
                    ۱۰۰٪
                  </span>
                  <span className="text-xs text-muted font-medium mt-1 block">نظارت کارشناس تغذیه</span>
                </div>
              </div>
            </div>

            {/* Right: The Luxury Haute-Gastronomy Showcase Card */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="relative rounded-3xl bg-gradient-to-b from-surface to-canvas border border-border-default/90 p-6 shadow-elevation-2 overflow-hidden transition-all duration-base hover:shadow-elevation-3">
                {/* Ambient glow inside card */}
                <div className="absolute top-0 end-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-strong">نمونه بشقاب امروز</span>
                  </div>
                  <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 rounded-pill bg-calm border border-border-subtle">
                    منوی چرخشی ۱۴ روزه
                  </span>
                </div>

                {/* Dish Graphic & Title */}
                <div className="p-4 rounded-2xl bg-surface border border-border-subtle shadow-sm mb-5 text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-calm/70 border border-border-subtle flex items-center justify-center mb-3 shadow-inner">
                    {plateGlyph ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={plateGlyph.path}
                        alt="بشقاب حس خوب"
                        className="w-12 h-12 object-contain"
                      />
                    ) : hourglassGlyph ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={hourglassGlyph.path}
                        alt="حس خوب"
                        className="w-12 h-12 object-contain"
                      />
                    ) : null}
                  </div>
                  <h3 className="font-bold text-sm text-strong mb-1">
                    چلو جوجه زعفرانی با برنج قهوه‌ای
                  </h3>
                  <p className="text-[11px] text-muted line-clamp-1">
                    روغن زیتون فرابکر · بروکلی بخارپز · زعفران قائنات
                  </p>
                </div>

                {/* Precision Macro Meters Grid */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-canvas border border-border-subtle/70">
                    <span className="text-muted">کالری مهندسی‌شده:</span>
                    <span className="font-black text-strong font-sans">۵۲۰ kcal</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-canvas border border-border-subtle/70">
                    <span className="text-muted">پروتئین خالص ارگانیک:</span>
                    <span className="font-black text-primary font-sans">۴۶ g</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-canvas border border-border-subtle/70">
                    <span className="text-muted">کربوهیدرات پیچیده:</span>
                    <span className="font-black text-strong font-sans">۵۸ g</span>
                  </div>
                </div>

                {/* Clinical Guarantee Footer */}
                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px]">
                  <span className="text-muted">نظارت مستمر:</span>
                  <span className="font-bold text-strong">اشرف رهبری (کارشناس تغذیه)</span>
                </div>
              </div>
            </div>

          </div>
        </LeafCard>
      </div>
    </section>
  );
}
