// apps/web/src/components/blocks/PackageComparisonBlock.tsx
import React from "react";
import Link from "next/link";
import { Card, Button, Badge, formatToman } from "@hessekhub/ui";

export interface ProgramTierInfo {
  id: string;
  tierType: string;
  tierNameFa: string;
  daysPerWeek: number;
  mealsIncluded: string[];
  basePriceToman: number;
  dailyPriceToman: number;
}

export interface ProgramInfo {
  id: string;
  slug: string;
  titleFa: string;
  headlineFa: string;
  descriptionFa: string;
  coverageTiers: ProgramTierInfo[];
}

export interface PackageComparisonBlockProps {
  content: {
    sectionTitleFa: string;
    sectionSubtitleFa?: string;
  };
  programs?: ProgramInfo[];
}

export function PackageComparisonBlock({
  content,
  programs = [],
}: PackageComparisonBlockProps) {
  return (
    <section id="packages" className="relative w-full py-14 md:py-24 bg-calm/40">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="primary" size="md" className="mb-4">
            پلن‌های اختصاصی تغذیه در مشهد
          </Badge>
          <h2 className="text-2xl md:text-4xl font-extrabold text-strong mb-4">
            {content.sectionTitleFa}
          </h2>
          {content.sectionSubtitleFa && (
            <p className="text-base md:text-lg text-muted leading-relaxed">
              {content.sectionSubtitleFa}
            </p>
          )}
        </div>

        {/* Programs / Tiers Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {programs.map((prog) => {
            const isFeatured = prog.slug === "weight-loss";
            const defaultTier =
              prog.coverageTiers?.find((t) => t.tierType === "FULL_BOARD") ||
              prog.coverageTiers?.[0];

            return (
              <Card
                key={prog.id}
                interactive
                className={`flex flex-col justify-between p-8 relative transition-all duration-base ${
                  isFeatured
                    ? "bg-surface border-2 border-primary shadow-elevation-2 lg:-translate-y-2 ring-4 ring-primary/10"
                    : "bg-surface border border-border-default shadow-elevation-1"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 start-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-primary text-white text-xs font-bold rounded-pill shadow-elevation-1">
                      ★ محبوب‌ترین پکیج مشهد
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <span className="text-xs font-bold text-primary">
                      {isFeatured ? "برنامه کاهش وزن" : "برنامه سبک زندگی"}
                    </span>
                    <span className="text-xs font-medium text-muted">
                      ارسال روزانه در مشهد
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-strong mb-2">
                    {prog.titleFa}
                  </h3>

                  <p className="text-sm text-muted mb-6 leading-relaxed min-h-[40px]">
                    {prog.headlineFa || (prog as any).subtitleFa}
                  </p>

                  {/* Available tiers inside this program */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-strong">
                      سطوح پوشش و تعرفه‌ها:
                    </div>
                    {prog.coverageTiers?.map((tier: any) => (
                      <div
                        key={tier.id}
                        className="p-3.5 rounded-xl bg-canvas border border-border-subtle flex items-center justify-between text-xs hover:border-border-control transition-colors"
                      >
                        <div>
                          <span className="font-bold text-strong block">
                            {tier.titleFa || tier.tierNameFa}
                          </span>
                          <span className="text-muted text-[11px]">
                            {tier.includedMealTypes?.join(" + ") || tier.mealsIncluded?.join(" + ") || "شامل وعده‌های اصلی"}
                          </span>
                        </div>
                        <div className="text-end">
                          <span className="font-black text-primary text-sm block">
                            {formatToman(tier.basePriceToman)}
                          </span>
                          <span className="text-[10px] text-faint">ماهانه</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Benefit Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-success-subtle text-success flex items-center justify-center shrink-0 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>ارسال روزانه بین ۶:۳۰ تا ۸:۳۰ صبح در سراسر مشهد</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-success-subtle text-success flex items-center justify-center shrink-0 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>بسته‌بندی زیست‌تجزیه‌پذیر به همراه جدول ارزش غذایی و ماکرو</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-success-subtle text-success flex items-center justify-center shrink-0 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>نظارت هفتگی کارشناس تغذیه (اشرف رهبری)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border-default flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted">شروع قیمت از:</span>
                    <span className="text-2xl font-black text-strong">
                      {defaultTier ? formatToman(defaultTier.basePriceToman) : "-"}
                    </span>
                  </div>

                  <Link
                    href={`/start?program=${prog.slug}&tier=${defaultTier?.tierType || "FULL_BOARD"}`}
                    className="w-full"
                  >
                    <Button
                      variant={isFeatured ? "primary" : "secondary"}
                      size="lg"
                      className="w-full"
                    >
                      انتخاب و سفارشی‌سازی برنامه
                    </Button>
                  </Link>

                  <Link href={`/programs/${prog.slug}`} className="w-full">
                    <Button variant="ghost" size="sm" className="w-full text-muted hover:text-primary">
                      اطلاعات کامل و منوی چرخش ۱۴ روزه ←
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
