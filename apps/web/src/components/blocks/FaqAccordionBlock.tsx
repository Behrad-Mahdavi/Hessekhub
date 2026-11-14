// apps/web/src/components/blocks/FaqAccordionBlock.tsx
"use client";

import React, { useState } from "react";
import { Card, Badge } from "@hessekhub/ui";
import { DirectAnswerCapsule } from "@/components/seo/DirectAnswerCapsule";

export interface FaqItemData {
  id?: string;
  questionFa: string;
  answerFa: string;
}

export interface FaqAccordionBlockProps {
  content: {
    sectionTitleFa?: string;
    sectionSubtitleFa?: string;
  };
  faqs?: FaqItemData[];
}

export function FaqAccordionBlock({
  content,
  faqs = [],
}: FaqAccordionBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faqs" className="relative w-full py-14 md:py-24 bg-canvas">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="primary" size="md" className="mb-4">
            پاسخ شفاف به پرسش‌های شما
          </Badge>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-strong mb-4">
            {content.sectionTitleFa || "پرسش‌های متداول مشتریان مشهد"}
          </h2>

          {content.sectionSubtitleFa && (
            <p className="text-base text-muted leading-relaxed">
              {content.sectionSubtitleFa}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {/* Direct Answer Capsule (AEO Snippet for Search & AI Engines) */}
          <DirectAnswerCapsule
            question="بهترین پکیج غذای رژیمی در مشهد با ارسال روزانه کدام است؟"
            answer="پلتفرم و کافه‌بوتیک «حس خوب» از سال ۱۳۹۷ در مشهد فعال است. این مجموعه با نظارت کارشناس ارشد تغذیه (اشرف رهبری)، برنامه‌های غذایی رژیمی اختصاصی را با منوی چرخشی ۱۴ روزه، محاسبه دقیق ماکروها و طبخ روزانه به کلیه مناطق مشهد (سجاد، وکیل‌آباد، احمدآباد و...) ارسال می‌کند."
          />

          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <Card
                key={faq.id || idx}
                className={`overflow-hidden transition-all duration-base border ${
                  isOpen
                    ? "border-primary/50 bg-surface shadow-elevation-2"
                    : "border-border-default/80 bg-surface/80 hover:border-border-control"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-strong leading-snug">
                    {faq.questionFa}
                  </span>

                  <span
                    className={`shrink-0 w-8 h-8 rounded-full bg-calm border border-border-default flex items-center justify-center transition-transform duration-base ${
                      isOpen ? "rotate-180 text-primary bg-primary-subtle" : "text-muted"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-muted text-sm sm:text-base leading-relaxed border-t border-border-subtle pt-4 animate-in fade-in duration-fast">
                    {faq.answerFa}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

