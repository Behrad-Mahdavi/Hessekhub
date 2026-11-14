// apps/web/src/app/(public)/programs/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/api";
import { Card, Button, Badge, formatToman } from "@hessekhub/ui";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "برنامه‌های غذای رژیمی در مشهد | پکیج‌های کاهش وزن و روز کاری",
  description:
    "مشاهده و مقایسه پکیج‌های غذایی حس خوب مشهد: کاهش وزن، روز کاری اداری و تثبیت. طبخ روزانه و ارسال به سراسر مشهد با نظارت کارشناس تغذیه.",
  alternates: {
    canonical: "https://hessekhub.ir/programs",
  },
};

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

  return (
    <>
      <JsonLdGraph customSchemas={productSchemas} />

      <main className="w-full py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* AEO Capsule */}
          <DirectAnswerCapsule
            question="پکیج‌های غذای رژیمی حس خوب مشهد چه تفاوت‌هایی دارند و چگونه انتخاب می‌شوند؟"
            answer="پکیج‌های حس خوب بر اساس اهداف بالینی (کاهش وزن با کسری حساب‌شده، روز کاری ویژه شاغلین و مدیران، و تثبیت وزن) در سه سطح پوشش (فول‌برد ۶ روزه، روز کاری اداری، و تست ۳ روزه) ارائه می‌شوند. تمامی وعده‌ها با محاسبه گرمی ماکروها، طبخ روزانه و منوی چرخشی ۱۴ روزه به تمام نقاط مشهد ارسال می‌گردند."
          />

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="primary" size="md" className="mb-4">
              برنامه‌های علمی و نتیجه‌محور
            </Badge>

            <h1 className="text-3xl md:text-5xl font-extrabold text-strong mb-6 leading-tight">
              پکیج‌های غذای رژیمی حس خوب مشهد
            </h1>

            <p className="text-base md:text-lg text-muted leading-relaxed">
              هر برنامه متناسب با آنالیز بیومتریک و سبک زندگی شما طراحی می‌شود. برای هر روز، ۲ گزینه انتخابی از منوی چرخشی ۱۴ روزه در اختیار دارید.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {programs.map((prog) => {
              const fullBoardTier =
                prog.coverageTiers.find((t) => t.tierType === "FULL_BOARD") ||
                prog.coverageTiers[0];

              return (
                <Card
                  key={prog.id}
                  interactive
                  className="flex flex-col justify-between p-8 border-border-default hover:border-primary/40 transition-all text-start"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-primary uppercase">
                        برنامه نتیجه‌محور
                      </span>
                      {prog.slug === "weight-loss" && (
                        <Badge variant="primary" size="sm">
                          محبوب‌ترین
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-2xl font-extrabold text-strong mb-3">
                      {prog.titleFa}
                    </h2>

                    <p className="text-sm text-muted mb-6 leading-relaxed">
                      {prog.subtitleFa}
                    </p>

                    {/* Coverage tiers breakdown */}
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-bold text-muted uppercase">
                        سطوح پوشش وعده‌ها:
                      </div>
                      {prog.coverageTiers.map((tier) => (
                        <div
                          key={tier.id}
                          className="p-3 rounded-xl bg-canvas border border-border-default flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-strong block">
                              {tier.titleFa}
                            </span>
                            <span className="text-muted text-[11px]">
                              {tier.includedMealTypes.join(" + ")}
                            </span>
                          </div>
                          <span className="font-extrabold text-primary">
                            {formatToman(tier.basePriceToman)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border-default flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted">قیمت پلن فول‌برد:</span>
                      <span className="text-xl font-extrabold text-strong">
                        {fullBoardTier ? formatToman(fullBoardTier.basePriceToman) : "-"}
                      </span>
                    </div>

                    <Link
                      href={`/start?program=${prog.slug}&tier=${fullBoardTier?.tierType || "FULL_BOARD"}`}
                      className="w-full"
                    >
                      <Button variant="primary" size="md" className="w-full">
                        شروع برنامه با آنالیز اختصاصی
                      </Button>
                    </Link>

                    <Link href={`/programs/${prog.slug}`} className="w-full">
                      <Button variant="ghost" size="sm" className="w-full text-muted">
                        مشاهده جزئیات، فازها و منوی نمونه
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Guarantee Section */}
          <div className="p-8 md:p-10 rounded-3xl bg-calm border border-border-default text-start">
            <h3 className="text-xl font-extrabold text-strong mb-3">
              ضمانت پایش مستمر و تغییر آنی غذا
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-3xl mb-6">
              در طول دوره، هر جمعه از طریق سیستم چک‌این هوشمند وضعیت وزن و دور شکم شما ثبت می‌شود و موتور تغذیه زیر نظر کارشناس در صورت لزوم کالری مرحله بعد را اصلاح می‌کند. همچنین در هر روز می‌توانید بین ۲ گزینه غذایی آزادانه جابجا شوید.
            </p>
            <Link href="/tools/calorie-calculator">
              <Button variant="secondary" size="md">
                محاسبه‌گر کالری و تست سازگاری
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
