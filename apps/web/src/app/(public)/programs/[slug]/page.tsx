// apps/web/src/app/(public)/programs/[slug]/page.tsx
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgramBySlug, getPrograms } from "@/lib/api";
import { Card, Button, Badge, formatToman } from "@hessekhub/ui";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};

  const seo = program.seoMeta;

  return {
    title: seo?.metaTitleFa || `${program.titleFa} | پکیج غذای رژیمی مشهد`,
    description:
      seo?.metaDescriptionFa ||
      `${program.subtitleFa} با نظارت کارشناس تغذیه و ارسال روزانه به سراسر مشهد.`,
    alternates: {
      canonical: `https://hessekhub.ir/programs/${slug}`,
    },
    openGraph: {
      title: program.titleFa,
      description: program.subtitleFa,
      url: `https://hessekhub.ir/programs/${slug}`,
    },
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const productSchema = {
    "@type": "Product",
    "@id": `https://hessekhub.ir/programs/${program.slug}#product`,
    name: program.titleFa,
    description: program.subtitleFa,
    url: `https://hessekhub.ir/programs/${program.slug}`,
    offers: program.coverageTiers.map((t) => ({
      "@type": "Offer",
      name: t.titleFa,
      price: Number(t.basePriceToman),
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <JsonLdGraph customSchemas={[productSchema]} />

      <main className="w-full py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              href="/programs"
              className="text-xs font-bold text-muted hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              <span>→</span>
              <span>بازگشت به همه برنامه‌های تغذیه</span>
            </Link>
          </div>

          {/* Direct Answer Capsule (AEO) */}
          <DirectAnswerCapsule
            question={`برنامه ${program.titleFa} در مشهد برای چه افرادی مناسب است؟`}
            answer={`${program.subtitleFa}. این پکیج با نظارت کارشناس ارشد تغذیه در مشهد و با رعایت کسری/مازاد حساب‌شده متابولیک، روزانه به درب منزل یا محل کار در بسته‌بندی بهداشتی مجهز به شناسنامه تغذیه‌ای ارسال می‌شود.`}
          />

          {/* Hero Section */}
          <div className="text-start mb-12">
            <Badge variant="primary" size="md" className="mb-4">
              برنامه تخصصی حس خوب
            </Badge>

            <h1 className="text-3xl md:text-5xl font-extrabold text-strong mb-4">
              {program.titleFa}
            </h1>

            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl mb-8">
              {program.subtitleFa}
            </p>
          </div>

          {/* Program Phases */}
          {program.phases && program.phases.length > 0 && (
            <div className="mb-16">
              <h2 className="text-xl md:text-2xl font-extrabold text-strong mb-6 text-start">
                فازهای پیشرفت این برنامه
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {program.phases.map((phase) => (
                  <Card key={phase.id} className="p-6 text-start">
                    <span className="text-xs font-bold text-primary mb-2 block">
                      فاز {phase.orderIndex} ({phase.durationWeeks} هفته)
                    </span>
                    <h3 className="text-lg font-bold text-strong mb-2">
                      {phase.titleFa}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      {phase.descriptionFa}
                    </p>
                    <div className="p-3 rounded-xl bg-canvas border border-border-default text-xs text-muted">
                      <span className="font-bold text-strong block mb-1">
                        تنظیم متابولیک:
                      </span>
                      {phase.calorieDeltaRule < 0
                        ? `${Math.abs(phase.calorieDeltaRule)} کیلوکالری کسری روزانه`
                        : `${phase.calorieDeltaRule} کیلوکالری مازاد پاک`}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Coverage Tiers Grid */}
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-extrabold text-strong mb-2 text-start">
              انتخاب سطح پوشش وعده‌ها
            </h2>
            <p className="text-sm text-muted mb-8 text-start">
              پکیج خود را بر اساس ساعات حضور در منزل یا محل کار انتخاب نمایید:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {program.coverageTiers.map((tier) => (
                <Card
                  key={tier.id}
                  interactive
                  className="flex flex-col justify-between p-8 border-border-default hover:border-primary/40 transition-all text-start"
                >
                  <div>
                    <span className="text-xs font-bold text-primary block mb-2">
                      {tier.daysCount} روز دوره
                    </span>

                    <h3 className="text-2xl font-extrabold text-strong mb-3">
                      {tier.titleFa}
                    </h3>

                    <div className="mb-6 space-y-2">
                      <span className="text-xs font-bold text-muted block">
                        وعده‌های شامل‌شده در بسته:
                      </span>
                      <ul className="text-xs text-strong space-y-1">
                        {tier.includedMealTypes.map((meal, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{meal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border-default flex flex-col gap-3">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-xs text-muted">هزینه دوره:</span>
                      <span className="text-2xl font-extrabold text-strong">
                        {formatToman(tier.basePriceToman)}
                      </span>
                    </div>

                    <Link
                      href={`/start?program=${program.slug}&tier=${tier.tierType}`}
                      className="w-full"
                    >
                      <Button variant="primary" size="md" className="w-full">
                        ثبت‌نام این سطح
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Rotational Menu Note */}
          <div className="p-8 rounded-3xl bg-calm border border-border-default flex flex-col md:flex-row items-center justify-between gap-6 text-start">
            <div>
              <h3 className="text-lg font-bold text-strong mb-2">
                منوی چرخشی ۱۴ روزه بدون تکرار ملال‌آور
              </h3>
              <p className="text-xs md:text-sm text-muted max-w-2xl leading-relaxed">
                هر روز دو وعده انتخابی با طعم‌های لذیذ ایرانی و بین‌المللی طبخ می‌شود. کاربر در پنل خود می‌تواند تا ۴۸ ساعت قبل منو را شخصی‌سازی کند.
              </p>
            </div>

            <Link href="/tools/calorie-calculator">
              <Button variant="secondary" size="md" className="shrink-0">
                محاسبه‌گر کالری هدف
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
