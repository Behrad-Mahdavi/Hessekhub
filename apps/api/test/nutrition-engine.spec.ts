// apps/api/test/nutrition-engine.spec.ts
import { NutritionEngineService } from "../src/modules/nutrition-engine/nutrition-engine.service";

describe("NutritionEngineService (Unit Tests)", () => {
  let service: NutritionEngineService;

  beforeEach(() => {
    service = new NutritionEngineService();
  });

  describe("BMR Calculation (Mifflin-St Jeor)", () => {
    it("should correctly calculate BMR for Male (weight: 80kg, height: 180cm, age: 30)", () => {
      // 10 * 80 + 6.25 * 180 - 5 * 30 + 5 = 800 + 1125 - 150 + 5 = 1780
      const bmr = service.calculateBmr("MALE", 80, 180, 30);
      expect(bmr).toBe(1780);
    });

    it("should correctly calculate BMR for Female (weight: 65kg, height: 165cm, age: 28)", () => {
      // 10 * 65 + 6.25 * 165 - 5 * 28 - 161 = 650 + 1031.25 - 140 - 161 = 1380.25 -> 1380
      const bmr = service.calculateBmr("FEMALE", 65, 165, 28);
      expect(bmr).toBe(1380);
    });
  });

  describe("TDEE & Multipliers", () => {
    it("should apply correct multipliers for activity levels", () => {
      expect(service.getActivityMultiplier("SEDENTARY")).toBe(1.2);
      expect(service.getActivityMultiplier("LIGHTLY_ACTIVE")).toBe(1.375);
      expect(service.getActivityMultiplier("MODERATELY_ACTIVE")).toBe(1.55);
      expect(service.getActivityMultiplier("VERY_ACTIVE")).toBe(1.725);
      expect(service.getActivityMultiplier("ATHLETE")).toBe(1.9);
    });
  });

  describe("Discrete Tier Mapping (1200, 1500, 1800, 2200, 2500)", () => {
    it("should map 1420 kcal to 1500 kcal discrete tier", () => {
      const tier = service.mapToDiscreteTier(1420, "WEIGHT_LOSS");
      expect(tier).toBe(1500);
    });

    it("should map 1750 kcal to 1800 kcal discrete tier", () => {
      const tier = service.mapToDiscreteTier(1750, "WEIGHT_LOSS");
      expect(tier).toBe(1800);
    });

    it("should map 2350 kcal to 2200 kcal for WEIGHT_LOSS (tie-breaker downwards)", () => {
      // Distance to 2200 is 150, distance to 2500 is 150 -> tie
      const tier = service.mapToDiscreteTier(2350, "WEIGHT_LOSS");
      expect(tier).toBe(2200);
    });

    it("should map 2350 kcal to 2500 kcal for MUSCLE_GAIN (tie-breaker upwards)", () => {
      const tier = service.mapToDiscreteTier(2350, "MUSCLE_GAIN");
      expect(tier).toBe(2500);
    });
  });

  describe("Safety Clamps & Medical Screening", () => {
    it("should enforce female minimum clamp of 1200 kcal", () => {
      const result = service.calculateEnergyPlan({
        gender: "FEMALE",
        birthYearShamsi: 1375, // 30yo
        heightCm: 155,
        weightKg: 45,
        activityLevel: "SEDENTARY",
        goal: "WEIGHT_LOSS",
        calorieDeltaRule: -600,
      });

      expect(result.clampedTargetKcal).toBeGreaterThanOrEqual(1200);
      expect(result.discreteTierKcal).toBe(1200);
    });

    it("should flag pregnancy and severe BMI as high-risk", () => {
      const result = service.calculateEnergyPlan({
        gender: "FEMALE",
        birthYearShamsi: 1370,
        heightCm: 160,
        weightKg: 115, // BMI = 44.9 (> 42)
        activityLevel: "SEDENTARY",
        goal: "WEIGHT_LOSS",
        medicalConditions: ["PREGNANCY"],
      });

      expect(result.isMedicalHighRisk).toBe(true);
      expect(result.medicalRiskReasons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Workday Package vs Home Plate Guide Split", () => {
    it("should split 60% package and 40% home plate for EXECUTIVE_WORKDAY", () => {
      const result = service.calculateEnergyPlan({
        gender: "MALE",
        birthYearShamsi: 1365,
        heightCm: 180,
        weightKg: 82,
        activityLevel: "MODERATELY_ACTIVE",
        goal: "WEIGHT_LOSS",
        calorieSharePercent: 60,
      });

      expect(result.packageKcal).toBe(Math.round(result.discreteTierKcal * 0.6));
      expect(result.homePlateKcal).toBe(result.discreteTierKcal - result.packageKcal);
    });
  });
});

