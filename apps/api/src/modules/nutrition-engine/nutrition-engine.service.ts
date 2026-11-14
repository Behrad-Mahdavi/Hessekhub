// apps/api/src/modules/nutrition-engine/nutrition-engine.service.ts
import { Injectable } from "@nestjs/common";
import { Gender, ActivityLevel, FitnessGoal, CalorieTier, CalorieTiers } from "@hessekhub/shared-types";

export interface CalculateEnergyInput {
  gender: Gender;
  birthYearShamsi: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  calorieDeltaRule?: number; // e.g. -450 for weight loss, +300 for muscle gain
  calorieSharePercent?: number; // e.g. 100 for full board, 60 for workday
  medicalConditions?: string[];
}

export interface CalculateEnergyResult {
  age: number;
  bmi: number;
  bmr: number;
  tdee: number;
  rawTargetKcal: number;
  clampedTargetKcal: number;
  discreteTierKcal: CalorieTier;
  packageKcal: number;
  homePlateKcal: number;
  macros: {
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };
  isMedicalHighRisk: boolean;
  medicalRiskReasons: string[];
  reasonFa: string;
}

@Injectable()
export class NutritionEngineService {
  // 1. Calculate BMR using Mifflin-St Jeor equation
  calculateBmr(gender: Gender, weightKg: number, heightCm: number, age: number): number {
    if (gender === "MALE") {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
    } else {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
    }
  }

  // 2. Activity multiplier mapping (B-14)
  getActivityMultiplier(activityLevel: ActivityLevel): number {
    switch (activityLevel) {
      case "SEDENTARY":
        return 1.2;
      case "LIGHTLY_ACTIVE":
        return 1.375;
      case "MODERATELY_ACTIVE":
        return 1.55;
      case "VERY_ACTIVE":
        return 1.725;
      case "ATHLETE":
        return 1.9;
    }
  }

  // 3. Map continuous calories to discrete kitchen production tiers (1200, 1500, 1800, 2200, 2500)
  mapToDiscreteTier(targetKcal: number, goal: FitnessGoal): CalorieTier {
    const tiers: CalorieTier[] = [...CalorieTiers];

    let closestTier = tiers[0]!;
    let minDistance = Math.abs(targetKcal - closestTier);

    for (const tier of tiers) {
      const distance = Math.abs(targetKcal - tier);
      if (distance < minDistance) {
        minDistance = distance;
        closestTier = tier;
      } else if (distance === minDistance) {
        // Tie-breaker: round down for weight loss, round up for muscle gain
        closestTier = goal === "WEIGHT_LOSS" ? Math.min(closestTier, tier) as CalorieTier : Math.max(closestTier, tier) as CalorieTier;
      }
    }

    return closestTier;
  }

  // 4. Medical high-risk screening (A-06, B-05)
  screenMedicalRisks(
    bmi: number,
    medicalConditions: string[] = []
  ): { isHighRisk: boolean; reasons: string[] } {
    const reasons: string[] = [];

    if (bmi < 18.0) {
      reasons.push("شاخص توده بدنی کمتر از ۱۸ (کمبود وزن شدید)");
    } else if (bmi > 42.0) {
      reasons.push("شاخص توده بدنی بالاتر از ۴۲ (چاقی درجه ۳)");
    }

    const highRiskConditions = [
      "PREGNANCY",
      "LACTATION",
      "DIABETES_T1",
      "DIABETES_T2_INSULIN",
      "CHRONIC_KIDNEY_DISEASE",
      "EATING_DISORDER_HISTORY",
    ];

    for (const cond of medicalConditions) {
      if (highRiskConditions.includes(cond)) {
        reasons.push(`شرایط پزشکی ویژه: ${cond}`);
      }
    }

    return {
      isHighRisk: reasons.length > 0,
      reasons,
    };
  }

  // 5. Full Energy & Macro Pipeline
  calculateEnergyPlan(input: CalculateEnergyInput): CalculateEnergyResult {
    // Current Shamsi year is 1405
    const currentYearShamsi = 1405;
    const age = Math.max(12, currentYearShamsi - input.birthYearShamsi);

    // BMI calculation: weight / (heightInMeters ^ 2)
    const heightM = input.heightCm / 100;
    const bmi = Number((input.weightKg / (heightM * heightM)).toFixed(1));

    // BMR & TDEE
    const bmr = this.calculateBmr(input.gender, input.weightKg, input.heightCm, age);
    const multiplier = this.getActivityMultiplier(input.activityLevel);
    const tdee = Math.round(bmr * multiplier);

    // Apply goal delta
    const delta = input.calorieDeltaRule !== undefined
      ? input.calorieDeltaRule
      : input.goal === "WEIGHT_LOSS"
      ? -450
      : input.goal === "MUSCLE_GAIN"
      ? 300
      : 0;

    const rawTargetKcal = tdee + delta;

    // Apply hard safety clamps (B-08)
    const minSafeKcal = input.gender === "FEMALE" ? 1200 : 1500;
    const maxSafeKcal = 3200;
    const clampedTargetKcal = Math.max(minSafeKcal, Math.min(rawTargetKcal, maxSafeKcal));

    // Map to discrete kitchen tier
    const discreteTierKcal = this.mapToDiscreteTier(clampedTargetKcal, input.goal);

    // Package vs Home Plate split
    const sharePercent = input.calorieSharePercent !== undefined ? input.calorieSharePercent : 100;
    const packageKcal = Math.round((discreteTierKcal * sharePercent) / 100);
    const homePlateKcal = discreteTierKcal - packageKcal;

    // Macro split
    let proteinPercent = 0.3;
    let carbsPercent = 0.45;
    let fatPercent = 0.25;

    if (input.goal === "MAINTENANCE") {
      proteinPercent = 0.25;
      carbsPercent = 0.45;
      fatPercent = 0.3;
    }

    const proteinGrams = Math.round((discreteTierKcal * proteinPercent) / 4);
    const carbsGrams = Math.round((discreteTierKcal * carbsPercent) / 4);
    const fatGrams = Math.round((discreteTierKcal * fatPercent) / 9);

    // Medical risk screening
    const { isHighRisk, reasons } = this.screenMedicalRisks(bmi, input.medicalConditions);

    const reasonFa = isHighRisk
      ? `به دلیل ${reasons.join(" و ")}، برنامه پس از ثبت نهایی جهت تایید شخصی به کارشناس ارشد تغذیه ارجاع می‌شود.`
      : `محاسبه متابولیک پایه BMR (${bmr} کیلوکالری) با ضریب فعالیت ${multiplier}، انرژی مصرفی روزانه شما را ${tdee} تعیین کرد. جهت ${
          input.goal === "WEIGHT_LOSS" ? "چربی‌سوزی پایدار" : "تثبیت متابولیسم"
        }، تیپ استاندارد ${discreteTierKcal} کیلوکالری اختصاص یافت.`;

    return {
      age,
      bmi,
      bmr,
      tdee,
      rawTargetKcal,
      clampedTargetKcal,
      discreteTierKcal,
      packageKcal,
      homePlateKcal,
      macros: {
        proteinGrams,
        carbsGrams,
        fatGrams,
      },
      isMedicalHighRisk: isHighRisk,
      medicalRiskReasons: reasons,
      reasonFa,
    };
  }
}

