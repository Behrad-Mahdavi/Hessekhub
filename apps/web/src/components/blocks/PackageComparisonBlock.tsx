// apps/web/src/components/blocks/PackageComparisonBlock.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Button, Badge, formatToman } from "@hessekhub/ui";

export interface ProgramTierInfo {
  id: string;
  tierType: string;
  tierNameFa: string;
  titleFa?: string;
  daysPerWeek?: number;
  daysCount?: number;
  mealsIncluded?: string[];
  includedMealTypes?: string[];
  basePriceToman: number | bigint;
  dailyPriceToman?: number | bigint;
  dailyDisplayPrice?: number | bigint;
  badgeFa?: string;
}

export interface ProgramInfo {
  id: string;
  slug: string;
  titleFa: string;
  headlineFa: string;
  subtitleFa?: string;
  descriptionFa: string;
  coverageTiers: ProgramTierInfo[];
}

export interface PackageComparisonBlockProps {
  content?: {
    sectionTitleFa?: string;
    sectionSubtitleFa?: string;
  };
  programs?: ProgramInfo[];
}

export function PackageComparisonBlock({
  content = {},
  programs = [],
}: PackageComparisonBlockProps) {
  // Store selected tier per program slug for interactive switching
  const [selectedTiers, setSelectedTiers] = useState<Record<string, string>>({
    "weight-loss": "FULL_BOARD",
    "executive-workday": "EXECUTIVE_WORKDAY",
    maintenance: "MAINTENANCE_LIGHT",
  });

  const handleSelectTier = (programSlug: string, tierType: string) => {
    setSelectedTiers((prev) => ({ ...prev, [programSlug]: tierType }));
  };

  return (
    <section id="packages" className="relative w-full py-16 md:py-28 bg-canvas">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 start-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 end-1/4 w-[400px] h-[400px] bg-luxe/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Apple Style Lineup Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="primary" size="md" className="mb-4">
            پلن‌های رژیمی با فعال‌سازی آنی
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-strong mb-4 tracking-normal">
            {content.sectionTitleFa || "کدام پکیج برای سبک زندگی شما ایده‌آل است؟"}
          </h2>
          {content.sectionSubtitleFa ? (
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-[54ch] mx-auto">
              {content.sectionSubtitleFa}
            </p>
          ) : (
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-[54ch] mx-auto">
              تمام وعده‌ها با نظارت بالینی متخصص تغذیه، طبخ روزانه و ارسال در ظروف ارگانیک و حرارتی به تمام مشهد ارائه می‌شوند.
            </p>
          )}
        </div>

        {/* 3-Column Luxury Program Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {programs.map((prog) => {
            const isFeatured = prog.slug === "weight-loss";
            const tiers = prog.coverageTiers || [];
            
            const activeTierType = selectedTiers[prog.slug] || tiers[0]?.tierType || "FULL_BOARD";
            const currentTier = tiers.find((t) => t.tierType === activeTierType) || tiers[0];

            return (
              <Card
                key={prog.id}
                className={`relative flex flex-col justify-between p-8 md:p-9 rounded-[32px] transition-all duration-medium text-start ${
                  isFeatured
                    ? "bg-surface border-2 border-primary shadow-[0_25px_60px_-10px_rgba(38,79,163,0.14)] lg:-translate-y-3 ring-4 ring-primary/10"
                    : "bg-surface border border-border-default/90 shadow-[0_10px_30px_rgba(16,15,13,0.04)] hover:border-border-control hover:shadow-md"
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 select-none">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-primary text-white text-xs font-bold rounded-pill shadow-xs">
                      ★ محبوب‌ترین انتخاب در مشهد
                    </span>
                  </div>
                )}

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <span className="text-xs font-bold text-primary px-3 py-1 rounded-pill bg-primary-subtle border border-primary/20">
                      {isFeatured
                        ? "کاهش وزن و لاغری اصولی"
                        : prog.slug === "executive-workday"
                        ? "پکیج اختصاصی شاغلین"
                        : "تثبیت و حفظ متابولیسم"}
                    </span>
                    <span className="text-xs font-medium text-muted">
                      ارسال روزانه مشهد
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-strong mb-2.5">
                    {prog.titleFa}
                  </h3>

                  <p className="text-sm text-muted mb-6 leading-relaxed min-h-[44px]">
                    {prog.headlineFa || prog.subtitleFa || prog.descriptionFa}
                  </p>

                  {/* Interactive Tier Switcher Tabs (Apple Segmented Style) */}
                  {tiers.length > 1 && (
                    <div className="mb-6">
                      <div className="text-xs font-bold text-strong mb-2.5 flex items-center justify-between">
                        <span>انتخاب سطح پوشش وعده‌ها:</span>
                        <span className="text-[11px] text-primary font-bold">قابل سفارشی‌سازی</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {tiers.map((tier) => {
                          const isSelected = tier.tierType === activeTierType;
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => handleSelectTier(prog.slug, tier.tierType)}
                              className={`p-3 rounded-2xl text-start text-xs flex items-center justify-between border transition-all duration-fast select-none ${
                                isSelected
                                  ? "bg-primary-subtle border-primary text-strong font-bold shadow-xs"
                                  : "bg-canvas border-border-subtle text-muted hover:border-border-control"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "border-primary bg-primary text-white"
                                      : "border-border-default bg-surface"
                                  }`}
                                >
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </span>
                                <span>{tier.titleFa || tier.tierNameFa}</span>
                              </div>
                              <span className="font-sans font-bold text-primary">
                                {formatToman(tier.basePriceToman)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Program Features Checklist */}
                  <div className="space-y-3 mb-8 pt-4 border-t border-border-subtle/80 text-xs text-muted">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-success-subtle text-success flex items-center justify-center shrink-0 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>طبخ روزانه ۶:۰۰ صبح و تحویل درب منزل یا محل کار در مشهد</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-success-subtle text-success flex items-center justify-center shrink-0 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>منوی چرخشی ۱۴ روزه با ۲ گزینه انتخابی برای هر وعده</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-success-subtle text-success flex items-center justify-center shrink-0 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>پایش هفتگی بیومتریک و نظارت مستقیم متخصص تغذیه</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-success-subtle text-success flex items-center justify-center shrink-0 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>امکان فریز و توقف تا سقف ۶ روز در هر دوره ماهانه</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Activation Action */}
                <div className="pt-6 border-t border-border-default flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-muted block">تعرفه دوره:</span>
                      {currentTier?.dailyDisplayPrice && (
                        <span className="text-[11px] text-primary font-bold">
                          معادل روزانه {formatToman(currentTier.dailyDisplayPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-black text-strong font-sans">
                      {currentTier ? formatToman(currentTier.basePriceToman) : "-"}
                    </span>
                  </div>

                  <Link
                    href={`/start?program=${prog.slug}&tier=${currentTier?.tierType || "FULL_BOARD"}`}
                    className="w-full"
                  >
                    <Button
                      variant={isFeatured ? "primary" : "secondary"}
                      size="lg"
                      className="w-full shadow-elevation-1 hover:shadow-elevation-2 transition-all font-bold rounded-pill"
                    >
                      انتخاب این برنامه و سفارشی‌سازی ←
                    </Button>
                  </Link>

                  <Link href={`/programs/${prog.slug}`} className="w-full">
                    <Button variant="ghost" size="sm" className="w-full text-muted hover:text-primary">
                      مشاهده جزئیات علمی و گزینه‌های منو
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
