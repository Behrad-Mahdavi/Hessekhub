// apps/api/src/modules/nutrition-engine/nutrition-engine.controller.ts
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { NutritionEngineService, CalculateEnergyInput } from "./nutrition-engine.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CurrentUser, CurrentUserPayload } from "../../common/decorators/current-user.decorator";
import { prisma } from "@hessekhub/database";

@Controller("nutrition")
export class NutritionEngineController {
  constructor(private readonly nutritionEngine: NutritionEngineService) {}

  // Public: Free scientific BMR/TDEE & Macro calculator (Tools)
  @Post("calculate")
  async calculate(@Body() input: CalculateEnergyInput) {
    return this.nutritionEngine.calculateEnergyPlan(input);
  }

  // Protected: Save or update customer health profile
  @Post("health-profile")
  @UseGuards(AuthGuard)
  async saveHealthProfile(
    @CurrentUser() user: CurrentUserPayload,
    @Body() input: CalculateEnergyInput
  ) {
    const energy = this.nutritionEngine.calculateEnergyPlan(input);

    const profile = await prisma.healthProfile.create({
      data: {
        customerId: user.customerId!,
        gender: input.gender,
        birthYearShamsi: input.birthYearShamsi,
        heightCm: input.heightCm,
        startingWeightKg: input.weightKg,
        targetWeightKg: input.weightKg - (input.goal === "WEIGHT_LOSS" ? 6 : 0),
        activityLevel: input.activityLevel,
        goal: input.goal,
        allergies: [],
        dislikedIngredients: [],
        medicalConditions: input.medicalConditions || [],
        isMedicalHighRisk: energy.isMedicalHighRisk,
        calculatedBmr: energy.bmr,
        calculatedTdee: energy.tdee,
      },
    });

    return { profile, energy };
  }
}

