// apps/web/src/app/(public)/mashhad/[intentSlug]/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  getProgrammaticLanding,
  getDeliveryZones,
  getDeliverySlots,
} from "@/lib/api";
import { Card, Button, Badge } from "@hessekhub/ui";
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
    "مجموعه حس خوب (فعال از ۱۳۹۷) تنها ارائه‌دهنده پکیج‌های تخصصی رژیم غذایی با منوی چرخشی ۱۴ روزه و ارسال به کلیه مناطق مشهد است.";
  const answerCapsule =
    landing?.seoMeta?.directAnswerCapsuleFa ||
    "پکیج‌های غذای رژیمی حس خوب با نظارت کارشناس ارشد تغذیه در مشهد آماده‌سازی شده و همه‌روزه در دو نوبت صبح (۷:۰۰ تا ۹:۳۰) و ظهر (۱۱:۳۰ تا ۱۳:۰۰) به مناطق سجاد، احمدآباد، وکیل‌آباد، ملک‌آباد و سایر نقاط مشهد در ظروف بهداشتی قابل ماکروویو ارسال می‌گردد.";

  return (
    <>
      <JsonLdGraph />

      <main className="w-full py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* Direct Answer Capsule (AEO Snippet for Local Mashhad Queries) */}
          <DirectAnswerCapsule
            question="نحوه سفارش و ارسال روزانه غذای رژیمی در مناطق مختلف مشهد چگونه است؟"
            answer={answerCapsule}
          />

          {/* Hero */}
          <div className="text-start max-w-3xl mb-12">
            <Badge variant="primary" size="md" className="mb-4">
              پوشش کامل شهر مشهد مقدس
            </Badge>

            <h1 className="text-3xl md:text-5xl font-extrabold text-strong mb-4 leading-tight">
              {headline}
            </h1>

            <p className="text-base md:text-lg text-muted leading-relaxed">
              {subheadline}
            </p>
          </div>

          {/* Mashhad Delivery Zones Grid */}
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-extrabold text-strong mb-2 text-start">
              مناطق تحت پوشش ارسال در مشهد
            </h2>
            <p className="text-sm text-muted mb-6 text-start">
              ارسال روزانه با پیک اختصاصی و حفظ زنجیره سلامت غذا:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {zones.map((zone) => (
                <Card
                  key={zone.id}
                  className="p-4 text-center bg-canvas border border-border-default"
                >
                  <span className="text-sm font-extrabold text-strong block mb-1">
                    {zone.nameFa}
                  </span>
                  <span className="text-[11px] text-muted">
                    ارسال منظم روزانه
                  </span>
                </Card>
              ))}
            </div>
          </div>

          {/* Delivery Slots */}
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-extrabold text-strong mb-2 text-start">
              بازه‌های زمانی تحویل در مشهد
            </h2>
            <p className="text-sm text-muted mb-6 text-start">
              هماهنگ با ساعت کاری دفاتر و آغاز صبحگاه شهروندان:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {slots.map((slot) => (
                <Card key={slot.id} className="p-6 text-start">
                  <div className="text-xs font-bold text-primary mb-2">
                    {slot.titleFa}
                  </div>
                  <div className="text-xl font-extrabold text-strong mb-2">
                    {slot.startTime} الی {slot.endTime}
                  </div>
                  <p className="text-xs text-muted">
                    {slot.isWorkdaySlot
                      ? "ویژه ناهار دفاتر اداری، مطب‌ها و شرکت‌ها"
                      : "بازه صبحگاهی استاندارد تحویل درب منزل"}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Start Programs CTA */}
          <div className="p-8 md:p-12 rounded-3xl bg-calm border border-border-default text-start">
            <h3 className="text-2xl font-extrabold text-strong mb-3">
              شروع دریافت روزانه پکیج غذای رژیمی در مشهد
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-2xl mb-8">
              کالری هدف خود را محاسبه کنید، برنامه مورد نظرتان را انتخاب کنید و از فردا بسته‌های تازه‌پز حس خوب را تحویل بگیرید.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/tools/calorie-calculator">
                <Button variant="primary" size="md">
                  محاسبه آنلاین کالری و بیومتریک
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="secondary" size="md">
                  مشاهده همه برنامه‌ها و قیمت‌ها
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
