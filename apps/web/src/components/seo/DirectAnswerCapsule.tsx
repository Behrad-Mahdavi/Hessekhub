// apps/web/src/components/seo/DirectAnswerCapsule.tsx
import React from "react";

export interface DirectAnswerCapsuleProps {
  question: string;
  answer: string;
}

export function DirectAnswerCapsule({ question, answer }: DirectAnswerCapsuleProps) {
  if (!answer) return null;

  return (
    <aside
      aria-label="خلاصه پاسخ مستقیم"
      className="bg-calm/80 border border-border-default/80 rounded-2xl p-5 md:p-6 mb-8 text-start shadow-elevation-1 transition-all"
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
          <h2 className="text-strong font-bold text-base md:text-lg">{question}</h2>
        </div>
        <span className="text-[11px] font-medium text-primary hidden sm:inline px-2.5 py-0.5 bg-surface rounded-pill border border-border-subtle">
          پاسخ مستقیم تایید شده
        </span>
      </div>
      <p className="text-body text-sm md:text-base leading-relaxed max-w-[65ch]">
        {answer}
      </p>
    </aside>
  );
}

