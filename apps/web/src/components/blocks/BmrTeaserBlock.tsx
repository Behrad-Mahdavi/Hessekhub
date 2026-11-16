"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button, Badge, toPersianDigits } from "@hessekhub/ui";

export interface BmrTeaserBlockProps {
  content?: {
    headlineFa?: string;
    subheadlineFa?: string;
    ctaTitleFa?: string;
    ctaUrl?: string;
  };
}

export function BmrTeaserBlock({ content }: BmrTeaserBlockProps) {
  const [gender, setGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [weight, setWeight] = useState<number>(68);
  const [height, setHeight] = useState<number>(168);
  const [age, setAge] = useState<number>(32);

  // Mifflin-St Jeor Equation
  const liveBmr = useMemo(() => {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return Math.round(gender === "MALE" ? base + 5 : base - 161);
  }, [gender, weight, height, age]);

  // Discrete Kitchen Tier Mapping (1200, 1500, 1800, 2200, 2500)
  const suggestedTier = useMemo(() => {
    const tdee = Math.round(liveBmr * 1.375);
    const target = tdee - 400;
    const minClamp = gender === "MALE" ? 1500 : 1200;
    const clamped = Math.max(minClamp, target);

    if (clamped <= 1350) return 1200;
    if (clamped <= 1650) return 1500;
    if (clamped <= 2000) return 1800;
    if (clamped <= 2350) return 2200;
    return 2500;
  }, [liveBmr, gender]);

  const ringPercent = Math.min(100, Math.max(15, Math.round(((liveBmr - 1000) / 1400) * 100)));

  return (
    <section className="w-full py-16 md:py-24 bg-canvas">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="rounded-xl bg-surface border border-border-default shadow-2 p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Narrative Side (7 Cols) */}
          <div className="lg:col-span-7 text-start">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <Badge variant="primary">موتور محاسبات بالینی</Badge>
              <span className="text-xs text-text-subtle font-medium">
                فرمول استاندارد Mifflin-St Jeor
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-text-strong leading-tight mb-4">
              {content?.headlineFa || "کالری واقعی بدن خود را در چند ثانیه بشناسید."}
            </h2>

            <p className="text-base text-text-muted leading-relaxed max-w-[54ch] mb-8">
              {content?.subheadlineFa ||
                "بدون رژیم‌های سخت و غیراصولی؛ متابولیسم پایه (BMR) خود را محاسبه کنید و ببینید کدام تیپ غذایی حس خوب دقیقاً برای هدف شما طراحی شده است."}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={
                  content?.ctaUrl ||
                  `/tools/calorie-calculator?weight=${weight}&height=${height}&age=${age}&gender=${gender}`
                }
              >
                <Button variant="primary" size="md" className="w-full sm:w-auto px-7">
                  {content?.ctaTitleFa || "آنالیز کامل متابولیسم و ماکروها"} ←
                </Button>
              </Link>

              <Link href="/start">
                <Button variant="secondary" size="md" className="w-full sm:w-auto px-6">
                  ثبت‌نام مستقیم برنامه
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Apple Health Dial Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-xl bg-canvas border border-border-default text-start">
              {/* Segmented Gender Switch */}
              <div className="mb-6">
                <span className="text-xs font-bold text-text-strong block mb-2">جنسیت:</span>
                <div
                  role="radiogroup"
                  aria-label="انتخاب جنسیت"
                  className="grid grid-cols-2 gap-1 p-1 rounded-pill bg-sunken"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={gender === "FEMALE"}
                    onClick={() => setGender("FEMALE")}
                    className={`py-2 px-4 rounded-pill text-xs font-bold transition-all duration-fast ${
                      gender === "FEMALE"
                        ? "bg-surface text-text-strong shadow-1"
                        : "text-text-muted hover:text-text-strong"
                    }`}
                  >
                    خانم
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={gender === "MALE"}
                    onClick={() => setGender("MALE")}
                    className={`py-2 px-4 rounded-pill text-xs font-bold transition-all duration-fast ${
                      gender === "MALE"
                        ? "bg-surface text-text-strong shadow-1"
                        : "text-text-muted hover:text-text-strong"
                    }`}
                  >
                    آقا
                  </button>
                </div>
              </div>

              {/* Clean Sliders */}
              <div className="space-y-5 mb-6">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <label htmlFor="teaser-weight" className="text-text-muted font-medium">
                      وزن فعلی
                    </label>
                    <span className="text-sm font-black text-text-strong tabular-nums">
                      {toPersianDigits(weight)} کیلوگرم
                    </span>
                  </div>
                  <input
                    id="teaser-weight"
                    type="range"
                    min="45"
                    max="140"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2 bg-sunken rounded-pill accent-primary cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <label htmlFor="teaser-height" className="text-text-muted font-medium">
                      قد
                    </label>
                    <span className="text-sm font-black text-text-strong tabular-nums">
                      {toPersianDigits(height)} سانتی‌متر
                    </span>
                  </div>
                  <input
                    id="teaser-height"
                    type="range"
                    min="145"
                    max="205"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-sunken rounded-pill accent-primary cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <label htmlFor="teaser-age" className="text-text-muted font-medium">
                      سن
                    </label>
                    <span className="text-sm font-black text-text-strong tabular-nums">
                      {toPersianDigits(age)} سال
                    </span>
                  </div>
                  <input
                    id="teaser-age"
                    type="range"
                    min="18"
                    max="75"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-sunken rounded-pill accent-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Health Ring Output */}
              <div
                aria-live="polite"
                className="p-4 rounded-lg bg-surface border border-border-subtle flex items-center gap-4"
              >
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                    <path
                      className="text-sunken"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-primary transition-all duration-base ease-flow"
                      strokeDasharray={`${ringPercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-primary-text tabular-nums">
                    {toPersianDigits(ringPercent)}٪
                  </span>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-text-subtle block">متابولیسم پایه</span>
                    <span className="text-lg font-black text-text-strong tabular-nums">
                      {toPersianDigits(liveBmr)}
                    </span>
                    <span className="text-[11px] text-text-muted block">کیلوکالری</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-primary-text font-bold block">
                      تیپ پیشنهادی
                    </span>
                    <span className="text-lg font-black text-primary-text tabular-nums">
                      {toPersianDigits(suggestedTier)}
                    </span>
                    <span className="text-[11px] text-text-muted block">کاهش وزن اصولی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}