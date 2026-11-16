// apps/web/src/components/blocks/BmrTeaserBlock.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Card, Button, Badge, toPersianDigits } from "@hessekhub/ui";

export interface BmrTeaserBlockProps {
  content?: {
    headlineFa?: string;
    subheadlineFa?: string;
    ctaTitleFa?: string;
    ctaUrl?: string;
  };
}

export function BmrTeaserBlock({ content }: BmrTeaserBlockProps) {
  // Interactive Live State
  const [gender, setGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [weight, setWeight] = useState<number>(68);
  const [height, setHeight] = useState<number>(168);
  const [age, setAge] = useState<number>(32);

  // Live Mifflin-St Jeor Calculation
  const liveBmr = useMemo(() => {
    if (gender === "MALE") {
      return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
      return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
  }, [gender, weight, height, age]);

  // Suggested Discrete Calorie Tier (1200, 1500, 1800, 2200, 2500)
  const suggestedTier = useMemo(() => {
    const tdeeModerate = Math.round(liveBmr * 1.375);
    const targetDeficit = tdeeModerate - 400;
    if (targetDeficit <= 1350) return 1200;
    if (targetDeficit <= 1650) return 1500;
    if (targetDeficit <= 2000) return 1800;
    if (targetDeficit <= 2350) return 2200;
    return 2500;
  }, [liveBmr]);

  // Circular progress percentage (BMR mapped from 1000 to 2400 kcal)
  const bmrProgressPercent = Math.min(
    100,
    Math.max(10, Math.round(((liveBmr - 1000) / 1400) * 100))
  );

  return (
    <section className="relative w-full py-16 md:py-28 bg-surface/50 overflow-hidden border-t border-border-subtle">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        <Card className="p-8 md:p-14 border border-border-default bg-surface relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(16,15,13,0.06)] rounded-[32px]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left Narrative (Apple Hardware/Science Feature Style) */}
            <div className="flex-1 text-start max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary" size="md">
                  موتور هوشمند محاسبات بالینی
                </Badge>
                <span className="text-xs text-muted font-medium hidden sm:inline">
                  استاندارد بین‌المللی Mifflin-St Jeor
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-strong mb-4 leading-tight">
                {content?.headlineFa || "کالری پایه و پکیج هدف خود را زنده آزمایش کنید"}
              </h2>

              <p className="text-base text-muted mb-8 leading-relaxed">
                {content?.subheadlineFa ||
                  "تنها با تنظیم سن، قد و وزن خود، متابولیسم پایه (BMR) و سطح کالری مناسب برای لاغری پایدار را بدون حدس و گمان مشاهده کنید."}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/tools/calorie-calculator?weight=${weight}&height=${height}&age=${age}&gender=${gender}`}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="shadow-elevation-1 hover:shadow-elevation-2 font-bold text-base px-8 py-3.5 rounded-pill"
                  >
                    ورود به آنالیز کامل بیومتریک ←
                  </Button>
                </Link>

                <Link href={`/start?program=weight-loss&tier=FULL_BOARD`}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="border-border-default px-6 py-3.5 rounded-pill hover:bg-surface-hover"
                  >
                    ثبت‌نام مستقیم دوره
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Interactive Live Dial Capsule (Apple Watch / Health Dial Style) */}
            <div className="w-full lg:w-[460px] shrink-0">
              <div className="p-6 md:p-8 rounded-[28px] bg-canvas border border-border-default shadow-xs relative overflow-hidden text-start">
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
                  <span className="text-xs font-bold text-strong flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    شبیه‌ساز آنی کالری حس خوب
                  </span>
                  <span className="text-[11px] font-bold text-primary font-sans">LIVE ENGINE</span>
                </div>

                {/* Gender Toggle (Apple Segmented Style) */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-strong mb-2">جنسیت شما:</label>
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-pill bg-surface border border-border-subtle select-none">
                    <button
                      type="button"
                      onClick={() => setGender("FEMALE")}
                      className={`py-1.5 px-4 rounded-pill text-xs font-bold transition-all ${
                        gender === "FEMALE"
                          ? "bg-primary text-white shadow-xs"
                          : "text-muted hover:text-strong"
                      }`}
                    >
                      خانم
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("MALE")}
                      className={`py-1.5 px-4 rounded-pill text-xs font-bold transition-all ${
                        gender === "MALE"
                          ? "bg-primary text-white shadow-xs"
                          : "text-muted hover:text-strong"
                      }`}
                    >
                      آقا
                    </button>
                  </div>
                </div>

                {/* Sliders with Persian Numbers */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted font-medium">وزن کنونی شما:</span>
                      <span className="font-black text-strong font-sans text-sm">
                        {toPersianDigits(weight)} کیلوگرم
                      </span>
                    </div>
                    <input
                      type="range"
                      min="45"
                      max="140"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-surface rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted font-medium">قد شما:</span>
                      <span className="font-black text-strong font-sans text-sm">
                        {toPersianDigits(height)} سانتی‌متر
                      </span>
                    </div>
                    <input
                      type="range"
                      min="145"
                      max="205"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-surface rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted font-medium">سن شما:</span>
                      <span className="font-black text-strong font-sans text-sm">
                        {toPersianDigits(age)} سال
                      </span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="75"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-surface rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Apple Health Dial Display */}
                <div className="p-4 rounded-2xl bg-surface border border-border-subtle flex items-center justify-between gap-4">
                  {/* Gauge Ring */}
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-border-subtle"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary transition-all duration-base"
                        strokeDasharray={`${bmrProgressPercent}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-black text-primary font-sans">
                      {toPersianDigits(bmrProgressPercent)}٪
                    </span>
                  </div>

                  {/* Metabolic Numbers */}
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-muted block mb-0.5">متابولیسم پایه (BMR):</span>
                      <span className="text-lg font-black text-strong font-sans block">
                        {toPersianDigits(liveBmr)}
                      </span>
                      <span className="text-[10px] text-muted">کیلوکالری / روز</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-primary font-bold block mb-0.5">پکیج پیشنهادی:</span>
                      <span className="text-lg font-black text-primary font-sans block">
                        {toPersianDigits(suggestedTier)}
                      </span>
                      <span className="text-[10px] text-muted">سطح کالری کاهش وزن</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Card>
      </div>
    </section>
  );
}
