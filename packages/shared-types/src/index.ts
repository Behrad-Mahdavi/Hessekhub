// packages/shared-types/src/index.ts
import { z } from "zod";

// ============================================================================
// 1. ENUMS & CONSTANTS (Aligned with Prisma Schema & Specs)
// ============================================================================

export const GenderSchema = z.enum(["FEMALE", "MALE"]);
export type Gender = z.infer<typeof GenderSchema>;

export const ActivityLevelSchema = z.enum([
  "SEDENTARY",
  "LIGHTLY_ACTIVE",
  "MODERATELY_ACTIVE",
  "VERY_ACTIVE",
  "ATHLETE",
]);
export type ActivityLevel = z.infer<typeof ActivityLevelSchema>;

export const FitnessGoalSchema = z.enum([
  "WEIGHT_LOSS",
  "MUSCLE_GAIN",
  "MAINTENANCE",
  "ATHLETIC_PERFORMANCE",
  "MEDICAL_WELLNESS",
]);
export type FitnessGoal = z.infer<typeof FitnessGoalSchema>;

export const CoverageTierTypeSchema = z.enum([
  "FULL_BOARD",
  "EXECUTIVE_WORKDAY",
  "NO_DINNER",
  "TRIAL_3_DAY",
  "MAINTENANCE_LIGHT",
]);
export type CoverageTierType = z.infer<typeof CoverageTierTypeSchema>;

export const MealTypeSchema = z.enum([
  "BREAKFAST",
  "MORNING_SNACK",
  "LUNCH",
  "EVENING_SNACK",
  "DINNER",
  "DRINK",
  "SALAD",
  "DESSERT",
]);
export type MealType = z.infer<typeof MealTypeSchema>;

export const DeliveryMethodSchema = z.enum([
  "COURIER_DELIVERY",
  "CAFE_PICKUP",
  "DINE_IN_CAFE",
]);
export type DeliveryMethod = z.infer<typeof DeliveryMethodSchema>;

export const CalorieTiers = [1200, 1500, 1800, 2200, 2500] as const;
export type CalorieTier = (typeof CalorieTiers)[number];

// ============================================================================
// 2. AUTH & ONBOARDING SCHEMAS (Module A)
// ============================================================================

export const SendOtpSchema = z.object({
  mobile: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است (باید با ۰۹ شروع شود و ۱۱ رقم باشد)"),
});
export type SendOtpInput = z.infer<typeof SendOtpSchema>;

export const VerifyOtpSchema = z.object({
  mobile: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  code: z.string().length(5, "کد تایید ۵ رقم است"),
});
export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;

// BMR / TDEE Quick Calculator (Module C, Tools)
export const CalorieCalculatorInputSchema = z.object({
  gender: GenderSchema,
  birthYearShamsi: z.number().int().min(1320).max(1395, "سن باید بالای ۱۰ سال باشد"),
  heightCm: z.number().min(100).max(230, "قد نامعتبر است"),
  weightKg: z.number().min(35).max(220, "وزن نامعتبر است"),
  activityLevel: ActivityLevelSchema,
  goal: FitnessGoalSchema,
});
export type CalorieCalculatorInput = z.infer<typeof CalorieCalculatorInputSchema>;

export const CalorieCalculatorOutputSchema = z.object({
  bmr: z.number().int(),
  tdee: z.number().int(),
  targetDailyKcal: z.number().int(),
  suggestedTierKcal: z.number().int(),
  proteinGrams: z.number(),
  carbsGrams: z.number(),
  fatGrams: z.number(),
  isMedicalHighRisk: z.boolean(),
});
export type CalorieCalculatorOutput = z.infer<typeof CalorieCalculatorOutputSchema>;

// Diagnostic Funnel / Start Onboarding (A-04..A-09)
export const OnboardingDraftSchema = z.object({
  step: z.number().int().min(1).max(6),
  goal: FitnessGoalSchema.optional(),
  gender: GenderSchema.optional(),
  birthYearShamsi: z.number().int().optional(),
  heightCm: z.number().optional(),
  startingWeightKg: z.number().optional(),
  targetWeightKg: z.number().optional(),
  startingWaistCm: z.number().optional(),
  activityLevel: ActivityLevelSchema.optional(),
  allergies: z.array(z.string()).default([]),
  dislikedIngredients: z.array(z.string()).default([]),
  medicalConditions: z.array(z.string()).default([]),
  selectedProgramSlug: z.string().optional(),
  selectedCoverageTierId: z.string().optional(),
  deliveryMethod: DeliveryMethodSchema.default("COURIER_DELIVERY"),
  deliveryZoneId: z.string().optional(),
  deliveryAddress: z.string().optional(),
  mobile: z.string().regex(/^09\d{9}$/).optional(),
});
export type OnboardingDraft = z.infer<typeof OnboardingDraftSchema>;

// ============================================================================
// 3. FRIDAY CHECK-IN & REVIEWS (A-22, C-02)
// ============================================================================

export const FridayCheckInSchema = z.object({
  subscriptionId: z.string(),
  weekNumber: z.number().int().min(1),
  fastingWeightKg: z.number().min(35).max(220),
  waistCircumferenceCm: z.number().min(40).max(180).optional(),
  hasMenstrualCycle: z.boolean().default(false),
  hadLowSleep: z.boolean().default(false),
  hadHighStress: z.boolean().default(false),
  hadOffPlanMeals: z.boolean().default(false),
  adherencePercent: z.number().int().min(0).max(100).default(100),
  energyScore: z.number().int().min(1).max(5).optional(),
  hungerScore: z.number().int().min(1).max(5).optional(),
  feedbackNote: z.string().optional(),
});
export type FridayCheckInInput = z.infer<typeof FridayCheckInSchema>;

// ============================================================================
// 4. CAFE ORDER & QR TABLE ORDERING (Module F)
// ============================================================================

export const CafeOrderItemInputSchema = z.object({
  cafeMenuItemId: z.string(),
  quantity: z.number().int().min(1),
});

export const CafeOrderCreateSchema = z.object({
  deliveryMethod: DeliveryMethodSchema,
  tableNumber: z.string().optional(),
  guestMobile: z.string().regex(/^09\d{9}$/).optional(),
  items: z.array(CafeOrderItemInputSchema).min(1, "حداقل یک آیتم باید انتخاب شود"),
  isFridayCheatDay: z.boolean().default(false),
  note: z.string().optional(),
});
export type CafeOrderCreateInput = z.infer<typeof CafeOrderCreateSchema>;

// ============================================================================
// 5. CMS DYNAMIC BLOCK TYPES & CONTENT (Module G)
// ============================================================================

export const CmsBlockTypeSchema = z.enum([
  "HERO_LEAF",
  "VALUE_GRID",
  "PACKAGE_COMPARISON",
  "CAFE_SHOWCASE",
  "BMR_TEASER",
  "ROTATIONAL_MENU_PREVIEW",
  "TESTIMONIALS",
  "FAQ_ACCORDION",
  "RICH_TEXT",
]);
export type CmsBlockType = z.infer<typeof CmsBlockTypeSchema>;

export interface CmsHeroBlockContent {
  headlineFa: string;
  subheadlineFa: string;
  primaryCtaTitleFa: string;
  primaryCtaUrl: string;
  secondaryCtaTitleFa?: string;
  secondaryCtaUrl?: string;
  badgeFa?: string;
  mediaAssetId?: string;
  glyphId?: string;
}

export interface CmsValueGridItem {
  glyphId: string;
  titleFa: string;
  descriptionFa: string;
}

export interface CmsValueGridContent {
  sectionTitleFa: string;
  sectionSubtitleFa?: string;
  items: CmsValueGridItem[];
}

export interface CmsPackageComparisonContent {
  sectionTitleFa: string;
  sectionSubtitleFa?: string;
  featuredProgramSlugs: string[];
}

export interface CmsCafeShowcaseContent {
  titleFa: string;
  descriptionFa: string;
  openHoursFa: string;
  locationAddressFa: string;
  ctaTextFa: string;
  ctaUrl: string;
  featuredItemIds: string[];
}

// ============================================================================
// 6. SEO, GEO & AEO CONTRACTS
// ============================================================================

export interface SeoGeoMetadata {
  metaTitleFa: string;
  metaDescriptionFa: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImageUrl?: string;
  directAnswerCapsuleFa?: string;
  llmFactSummaryMd?: string;
  customJsonLd?: Record<string, unknown>;
}

export interface DirectAnswerCapsuleProps {
  question: string;
  answer: string;
}

export interface LlmsTxtSection {
  title: string;
  description?: string;
  links: Array<{ title: string; url: string; detail?: string }>;
}

