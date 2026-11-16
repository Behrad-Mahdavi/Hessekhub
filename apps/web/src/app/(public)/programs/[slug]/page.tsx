// apps/web/src/app/(public)/programs/[slug]/page.tsx
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgramBySlug, getPrograms } from "@/lib/api";
import { Button, formatToman } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";
import { StickyLocalNav } from "@/components/navigation/StickyLocalNav";
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
    title: seo?.metaTitleFa || `${program.titleFa} | پکیج غذای رژیمی حس خوب مشهد`,
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

  const plateGlyph = BRAND_GLYPHS["plate"];

  const fullBoardTier =
    program.coverageTiers.find((t) => t.tierType === "FULL_BOARD") ||
    program.coverageTiers[0];

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

  const navLinks = [
    { href: "#overview", label: "نمای کلی" },
    { href: "#phases", label: "فازهای پیشرفت" },
    { href: "#tiers", label: "سطوح پوشش وعده" },
    { href: "#supervision", label: "نظارت بالینی" },
  ];

  return (
    <>
      <JsonLdGraph customSchemas={[productSchema]} />

      {/* Apple-Style Sticky Local Navigation */}
      <StickyLocalNav
        title={program.titleFa}
        priceNote={fullBoardTier ? `شروع از ${formatToman(fullBoardTier.basePriceToman)}` : undefined}
        links={navLinks}
        ctaLabel="شروع اشتراک این پکیج"
        ctaHref={`/start?program=${program.slug}&tier=${fullBoardTier?.tierType || "FULL_BOARD"}`}
      />

      <main className="w-full py-10 md:py-16 bg-canvas">
        <div className="max-w-container mx-auto px-4 md:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6 text-start">
            <Link
              href="/programs"
              className="text-xs font-bold text-muted hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              <span>→</span>
              <span>بازگشت به همه برنامه‌های تغذیه مشهد</span>
            </Link>
          </div>

          {/* Direct Answer Capsule (AEO) */}
          <DirectAnswerCapsule
            question={`برنامه ${program.titleFa} در مشهد برای چه افرادی مناسب است؟`}
            answer={`${program.subtitleFa}. این پکیج با نظارت کارشناس ارشد تغذیه در مشهد و با رعایت کسری/مازاد حساب‌شده متابولیک، روزانه به درب منزل یا محل کار در بسته‌بندی بهداشتی مجهز به شناسنامه تغذیه‌ای ارسال می‌شود.`}
          />

          {/* Monumental Product Hero (Apple Style) */}
          <section id="overview" className="text-center max-w-4xl mx-auto mb-16 pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill bg-surface border border-border-subtle text-xs text-primary font-bold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>تحت نظارت مستقیم متخصص تغذیه</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-strong mb-6 leading-tight tracking-normal">
              {program.titleFa}
            </h1>

            <p className="text-base sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-10">
              {program.subtitleFa}
            </p>

            {/* Studio Hero Presentation */}
            <div className="w-full max-w-3xl mx-auto aspect-[16/9] sm:aspect-[21/9] rounded-3xl bg-surface border border-border-subtle p-8 flex items-center justify-center relative shadow-xs overflow-hidden mb-10">
              {plateGlyph ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={plateGlyph.path}
                  alt={program.titleFa}
                  className="w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-calm text-primary font-bold text-lg flex items-center justify-center">
                  پکیج سلامت
                </div>
              )}
            </div>

            {/* Apple Big Stat Callouts (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl bg-surface border border-border-subtle text-center">
                <span className="text-3xl sm:text-4xl font-black text-strong block mb-1">
                  ۳ تا ۵
                </span>
                <span className="text-xs text-muted">کیلوگرم میانگین تغییر در هر دوره</span>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-border-subtle text-center">
                <span className="text-3xl sm:text-4xl font-black text-primary block mb-1">
                  ۱۰۰٪
                </span>
                <span className="text-xs text-muted">مواد اولیه ارگانیک و بدون نگهدارنده</span>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-border-subtle text-center">
                <span className="text-3xl sm:text-4xl font-black text-strong block mb-1">
                  ۱۴ روزه
                </span>
                <span className="text-xs text-muted">منوی چرخشی پویا بدون غذای تکراری</span>
              </div>
            </div>
          </section>

          {/* Program Phases Section */}
          {program.phases && program.phases.length > 0 && (
            <section id="phases" className="mb-20">
              <div className="text-start mb-8">
                <span className="text-xs font-bold text-accent uppercase block mb-1">
                  سیر بالینی دوره
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-strong tracking-normal">
                  فازهای مهندسی‌شده این برنامه
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {program.phases.map((phase) => (
                  <div
                    key={phase.id}
                    className="p-8 rounded-3xl bg-surface border border-border-subtle text-start flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <span className="text-xs font-bold text-primary mb-2 block">
                        فاز {phase.orderIndex} · {phase.durationWeeks} هفته
                      </span>
                      <h3 className="text-xl font-bold text-strong mb-3">
                        {phase.titleFa}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed mb-6">
                        {phase.descriptionFa}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-canvas border border-border-subtle text-xs text-muted">
                      <span className="font-bold text-strong block mb-1">تنظیم متابولیک:</span>
                      {phase.calorieDeltaRule < 0
                        ? `${Math.abs(phase.calorieDeltaRule)} کیلوکالری کسری روزانه حساب‌شده`
                        : `${phase.calorieDeltaRule} کیلوکالری مازاد پروتئینی پاک`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Coverage Tiers Grid (Apple Style Selectors) */}
          <section id="tiers" className="mb-20">
            <div className="text-start mb-8">
              <span className="text-xs font-bold text-accent uppercase block mb-1">
                سطوح پوشش بسته
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-strong tracking-normal">
                سطح پوشش وعده‌ها را متناسب با روزمرگی خود انتخاب کنید.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.coverageTiers.map((tier) => {
                const isFullBoard = tier.tierType === "FULL_BOARD";

                return (
                  <div
                    key={tier.id}
                    className={`rounded-3xl p-8 flex flex-col justify-between text-start transition-all shadow-xs ${
                      isFullBoard
                        ? "bg-surface border-2 border-primary shadow-sm"
                        : "bg-surface border border-border-subtle"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-primary">
                          {tier.daysCount} روزه
                        </span>
                        {isFullBoard && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-pill bg-primary text-white">
                            پیشنهاد سرآشپز
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-strong mb-2">
                        {tier.titleFa}
                      </h3>

                      <p className="text-xs text-muted leading-relaxed mb-6">
                        شامل: {tier.includedMealTypes.join(" + ")}
                      </p>

                      <div className="mb-6">
                        <span className="text-xs text-muted block mb-1">هزینه اشتراک ماهانه:</span>
                        <span className="text-2xl font-black text-strong">
                          {formatToman(tier.basePriceToman)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/start?program=${program.slug}&tier=${tier.tierType}`}
                      className="w-full"
                    >
                      <Button
                        variant={isFullBoard ? "primary" : "secondary"}
                        size="md"
                        isFullWidth
                        className="rounded-pill text-xs font-bold"
                      >
                        انتخاب و ثبت اطلاعات
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Clinical Supervision Seal */}
          <section id="supervision" className="rounded-3xl bg-surface border border-border-subtle p-8 sm:p-12 text-start max-w-3xl mx-auto shadow-xs">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-calm text-primary font-bold text-lg flex items-center justify-center shrink-0">
                🌿
              </div>
              <div>
                <h3 className="text-lg font-bold text-strong mb-1">
                  نظارت مستقیم متخصص تغذیه و رژیم‌درمانی
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-2">
                  تمامی سرفصل‌های کالری‌سنجی و برنامه‌ریزی منوی این پکیج بر مبنای آخرین راهنماهای بالینی انجمن تغذیه بالینی اروپا (ESPEN) و با کنترل گرمی درشت‌مغذی‌ها تنظیم شده است.
                </p>
                <span className="text-xs font-bold text-primary">
                  پایش مستمر مشترک با چک‌این آنلاین و پشتیبانی تغذیه در مشهد
                </span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
