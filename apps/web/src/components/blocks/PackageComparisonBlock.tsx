"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Badge, formatToman } from "@hessekhub/ui";

export interface ProgramTierInfo {
  id: string;
  tierType: string;
  tierNameFa?: string;
  titleFa?: string;
  basePriceToman: number | bigint;
  dailyDisplayPrice?: number | bigint;
  badgeFa?: string;
}

export interface ProgramInfo {
  id: string;
  slug: string;
  titleFa: string;
  headlineFa?: string;
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
  const [selectedTiers, setSelectedTiers] = useState<Record<string, string>>({});

  if (!programs || programs.length === 0) return null;

  return (
    <section id="packages" className="w-full py-16 md:py-24 bg-canvas">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="primary" className="mb-3">
            برنامه‌های نتیجه‌محور حس خوب
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-text-strong leading-tight mb-4">
            {content.sectionTitleFa || "برنامه‌ای متناسب با ریتم زندگی خود انتخاب کنید."}
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            {content.sectionSubtitleFa ||
              "امکان انتخاب پوشش کامل روزانه یا پکیج روز کاری؛ همراه با قابلیت فریز روزهای مسافرت و نظارت هفتگی کارشناس تغذیه."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {programs.map((prog) => {
            const isFeatured = prog.slug === "weight-loss";
            const tiers = prog.coverageTiers || [];
            const activeTierType =
              selectedTiers[prog.slug] || tiers[0]?.tierType || "FULL_BOARD";
            const currentTier =
              tiers.find((t) => t.tierType === activeTierType) || tiers[0];

            return (
              <article
                key={prog.id}
                className={`relative rounded-xl bg-surface p-7 sm:p-8 flex flex-col justify-between text-start transition-all duration-base ${
                  isFeatured
                    ? "border-2 border-primary shadow-3 lg:-translate-y-2"
                    : "border border-border-default shadow-1 hover:border-border-control"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 start-6">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-pill bg-primary text-primary-on text-xs font-bold shadow-1">
                      محبوب‌ترین انتخاب
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-text-strong mb-2 mt-1">
                    {prog.titleFa}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {prog.subtitleFa || prog.headlineFa || prog.descriptionFa}
                  </p>

                  {/* Tier Switcher */}
                  {tiers.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold text-text-strong block">
                        انتخاب پوشش وعده‌ها:
                      </span>
                      {tiers.map((tier) => {
                        const isSelected = tier.tierType === activeTierType;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() =>
                              setSelectedTiers((prev) => ({
                                ...prev,
                                [prog.slug]: tier.tierType,
                              }))
                            }
                            className={`w-full p-3 rounded-md text-start text-xs flex items-center justify-between border transition-all duration-fast ${
                              isSelected
                                ? "bg-primary-subtle border-primary text-text-strong font-bold"
                                : "bg-canvas border-border-subtle text-text-muted hover:border-border-control"
                            }`}
                          >
                            <span>{tier.titleFa || tier.tierNameFa}</span>
                            <span className="font-bold text-primary-text tabular-nums">
                              {formatToman(tier.basePriceToman)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Core Guarantees */}
                  <ul className="space-y-2.5 pt-4 border-t border-border-subtle text-xs text-text-muted mb-8">
                    <li className="flex items-center gap-2">
                      <span className="text-success-text font-bold" aria-hidden="true">✓</span>
                      <span>منوی چرخشی ۱۴ روزه با امکان تغییر گزینه غذا</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success-text font-bold" aria-hidden="true">✓</span>
                      <span>پایش هفتگی وزن و سایز دور شکم توسط کارشناس</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success-text font-bold" aria-hidden="true">✓</span>
                      <span>قابلیت فریز اشتراک تا ۴۸ ساعت قبل و برگشت به کیف پول</span>
                    </li>
                  </ul>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-5 border-t border-border-default">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-text-subtle block">سرمایه‌گذاری دوره</span>
                      {currentTier?.dailyDisplayPrice && (
                        <span className="text-xs text-primary-text font-medium tabular-nums">
                          روزانه {formatToman(currentTier.dailyDisplayPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-black text-text-strong tabular-nums">
                      {currentTier ? formatToman(currentTier.basePriceToman) : "—"}
                    </span>
                  </div>

                  <Link
                    href={`/start?program=${prog.slug}&tier=${currentTier?.tierType || "FULL_BOARD"}`}
                    className="block w-full mb-2"
                  >
                    <Button
                      variant={isFeatured ? "primary" : "secondary"}
                      size="md"
                      className="w-full"
                    >
                      شروع این برنامه ←
                    </Button>
                  </Link>

                  <Link href={`/programs/${prog.slug}`} className="block w-full">
                    <Button variant="ghost" size="sm" className="w-full text-text-muted">
                      بررسی جزئیات برنامه
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}