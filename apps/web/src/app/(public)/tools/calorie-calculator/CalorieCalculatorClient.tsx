// apps/web/src/app/(public)/tools/calorie-calculator/CalorieCalculatorClient.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Card, Button, Badge, NumberField, toPersianDigits } from "@hessekhub/ui";

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

    // Macros
    const proteinGrams = Math.round((discreteTier * 0.3) / 4);
    const carbsGrams = Math.round((discreteTier * 0.45) / 4);
    const fatGrams = Math.round((discreteTier * 0.25) / 9);

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
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-start">
        {/* Form Controls (Left / Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 md:p-8 border-border-default">
            {/* Gender Toggle */}
            <div className="mb-6">
              <label className="text-xs font-bold text-muted block mb-2">جنسیت</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("FEMALE")}
                  className={`py-3 rounded-2xl font-bold text-sm border transition-all ${
                    gender === "FEMALE"
                      ? "bg-primary text-white border-primary shadow-elevation-1"
                      : "bg-canvas text-strong border-border-default hover:border-primary/40"
                  }`}
                >
                  خانم
                </button>
                <button
                  type="button"
                  onClick={() => setGender("MALE")}
                  className={`py-3 rounded-2xl font-bold text-sm border transition-all ${
                    gender === "MALE"
                      ? "bg-primary text-white border-primary shadow-elevation-1"
                      : "bg-canvas text-strong border-border-default hover:border-primary/40"
                  }`}
                >
                  آقا
                </button>
              </div>
            </div>

            {/* Metrics Range Sliders with NumberFields */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted">سن شما:</span>
                  <div className="w-24">
                    <NumberField
                      value={age}
                      onChange={(v) => typeof v === "number" && setAge(v)}
                      unitLabel="سال"
                      min={15}
                      max={85}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-calm rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted">وزن فعلی:</span>
                  <div className="w-28">
                    <NumberField
                      value={weightKg}
                      onChange={(v) => typeof v === "number" && setWeightKg(v)}
                      unitLabel="kg"
                      min={35}
                      max={180}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="35"
                  max="180"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-calm rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted">قد:</span>
                  <div className="w-28">
                    <NumberField
                      value={heightCm}
                      onChange={(v) => typeof v === "number" && setHeightCm(v)}
                      unitLabel="cm"
                      min={120}
                      max={225}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="120"
                  max="225"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-calm rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Activity Level Selector */}
            <div className="mb-6">
              <label className="text-xs font-bold text-muted block mb-2">سطح فعالیت روزانه</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                className="w-full p-3.5 rounded-2xl bg-canvas border border-border-default text-sm text-strong focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                        ? "bg-primary text-white border-primary shadow-elevation-1"
                        : "bg-canvas text-strong border-border-default hover:border-primary/40"
                    }`}
                  >
                    {item.labelFa}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Results Card (Right / Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 md:p-8 border-primary/30 bg-gradient-to-b from-surface to-calm/60 shadow-elevation-2">
            <Badge variant="primary" size="md" className="mb-4">
              نتایج تحلیل بیومتریک شما
            </Badge>

            <div className="mb-6">
              <span className="text-xs text-muted block mb-1">
                کالری پایه متابولیسم استراحت (BMR):
              </span>
              <span className="text-lg font-bold text-strong">
                {toPersianDigits(calculation.bmr)} کیلوکالری
              </span>
            </div>

            <div className="mb-6">
              <span className="text-xs text-muted block mb-1">
                مجموع کالری مصرفی روزانه (TDEE):
              </span>
              <span className="text-lg font-bold text-strong">
                {toPersianDigits(calculation.tdee)} کیلوکالری
              </span>
            </div>

            {/* Target Calorie Highlight (Respect the body: Warm blue primary token, NOT red) */}
            <div className="p-5 rounded-2xl bg-primary-subtle/40 border border-primary/30 mb-6">
              <span className="text-xs font-bold text-primary block mb-1">
                کالری هدف پکیج اختصاصی شما در حس خوب:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-primary">
                  {toPersianDigits(calculation.discreteTier)}
                </span>
                <span className="text-xs font-bold text-primary">
                  کیلوکالری / روز (تیپ {toPersianDigits(calculation.discreteTier)})
                </span>
              </div>
            </div>

            {/* Target Macros Breakdown */}
            <div className="mb-8">
              <span className="text-xs font-bold text-muted block mb-3">
                توزیع متوازن درشت‌مغذی‌ها در پکیج روزانه:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-xl bg-canvas border border-border-default text-center">
                  <span className="text-[11px] text-muted block mb-1">پروتئین خالص</span>
                  <span className="text-base font-extrabold text-primary">
                    {toPersianDigits(calculation.proteinGrams)}g
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-canvas border border-border-default text-center">
                  <span className="text-[11px] text-muted block mb-1">کربوهیدرات پیچیده</span>
                  <span className="text-base font-extrabold text-strong">
                    {toPersianDigits(calculation.carbsGrams)}g
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-canvas border border-border-default text-center">
                  <span className="text-[11px] text-muted block mb-1">چربی‌های مفید</span>
                  <span className="text-base font-extrabold text-strong">
                    {toPersianDigits(calculation.fatGrams)}g
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/start?goal=${goal}&gender=${gender}&age=${age}&weight=${weightKg}&height=${heightCm}&activity=${activity}&tier=${calculation.discreteTier}`}
              className="w-full"
            >
              <Button variant="primary" size="lg" className="w-full">
                شروع برنامه با این هدف کالری
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
