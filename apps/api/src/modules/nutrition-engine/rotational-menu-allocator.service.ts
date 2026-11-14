// apps/api/src/modules/nutrition-engine/rotational-menu-allocator.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { prisma, MealType, Meal } from "@hessekhub/database";
import { randomUUID } from "crypto";

export interface AllocateMenuInput {
  subscriptionId: string;
  customerId: string;
  calorieTierKcal: number;
  startDate: Date;
  daysCount: number;
  includedMealTypes: MealType[];
  userAllergies?: string[];
  dislikedIngredients?: string[];
  frozenDates?: Date[];
}

@Injectable()
export class RotationalMenuAllocatorService {
  private readonly logger = new Logger(RotationalMenuAllocatorService.name);

  async allocateSubscriptionDays(input: AllocateMenuInput) {
    const assignments = [];
    const frozenSet = new Set((input.frozenDates || []).map((d) => d.toISOString().split("T")[0]));

    let currentDate = new Date(input.startDate);
    let assignedDays = 0;

    // Fetch rotational menu days (1 to 14) with options
    const rotationalDays = await prisma.rotationalMenuDay.findMany({
      include: {
        optionAMeal: true,
        optionBMeal: true,
      },
    });

    const rotationalMap = new Map<string, { optionAMeal: Meal; optionBMeal: Meal }>();
    for (const rd of rotationalDays) {
      rotationalMap.set(`${rd.cycleDayIndex}_${rd.mealType}`, {
        optionAMeal: rd.optionAMeal,
        optionBMeal: rd.optionBMeal,
      });
    }

    while (assignedDays < input.daysCount) {
      const dateString = currentDate.toISOString().split("T")[0]!;
      const dayOfWeek = currentDate.getDay(); // 5 = Friday in JS (Sun=0, Fri=5)

      // Skip Fridays (Friday is Boutique Cafe Cheat-Day / Pick-up) and frozen dates
      if (dayOfWeek !== 5 && !frozenSet.has(dateString)) {
        // Calculate 14-day rotational cycle index (1..14)
        const daysSinceEpoch = Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24));
        const cycleDayIndex = (daysSinceEpoch % 14) + 1;

        for (const mealType of input.includedMealTypes) {
          const rotation = rotationalMap.get(`${cycleDayIndex}_${mealType}`);
          if (!rotation) continue;

          // Allergy and preference scoring
          const chosenMeal = this.selectBestOption(
            rotation.optionAMeal,
            rotation.optionBMeal,
            input.userAllergies || [],
            input.dislikedIngredients || []
          );

          const qrFeedbackToken = randomUUID();

          const assignment = await prisma.menuAssignment.create({
            data: {
              subscriptionId: input.subscriptionId,
              customerId: input.customerId,
              deliveryDate: new Date(currentDate),
              mealType,
              assignedMealId: chosenMeal.id,
              calorieTierKcal: input.calorieTierKcal,
              qrFeedbackToken,
              isSwappedByUser: false,
              isLocked: false,
            },
          });

          assignments.push(assignment);
        }

        assignedDays++;
      }

      // Increment by 1 day
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    this.logger.log(
      `[Menu Allocation] Assigned ${assignments.length} meals across ${assignedDays} delivery days for subscription ${input.subscriptionId}`
    );
    return assignments;
  }

  // Allergy hard-filter & preference scoring
  private selectBestOption(
    mealA: Meal,
    mealB: Meal,
    userAllergies: string[],
    dislikedIngredients: string[]
  ): Meal {
    const hasAllergyA = mealA.allergens.some((a) => userAllergies.includes(a));
    const hasAllergyB = mealB.allergens.some((a) => userAllergies.includes(a));

    // Hard medical allergy rule
    if (hasAllergyA && !hasAllergyB) return mealB;
    if (hasAllergyB && !hasAllergyA) return mealA;

    // Disliked ingredients penalty
    const penaltyA = mealA.ingredientsFa.filter((i) => dislikedIngredients.includes(i)).length;
    const penaltyB = mealB.ingredientsFa.filter((i) => dislikedIngredients.includes(i)).length;

    if (penaltyA < penaltyB) return mealA;
    if (penaltyB < penaltyA) return mealB;

    // Default to Option A
    return mealA;
  }
}

