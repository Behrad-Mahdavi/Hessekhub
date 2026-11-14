// apps/web/src/app/(public)/mashhad/[intentSlug]/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  getProgrammaticLanding,
  getDeliveryZones,
  getDeliverySlots,
} from "@/lib/api";
import { Button, Badge } from "@hessekhub/ui";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ intentSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { intentSlug } = await params;
  const landing = await getProgrammaticLanding(intentSlug);

  const title =
    landing?.heroHeadlineFa ||
    `سفارش و ارسال غذای رژیمی در مشهد | کترینگ سلامت حس خوب`;
  const description =
    landing?.seoMeta?.metaDescriptionFa ||
    `ارسال روزانه پکیج‌های غذای رژیمی و سالم در کلیه مناطق مشهد (سجاد، وکیل‌آباد، احمدآباد، ملک‌آباد و...). طبخ روزانه با نظارت کارشناس تغذیه.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://hessekhub.ir/mashhad/${intentSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://hessekhub.ir/mashhad/${intentSlug}`,
    },
  };
}

export default async function MashhadIntentPage({ params }: PageProps) {
  const { intentSlug } = await params;
  const [landing, zones, slots] = await Promise.all([
    getProgrammaticLanding(intentSlug),
    getDeliveryZones(),
    getDeliverySlots(),
  ]);

  const headline =
    landing?.heroHeadlineFa ||
    "ارسال روزانه غذای رژیمی و سالم در مشهد با نظارت کارشناس تغذیه";
  const subheadline =
    landing?.heroSubheadlineFa ||
    "مجموعه حس خوب (فعال از ۱۳۹۷) ارائه‌دهنده پکیج‌های تخصصی رژیم غذایی با منوی چرخشی ۱۴ روزه و ارسال به کلیه مناطق مشهد است.";
  const answerCapsule =
    landing?.seoMeta?.directAnswerCapsuleFa ||
    "پکیج‌های غذای رژیمی حس خوب با نظارت کارشناس ارشد تغذیه در مشهد آماده‌سازی شده و همه‌روزه در دو نوبت صبح (۶:۳۰ تا ۸:۳۰) و ظهر (۱۱:۰۰ تا ۱۲:۳۰) به مناطق سجاد، احمدآباد، وکیل‌آباد، ملک‌آباد و سایر نقاط مشهد در ظروف بهداشتی قابل ماکروویو ارسال می‌گردد.";

  return (
    <>
      <JsonLdGraph />

      <main className="w-full py-12 md:py-20 bg-canvas">
        <div className="max-w-container mx-auto px-4 md:px-8">
          
          {/* Direct Answer Capsule (AEO Snippet for Local Mashhad Queries) */}
          <DirectAnswerCapsule
            question="نحوه سفارش و ارسال روزانه غذای رژیمی در مناطق مختلف مشهد چگونه است؟"
            answer={answerCapsule}
          />

          {/* Monumental Hero */}
          <section className="text-center max-w-4xl mx-auto mb-16">
            <Badge variant="primary" size="md" className="mb-4">
              پوشش کامل مناطق شهری مشهد مقدس
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-strong mb-6 leading-tight tracking-normal">
              {headline}
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/start">
                <Button variant="primary" size="lg" className="rounded-pill px-8 text-sm font-bold shadow-xs">
                  محاسبه کالری و شروع اشتراک
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="secondary" size="lg" className="rounded-pill px-8 text-sm font-bold text-primary border-primary/30">
                  مشاهده لاین‌آپ پکیج‌ها ←
                </Button>
              </Link>
            </div>
          </section>

          {/* Mashhad Delivery Zones Grid (Apple Grid Style) */}
          <section className="mb-16">
            <div className="text-start mb-6">
              <span className="text-xs font-bold text-accent uppercase block mb-1">
                شبکه توزیع اختصاصی
              </span>
              <h2 className="text-2xl font-black text-strong tracking-normal">
                محله‌های تحت پوشش ارسال روزانه در مشهد
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-5 rounded-2xl bg-surface border border-border-subtle text-center shadow-xs hover:border-primary/40 transition-colors"
                >
                  <span className="text-sm font-bold text-strong block mb-1">
                    {zone.nameFa}
                  </span>
                  <span className="text-[11px] text-muted">
                    ارسال اختصاصی بامداد
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery Slots */}
          <section className="mb-16">
            <div className="text-start mb-6">
              <span className="text-xs font-bold text-accent uppercase block mb-1">
                زمان‌بندی منظم
              </span>
              <h2 className="text-2xl font-black text-strong tracking-normal">
                پنجره‌های زمانی تحویل در مشهد
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {slots.map((slot) => (
                <div key={slot.id} className="p-8 rounded-3xl bg-surface border border-border-subtle text-start shadow-xs">
                  <div className="text-xs font-bold text-primary mb-2">
                    {slot.titleFa}
                  </div>
                  <div className="text-2xl font-black text-strong mb-2">
                    {slot.startTime} الی {slot.endTime}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {slot.isWorkdaySlot
                      ? "ویژه ناهار گرم در دفاتر اداری، مطب‌ها و کلینیک‌های مشهد"
                      : "بازه صبحگاهی استاندارد تحویل درب منزل در بسته‌بندی بهداشتی"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Guarantee CTA Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border-subtle text-start max-w-3xl mx-auto shadow-xs">
            <h3 className="text-2xl font-black text-strong mb-3">
              پکیج تازه از فردا درب منزل یا محل کار شما
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
              تنها کافی است کالری هدف خود را انتخاب کنید تا برنامه غذایی‌تان در سیستم آشپزخانه حس خوب ثبت شده و از بامداد فردا ارسال آغاز شود.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/tools/calorie-calculator">
                <Button variant="primary" size="md" className="rounded-pill px-6 text-xs font-bold">
                  محاسبه آنلاین بیومتریک و BMR
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="secondary" size="md" className="rounded-pill px-6 text-xs font-bold text-primary border-primary/30">
                  مقایسه پکیج‌ها و تعرفه‌ها
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
