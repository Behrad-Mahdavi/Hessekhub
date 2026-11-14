// apps/web/src/app/(public)/tools/calorie-calculator/CalorieCalculatorClient.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button, toPersianDigits } from "@hessekhub/ui";

type Gender = "MALE" | "FEMALE";
type ActivityLevel =
  | "SEDENTARY"
  | "LIGHTLY_ACTIVE"
  | "MODERATELY_ACTIVE"
  | "VERY_ACTIVE"
  | "ATHLETE";
type FitnessGoal = "WEIGHT_LOSS" | "MAINTENANCE" | "MUSCLE_GAIN";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, { factor: number; labelFa: string }> = {
  SEDENTARY: { factor: 1.2, labelFa: "کم‌تحرک (کارمندی و بدون ورزش)" },
  LIGHTLY_ACTIVE: { factor: 1.375, labelFa: "فعالیت سبک (۱ تا ۳ روز ورزش در هفته)" },
  MODERATELY_ACTIVE: { factor: 1.55, labelFa: "متوسط (۳ تا ۵ روز ورزش)" },
  VERY_ACTIVE: { factor: 1.725, labelFa: "بسیار فعال (۶ تا ۷ روز ورزش سنگین)" },
  ATHLETE: { factor: 1.9, labelFa: "ورزشکار حرفه‌ای / کار فیزیکی سنگین" },
};

const GOAL_OPTIONS: Record<FitnessGoal, { labelFa: string; delta: number }> = {
  WEIGHT_LOSS: { labelFa: "کاهش وزن و چربی‌سوزی علمی", delta: -450 },
  MAINTENANCE: { labelFa: "تثبیت وزن، انرژی و سلامت عمومی", delta: 0 },
  MUSCLE_GAIN: { labelFa: "افزایش عضله و وزن پاک", delta: 300 },
};

export function CalorieCalculatorClient() {
  const [gender, setGender] = useState<Gender>("FEMALE");
  const [age, setAge] = useState<number>(30);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [heightCm, setHeightCm] = useState<number>(165);
  const [activity, setActivity] = useState<ActivityLevel>("MODERATELY_ACTIVE");
  const [goal, setGoal] = useState<FitnessGoal>("WEIGHT_LOSS");

  // Mifflin-St Jeor Calculation
  const calculation = useMemo(() => {
    const bmr =
      gender === "MALE"
        ? Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5)
        : Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);

    const mult = ACTIVITY_MULTIPLIERS[activity].factor;
    const tdee = Math.round(bmr * mult);

    const delta = GOAL_OPTIONS[goal].delta;
    const rawTarget = tdee + delta;

    // Safety clamps (Never drop below 1200 for women or 1500 for men)
    const minSafe = gender === "FEMALE" ? 1200 : 1500;
    const targetKcal = Math.max(minSafe, Math.min(rawTarget, 3200));

    // Kitchen Discrete Tier (1200, 1500, 1800, 2200, 2500)
    const tiers = [1200, 1500, 1800, 2200, 2500] as const;
    let discreteTier: number = 1200;
    let minDiff = Math.abs(targetKcal - discreteTier);
    for (const t of tiers) {
      const diff = Math.abs(targetKcal - t);
      if (diff < minDiff) {
        minDiff = diff;
        discreteTier = t;
      }
    }

    // Macro distributions
    let proteinGrams = 0;
    let fatGrams = 0;
    let carbsGrams = 0;

    if (goal === "WEIGHT_LOSS") {
      proteinGrams = Math.round(weightKg * 2.0);
      const proteinKcal = proteinGrams * 4;
      const fatKcal = targetKcal * 0.28;
      fatGrams = Math.round(fatKcal / 9);
      const remainingKcal = Math.max(0, targetKcal - (proteinKcal + fatKcal));
      carbsGrams = Math.round(remainingKcal / 4);
    } else if (goal === "MUSCLE_GAIN") {
      proteinGrams = Math.round(weightKg * 2.2);
      const proteinKcal = proteinGrams * 4;
      const fatKcal = targetKcal * 0.25;
      fatGrams = Math.round(fatKcal / 9);
      const remainingKcal = Math.max(0, targetKcal - (proteinKcal + fatKcal));
      carbsGrams = Math.round(remainingKcal / 4);
    } else {
      proteinGrams = Math.round(weightKg * 1.6);
      const proteinKcal = proteinGrams * 4;
      const fatKcal = targetKcal * 0.3;
      fatGrams = Math.round(fatKcal / 9);
      const remainingKcal = Math.max(0, targetKcal - (proteinKcal + fatKcal));
      carbsGrams = Math.round(remainingKcal / 4);
    }

    return {
      bmr,
      tdee,
      targetKcal,
      discreteTier,
      proteinGrams,
      carbsGrams,
      fatGrams,
    };
  }, [gender, age, weightKg, heightCm, activity, goal]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Inputs (Apple Settings Card Style) */}
        <div className="lg:col-span-7 rounded-3xl bg-surface border border-border-subtle p-8 text-start shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-accent uppercase block mb-1">
              تنظیمات بیومتریک
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-strong">
              اطلاعات بدنی خود را وارد کنید
            </h2>
          </div>

          {/* Gender Selector */}
          <div className="mb-6">
            <label className="text-xs font-bold text-muted block mb-2">جنسیت زیستی</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("FEMALE")}
                className={`h-12 rounded-pill text-xs font-bold transition-all ${
                  gender === "FEMALE"
                    ? "bg-primary text-white shadow-xs"
                    : "bg-canvas text-strong border border-border-subtle hover:border-border-default"
                }`}
              >
                بانوان
              </button>
              <button
                type="button"
                onClick={() => setGender("MALE")}
                className={`h-12 rounded-pill text-xs font-bold transition-all ${
                  gender === "MALE"
                    ? "bg-primary text-white shadow-xs"
                    : "bg-canvas text-strong border border-border-subtle hover:border-border-default"
                }`}
              >
                آقایان
              </button>
            </div>
          </div>

          {/* Sliders: Age, Weight, Height */}
          <div className="space-y-6 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-muted">سن شما:</span>
                <span className="text-sm font-black text-strong">{toPersianDigits(age)} سال</span>
              </div>
              <input
                type="range"
                min="15"
                max="85"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-canvas rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-muted">وزن فعلی:</span>
                <span className="text-sm font-black text-strong">{toPersianDigits(weightKg)} کیلوگرم</span>
              </div>
              <input
                type="range"
                min="35"
                max="180"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-canvas rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-muted">قد:</span>
                <span className="text-sm font-black text-strong">{toPersianDigits(heightCm)} سانتی‌متر</span>
              </div>
              <input
                type="range"
                min="120"
                max="225"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-canvas rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Activity Level Selector */}
          <div className="mb-6">
            <label className="text-xs font-bold text-muted block mb-2">سطح فعالیت روزانه</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityLevel)}
              className="w-full p-3.5 rounded-2xl bg-canvas border border-border-subtle text-xs sm:text-sm text-strong focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {Object.entries(ACTIVITY_MULTIPLIERS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.labelFa}
                </option>
              ))}
            </select>
          </div>

          {/* Fitness Goal Selector */}
          <div>
            <label className="text-xs font-bold text-muted block mb-2">هدف تناسب اندام شما</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(GOAL_OPTIONS).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setGoal(key as FitnessGoal)}
                  className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                    goal === key
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-canvas text-strong border-border-subtle hover:border-border-default"
                  }`}
                >
                  {item.labelFa}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output: Apple Health Metrics Card */}
        <div className="lg:col-span-5 rounded-3xl bg-surface border border-border-subtle p-8 text-start shadow-xs sticky top-28">
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle mb-6">
            <div>
              <span className="text-xs text-muted block">تیپ استاندارد آشپزخانه حس خوب:</span>
              <h3 className="text-2xl font-black text-primary">
                پکیج {toPersianDigits(calculation.discreteTier)} کیلوکالری
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-calm text-primary flex items-center justify-center font-bold text-sm">
              BMR
            </div>
          </div>

          {/* Metric Rows (Apple Health Rings Style) */}
          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-2xl bg-canvas border border-border-subtle flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block">متابولیسم پایه (BMR):</span>
                <span className="text-[11px] text-faint">انرژی در حالت استراحت مطلق</span>
              </div>
              <span className="text-lg font-black text-strong">
                {toPersianDigits(calculation.bmr)} <span className="text-xs font-normal text-muted">kcal</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-canvas border border-border-subtle flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block">کل انرژی مصرفی (TDEE):</span>
                <span className="text-[11px] text-faint">با احتساب ضریب تحرک</span>
              </div>
              <span className="text-lg font-black text-strong">
                {toPersianDigits(calculation.tdee)} <span className="text-xs font-normal text-muted">kcal</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-calm border border-border-subtle flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary block">کالری هدف روزانه:</span>
                <span className="text-[11px] text-muted">ایمن و بهینه برای هدف شما</span>
              </div>
              <span className="text-2xl font-black text-primary">
                {toPersianDigits(calculation.targetKcal)} <span className="text-xs font-normal text-muted">kcal</span>
              </span>
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="grid grid-cols-3 gap-2 text-center mb-8">
            <div className="p-3 rounded-xl bg-canvas border border-border-subtle">
              <span className="text-[10px] text-muted block mb-1">پروتئین خالص</span>
              <span className="text-base font-black text-primary">
                {toPersianDigits(calculation.proteinGrams)}g
              </span>
            </div>
            <div className="p-3 rounded-xl bg-canvas border border-border-subtle">
              <span className="text-[10px] text-muted block mb-1">کربوهیدرات</span>
              <span className="text-base font-black text-strong">
                {toPersianDigits(calculation.carbsGrams)}g
              </span>
            </div>
            <div className="p-3 rounded-xl bg-canvas border border-border-subtle">
              <span className="text-[10px] text-muted block mb-1">چربی سالم</span>
              <span className="text-base font-black text-strong">
                {toPersianDigits(calculation.fatGrams)}g
              </span>
            </div>
          </div>

          {/* Direct CTA to Onboarding Funnel with pre-selected tier */}
          <Link
            href={`/start?targetKcal=${calculation.discreteTier}&goal=${goal}&gender=${gender}`}
            className="w-full block"
          >
            <Button variant="primary" size="lg" isFullWidth className="rounded-pill text-sm font-bold shadow-sm">
              ثبت‌نام با این پکیج کالری ←
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
