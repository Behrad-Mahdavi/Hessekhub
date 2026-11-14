// apps/web/src/components/blocks/BmrTeaserBlock.tsx
import React from "react";
import Link from "next/link";
import { Card, Button, Badge } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";

export interface BmrTeaserBlockProps {
  content?: {
    headlineFa?: string;
    subheadlineFa?: string;
    ctaTitleFa?: string;
    ctaUrl?: string;
  };
}

export function BmrTeaserBlock({ content }: BmrTeaserBlockProps) {
  const targetGlyph = BRAND_GLYPHS["target"];

  const headline =
    content?.headlineFa || "محاسبه آنلاین کالری پایه و برنامه اختصاصی شما در کمتر از ۲ دقیقه";
  const subheadline =
    content?.subheadlineFa ||
    "موتور هوشمند حس خوب با استفاده از فرمول پیشرفته میفلین-سنت جور (Mifflin-St Jeor) و متغیرهای فردی شما، دقیق‌ترین کالری هدف و توزیع درشت‌مغذی‌ها را محاسبه می‌کند.";
  const ctaTitle = content?.ctaTitleFa || "ورود به ماشین‌حساب هوشمند کالری";
  const ctaUrl = content?.ctaUrl || "/tools/calorie-calculator";

  return (
    <section className="relative w-full py-12 md:py-18">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <Card className="p-8 md:p-12 border-primary/30 bg-gradient-to-br from-calm/70 via-surface to-surface relative overflow-hidden text-start shadow-elevation-2">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" size="md">
                ماشین‌حساب هوشمند و رایگان BMR & TDEE
              </Badge>
              <span className="text-xs text-muted font-medium hidden sm:inline">
                فرمول استاندارد بین‌المللی Mifflin-St Jeor
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-strong mb-4 leading-tight">
              {headline}
            </h2>

            <p className="text-base text-muted mb-8 leading-relaxed">
              {subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href={ctaUrl}>
                <Button variant="primary" size="lg">
                  {ctaTitle}
                </Button>
              </Link>

              <Link href="/start">
                <Button variant="secondary" size="lg">
                  شروع ثبت‌نام مستقیم پکیج
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex absolute -end-6 -bottom-6 w-80 h-80 rounded-full bg-primary-subtle/40 items-center justify-center pointer-events-none">
            {targetGlyph && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={targetGlyph.path}
                alt="هدف کالری"
                className="w-40 h-40 object-contain opacity-30 rotate-12"
              />
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
