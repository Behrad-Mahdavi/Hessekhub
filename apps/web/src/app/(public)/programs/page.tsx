// apps/web/src/app/(public)/programs/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/api";
import { Button, Badge, formatToman } from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";
import { ChapterNav } from "@/components/navigation/ChapterNav";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "پکیج‌های غذای رژیمی در مشهد | مقایسه و انتخاب برنامه‌ها",
  description:
    "مشاهده و مقایسه پکیج‌های غذایی حس خوب مشهد: کاهش وزن، روز کاری اداری و تثبیت. طبخ روزانه و ارسال به سراسر مشهد با نظارت کارشناس تغذیه.",
  alternates: {
    canonical: "https://hessekhub.ir/programs",
  },
};

const CHAPTER_ITEMS = [
  { href: "/programs", label: "همه پکیج‌ها", badge: "لاین‌آپ" },
  { href: "/programs/weight-loss", label: "کاهش وزن ۱۲ هفته‌ای" },
  { href: "/programs/executive-workday", label: "روز کاری مدیران" },
  { href: "/programs/maintenance", label: "تثبیت و سلامت" },
  { href: "/tools/calorie-calculator", label: "محاسبه‌گر کالری" },
];

export default async function ProgramsPage() {
  const programs = await getPrograms();

  const productSchemas = programs.map((p) => ({
    "@type": "Product",
    "@id": `https://hessekhub.ir/programs/${p.slug}#product`,
    name: p.titleFa,
    description: p.subtitleFa,
    url: `https://hessekhub.ir/programs/${p.slug}`,
    offers: p.coverageTiers.map((t) => ({
      "@type": "Offer",
      name: t.titleFa,
      price: Number(t.basePriceToman),
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    })),
  }));

  const plateGlyph = BRAND_GLYPHS["plate"];
  const avocadoGlyph = BRAND_GLYPHS["avocado"];

  return (
    <>
      <JsonLdGraph customSchemas={productSchemas} />

      {/* Apple ChapterNav Strip */}
      <ChapterNav items={CHAPTER_ITEMS} ariaLabel="پکیج‌های غذایی" />

      <main className="w-full py-12 md:py-20 bg-canvas">
        <div className="max-w-container mx-auto px-4 md:px-8">
          
          {/* AEO Direct Answer Capsule */}
          <DirectAnswerCapsule
            question="پکیج‌های غذای رژیمی حس خوب مشهد چه تفاوت‌هایی دارند و چگونه انتخاب می‌شوند؟"
            answer="پکیج‌های حس خوب بر اساس اهداف بالینی (کاهش وزن با کسری حساب‌شده، روز کاری ویژه شاغلین و مدیران، و تثبیت وزن) در سه سطح پوشش (فول‌برد ۶ روزه، روز کاری اداری، و تست ۳ روزه) ارائه می‌شوند. تمامی وعده‌ها با محاسبه گرمی ماکروها، طبخ روزانه و منوی چرخشی ۱۴ روزه به تمام نقاط مشهد ارسال می‌گردند."
          />

          {/* Apple-Style Lineup Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" size="md" className="mb-4">
              انتخاب لاین‌آپ غذایی حس خوب
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-strong mb-6 leading-tight tracking-normal">
              برنامه‌ای متناسب با متابولیسم و روزمرگی شما.
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed">
              هر برنامه بر اساس آنالیز بیومتریک و زیر نظر کارشناس ارشد تغذیه مهندسی شده است. روزانه دو گزینه انتخابی از منوی چرخشی ۱۴ روزه با ارسال اختصاصی در مشهد در اختیار شماست.
            </p>
          </div>

          {/* Apple Lineup Comparison Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {programs.map((prog, idx) => {
              const fullBoardTier =
                prog.coverageTiers.find((t) => t.tierType === "FULL_BOARD") ||
                prog.coverageTiers[0];

              const glyph = idx % 2 === 0 ? plateGlyph : avocadoGlyph;

              return (
                <div
                  key={prog.id}
                  className="rounded-3xl bg-surface border border-border-subtle hover:border-border-default transition-all duration-medium p-8 flex flex-col justify-between text-center group shadow-xs hover:shadow-md"
                >
                  {/* Top Product Information */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-accent uppercase">
                        نظارت مستقیم متخصص تغذیه
                      </span>
                      {prog.slug === "weight-loss" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-pill bg-primary/10 text-primary">
                          پرفروش‌ترین در مشهد
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-strong mb-2 leading-tight">
                      {prog.titleFa}
                    </h2>

                    <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed min-h-[40px]">
                      {prog.subtitleFa}
                    </p>

                    {/* Studio Visual */}
                    <div className="w-full h-44 rounded-2xl bg-canvas border border-border-subtle/80 flex items-center justify-center mb-6 overflow-hidden group-hover:scale-[1.02] transition-transform duration-medium">
                      {glyph ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={glyph.path}
                          alt={prog.titleFa}
                          className="w-28 h-28 object-contain drop-shadow-sm transition-transform duration-medium group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-calm text-primary font-bold flex items-center justify-center">
                          پکیج
                        </div>
                      )}
                    </div>

                    {/* Starting Price in Apple Style */}
                    <div className="mb-6">
                      <span className="text-xs text-muted block mb-1">شروع قیمت از:</span>
                      <span className="text-2xl font-black text-strong">
                        {fullBoardTier ? formatToman(fullBoardTier.basePriceToman) : "-"}
                      </span>
                      <span className="text-xs text-muted block mt-0.5">در ماه (با ارسال رایگان)</span>
                    </div>

                    {/* Dual Action Pills */}
                    <div className="flex flex-col gap-2.5 mb-8">
                      <Link
                        href={`/start?program=${prog.slug}&tier=${fullBoardTier?.tierType || "FULL_BOARD"}`}
                        className="w-full"
                      >
                        <Button
                          variant="primary"
                          size="md"
                          isFullWidth
                          className="rounded-pill text-sm font-bold shadow-xs hover:scale-[1.01] active:scale-[0.98]"
                        >
                          انتخاب و آغاز اشتراک
                        </Button>
                      </Link>

                      <Link href={`/programs/${prog.slug}`} className="w-full">
                        <Button
                          variant="ghost"
                          size="sm"
                          isFullWidth
                          className="text-xs font-bold text-primary hover:bg-primary/5 rounded-pill"
                        >
                          <span>بررسی مشخصات و منوی نمونه</span>
                          <span className="ms-1">←</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Specs Breakdown (Hairline Dividers) */}
                  <div className="pt-6 border-t border-border-subtle text-start space-y-3.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">سطوح پوشش:</span>
                      <span className="font-bold text-strong">
                        {prog.coverageTiers.length} سطح (۳ روزه، ۵ روزه، ۶ روزه)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">تنوع وعده‌ها:</span>
                      <span className="font-bold text-strong">منوی چرخشی ۱۴ روزه</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">ساعت تحویل مشهد:</span>
                      <span className="font-bold text-primary">۶:۳۰ تا ۸:۳۰ صبح</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">مشاوره تخصصی:</span>
                      <span className="font-bold text-strong">هفتگی با چک‌این آنلاین</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Apple-Style "Help Me Choose" Section */}
          <div className="rounded-3xl bg-surface border border-border-subtle p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
            <span className="text-xs font-bold text-primary uppercase mb-2 block">
              نمی‌دانید کدام برنامه برای شما ایده‌آل است؟
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-strong mb-4">
              پاسخ به چند پرسش ساده، برای دریافت دقیق‌ترین پکیج متابولیک.
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-xl mx-auto mb-8">
              الگوریتم هوشمند حس خوب با بررسی قد، وزن، سن، سطح تحرک و هدف وزنی شما، پکیج و کالری دقیق مورد نیازتان را مشخص می‌کند.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/tools/calorie-calculator">
                <Button variant="primary" size="lg" className="rounded-pill px-8 text-sm font-bold shadow-xs">
                  ورود به محاسبه‌گر هوشمند کالری
                </Button>
              </Link>
              <Link href="/start">
                <Button variant="secondary" size="lg" className="rounded-pill px-8 text-sm font-bold text-primary border-primary/30">
                  شروع مستقیم ثبت‌نام ←
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
