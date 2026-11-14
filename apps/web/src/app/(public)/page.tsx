// apps/web/src/app/(public)/page.tsx
import React from "react";
import { Metadata } from "next";
import { getCmsPage, getPrograms } from "@/lib/api";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { DynamicBlockRenderer } from "@/components/blocks/DynamicBlockRenderer";

export const revalidate = 3600; // 1-hour ISR revalidation

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("/");
  const seo = page?.seoMeta;

  return {
    title:
      seo?.metaTitleFa ||
      "حس خوب | پلتفرم سبک زندگی سالم و پکیج‌های غذای رژیمی مشهد",
    description:
      seo?.metaDescriptionFa ||
      "اولین پلتفرم تخصصی غذای رژیمی و سبک زندگی سالم در مشهد با نظارت کارشناس تغذیه و ارسال روزانه درب منزل و محل کار.",
    alternates: {
      canonical: "https://hessekhub.ir/",
    },
    openGraph: {
      title: seo?.metaTitleFa || "حس خوب — مشهد",
      description: seo?.metaDescriptionFa,
      url: "https://hessekhub.ir/",
      siteName: "حس خوب",
      locale: "fa_IR",
      type: "website",
    },
  };
}

export default async function HomePage() {
  const [page, programs] = await Promise.all([
    getCmsPage("/"),
    getPrograms(),
  ]);

  const faqs = page?.faqs || [];
  const sections = (page?.sections || []) as any[];

  // Prepare FAQPage Schema for connected JSON-LD Knowledge Graph
  const faqSchema =
    faqs.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.questionFa,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answerFa,
            },
          })),
        }
      : undefined;

  return (
    <>
      <JsonLdGraph customSchemas={faqSchema ? [faqSchema] : undefined} />

      <main className="w-full min-h-screen">
        {/* 100% Dynamic Content Blocks rendered from CMS */}
        <DynamicBlockRenderer
          sections={sections}
          programs={programs as any}
          faqs={faqs}
        />
      </main>
    </>
  );
}
