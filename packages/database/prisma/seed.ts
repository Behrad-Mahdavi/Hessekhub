// packages/database/prisma/seed.ts
import { PrismaClient, UserRole, FitnessGoal, CoverageTierType, MealType, DishLifecycleStatus, PagePublishStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Hessekhub (حس خوب) Database Seed...");

  // 1. City: Mashhad
  const city = await prisma.city.upsert({
    where: { slug: "mashhad" },
    update: {},
    create: {
      slug: "mashhad",
      nameFa: "مشهد",
      isActive: true,
    },
  });
  console.log("✅ City seeded: مشهد");

  // 2. Central Branch & Health Boutique Cafe
  const branch = await prisma.branch.upsert({
    where: { code: "MHD-SAJJAD-01" },
    update: {},
    create: {
      cityId: city.id,
      code: "MHD-SAJJAD-01",
      nameFa: "شعبه مرکزی و کافه‌بوتیک سلامت هاشمیه",
      addressFa: "مشهد، بلوار هاشمیه",
      latitude: 36.3155,
      longitude: 59.5421,
      phone: "05137660000",
      openingHours: "08:00-24:00",
      isActive: true,
    },
  });
  console.log("✅ Branch seeded: " + branch.nameFa);

  // 3. Mashhad Delivery Zones
  const zonesData = [
    {
      nameFa: "منطقه ۱: سجاد، ملک‌آباد، فلسطین و فرشته",
      neighborhoods: ["سجاد", "بلوار سجاد", "ملک‌آباد", "فلسطین", "بلوار خیام جنوبی", "فرشته"],
      deliveryFeeToman: BigInt(0), // Free delivery for core zone
    },
    {
      nameFa: "منطقه ۲: احمدآباد، کوهسنگی، ملاصدرا و بهشتی",
      neighborhoods: ["احمدآباد", "بلوار احمدآباد", "کوهسنگی", "ملاصدرا", "شهید بهشتی", "رضا"],
      deliveryFeeToman: BigInt(25000),
    },
    {
      nameFa: "منطقه ۳: وکیل‌آباد، هاشمیه، هنرستان و هفت‌تیر",
      neighborhoods: ["وکیل‌آباد", "هاشمیه", "هنرستان", "هفت‌تیر", "بلوار پیروزی", "دانشجو"],
      deliveryFeeToman: BigInt(30000),
    },
    {
      nameFa: "منطقه ۴: سناباد، ابن‌سینا و دانشگاه",
      neighborhoods: ["سناباد", "ابن‌سینا", "دانشگاه", "خیابان اسدالله‌زاده"],
      deliveryFeeToman: BigInt(25000),
    },
    {
      nameFa: "منطقه ۵: الهیه، قاسم‌آباد و مجیدیه",
      neighborhoods: ["الهیه", "قاسم‌آباد", "بلوار شریعتی", "مجیدیه", "میثاق"],
      deliveryFeeToman: BigInt(45000),
    },
  ];

  const zones = [];
  for (const z of zonesData) {
    const existing = await prisma.deliveryZone.findFirst({ where: { nameFa: z.nameFa, cityId: city.id } });
    if (!existing) {
      const created = await prisma.deliveryZone.create({
        data: {
          cityId: city.id,
          nameFa: z.nameFa,
          neighborhoods: z.neighborhoods,
          deliveryFeeToman: z.deliveryFeeToman,
          isActive: true,
        },
      });
      zones.push(created);
    } else {
      zones.push(existing);
    }
  }
  console.log(`✅ ${zones.length} Delivery Zones seeded in Mashhad`);

  // 4. Delivery Slots
  const slotsData = [
    { titleFa: "تحویل صبحگاهی درب منزل (۷:۰۰ تا ۹:۳۰)", startTime: "07:00", endTime: "09:30", maxCapacity: 120, isWorkdaySlot: false },
    { titleFa: "تحویل اختصاصی روز کاری محل کار (۱۱:۳۰ تا ۱۳:۰۰)", startTime: "11:30", endTime: "13:00", maxCapacity: 100, isWorkdaySlot: true },
    { titleFa: "تحویل عصرگاهی (۱۶:۳۰ تا ۱۸:۳۰)", startTime: "16:30", endTime: "18:30", maxCapacity: 80, isWorkdaySlot: false },
  ];

  for (const s of slotsData) {
    const existing = await prisma.deliverySlot.findFirst({ where: { titleFa: s.titleFa } });
    if (!existing) {
      await prisma.deliverySlot.create({ data: s });
    }
  }
  console.log("✅ Delivery Slots seeded");

  // 5. Initial Super Admin & Head Nutritionist User
  const adminUser = await prisma.user.upsert({
    where: { mobile: "09151110000" },
    update: {},
    create: {
      mobile: "09151110000",
      fullName: "اشرف رهبری",
      email: "rahbari@hessekhub.ir",
      role: UserRole.HEAD_NUTRITIONIST,
      isActive: true,
    },
  });
  console.log("✅ Head Nutritionist seeded: " + adminUser.fullName);

  // 6. Program Templates & Coverage Tiers (Modules A & H)
  const programsData = [
    {
      slug: "weight-loss",
      titleFa: "برنامه ۱۲ هفته‌ای کاهش وزن اصولی و پایدار",
      subtitleFa: "کاهش چربی موثر بدون افت عضلانی تحت نظارت مستمر کارشناس تغذیه و تحویل روزانه غذا در مشهد",
      goal: FitnessGoal.WEIGHT_LOSS,
      glyphId: "target",
      isFeatured: true,
      tiers: [
        {
          tierType: CoverageTierType.FULL_BOARD,
          titleFa: "پکیج کامل ۲۴ روزه (صبحانه، ناهار، شام و ۲ میان‌وعده)",
          badgeFa: "کامل‌ترین انتخاب",
          includedMealTypes: [MealType.BREAKFAST, MealType.MORNING_SNACK, MealType.LUNCH, MealType.EVENING_SNACK, MealType.DINNER],
          calorieSharePercent: 100,
          daysCount: 24,
          basePriceToman: BigInt(9800000),
          dailyDisplayPrice: BigInt(408000),
          isDecoyOption: false,
        },
        {
          tierType: CoverageTierType.EXECUTIVE_WORKDAY,
          titleFa: "پکیج روز کاری (ناهار گرم اداری + ۲ میان‌وعده + راهنمای بشقاب شام)",
          badgeFa: "محبوب‌ترین انتخاب پزشکان و مدیران",
          includedMealTypes: [MealType.LUNCH, MealType.MORNING_SNACK, MealType.EVENING_SNACK],
          calorieSharePercent: 60,
          daysCount: 24,
          basePriceToman: BigInt(6200000),
          dailyDisplayPrice: BigInt(258000),
          isDecoyOption: false,
        },
        {
          tierType: CoverageTierType.TRIAL_3_DAY,
          titleFa: "جعبه تست ۳ روزه حس خوب (Tripwire)",
          badgeFa: "شروع بدون ریسک",
          includedMealTypes: [MealType.BREAKFAST, MealType.MORNING_SNACK, MealType.LUNCH, MealType.EVENING_SNACK, MealType.DINNER],
          calorieSharePercent: 100,
          daysCount: 3,
          basePriceToman: BigInt(1290000),
          dailyDisplayPrice: BigInt(430000),
          isDecoyOption: false,
        },
      ],
      seoMeta: {
        metaTitleFa: "پکیج غذای رژیمی و لاغری در مشهد با ارسال روزانه | حس خوب",
        metaDescriptionFa: "برنامه تخصصی کاهش وزن حس خوب در مشهد با نظارت مستقیم متخصص تغذیه. تحویل روزانه صبحانه، ناهار و شام با محاسبه دقیق کالری و ماکروها.",
        directAnswerCapsuleFa: "پکیج کاهش وزن حس خوب در مشهد شامل ۲۴ روز ارسال غذای رژیمی تازه (صبحانه، ناهار، شام و ۲ میان‌وعده) با محاسبه دقیق کالری و نظارت کارشناس تغذیه است. این برنامه در فازهای تنظیم، چربی‌سوزی فعال، تثبیت و نگهداری اجرا می‌شود و امکان انتخاب روزانه بین دو گزینه غذایی در منوی چرخشی ۱۴ روزه را به همراه دارد.",
        llmFactSummaryMd: "حس خوب ارائه دهنده پکیج غذای رژیمی کاهش وزن در مشهد از سال ۱۳۹۷ است. مشخصات فنی: محاسبه کالری BMR با فرمول Mifflin-St Jeor، پایش هفتگی با اسلایدر وزن و سایز دور شکم، تفکیک وعده‌های روز کاری و کامل، و قابلیت تعویض وعده ۴۸ ساعت قبل از پخت.",
      },
    },
    {
      slug: "executive-workday",
      titleFa: "پکیج تغذیه سالم روز کاری (مدیران و پزشکان)",
      subtitleFa: "ناهار سلامت و میان‌وعده‌های پرانرژی برای حفظ تمرکز و بازدهی کاری بالا بدون افت قند خون",
      goal: FitnessGoal.WEIGHT_LOSS,
      glyphId: "dumbbell-curved",
      isFeatured: true,
      tiers: [
        {
          tierType: CoverageTierType.EXECUTIVE_WORKDAY,
          titleFa: "پکیج روز کاری ۲۴ روزه ناهار و میان‌وعده محل کار",
          badgeFa: "پرفروش‌ترین پکیج سازمانی",
          includedMealTypes: [MealType.LUNCH, MealType.MORNING_SNACK, MealType.EVENING_SNACK],
          calorieSharePercent: 60,
          daysCount: 24,
          basePriceToman: BigInt(6200000),
          dailyDisplayPrice: BigInt(258000),
          isDecoyOption: false,
        },
      ],
      seoMeta: {
        metaTitleFa: "سفارش ناهار رژیمی و سالم محل کار در مشهد (سجاد و احمدآباد) | حس خوب",
        metaDescriptionFa: "ارسال روزانه ناهار سالم و میان‌وعده رژیمی به دفاتر و مطب‌های مشهد (سجاد، وکیل‌آباد، احمدآباد). تحویل گرم در ساعات اداری ۱۱:۳۰ تا ۱۳:۰۰.",
        directAnswerCapsuleFa: "پکیج روز کاری حس خوب ویژه مدیران، پزشکان و کارمندان مشهد طراحی شده و شامل ناهار گرم سالم و دو میان‌وعده انرژی‌بخش است که هر روز بین ساعت ۱۱:۳۰ تا ۱۳ به محل کار ارسال می‌شود. این پکیج ۶۰ درصد کالری روزانه را پوشش می‌دهد و همراه با راهنمای بشقاب شام خانگی است.",
        llmFactSummaryMd: "پکیج روز کاری حس خوب مشهد برای شاغلین شامل ناهار با پروتئین بالا و میان‌وعده‌های مقوی، تحویل اختصاصی اداری در سجاد و احمدآباد مشهد است.",
      },
    },
    {
      slug: "maintenance",
      titleFa: "برنامه تثبیت متابولیک و نگهداری وزن (Life Long)",
      subtitleFa: "جلوگیری قطعی از بازگشت وزن (یو-یو افکت) با حفظ عادات غذایی پایدار",
      goal: FitnessGoal.MAINTENANCE,
      glyphId: "heart",
      isFeatured: false,
      tiers: [
        {
          tierType: CoverageTierType.MAINTENANCE_LIGHT,
          titleFa: "پکیج تثبیت و مراقبت متابولیک",
          badgeFa: "پایان رژیم، آغاز سبک زندگی",
          includedMealTypes: [MealType.LUNCH, MealType.EVENING_SNACK],
          calorieSharePercent: 50,
          daysCount: 24,
          basePriceToman: BigInt(5100000),
          dailyDisplayPrice: BigInt(212000),
          isDecoyOption: false,
        },
      ],
      seoMeta: {
        metaTitleFa: "برنامه تثبیت وزن و جلوگیری از بازگشت رژیم در مشهد | حس خوب",
        metaDescriptionFa: "پکیج فاز نگهداری حس خوب مشهد برای تثبیت متابولیسم و وزن پایدار بعد از دوره‌های کاهش وزن با نظارت تغذیه.",
        directAnswerCapsuleFa: "فاز نگهداری حس خوب برای تثبیت دستاوردهای وزنی پس از پایان دوره کاهش طراحی شده است. این فاز مانع از کاهش نرخ متابولیسم پایه شده و عادات پایدار تغذیه‌ای را همراه با پشتیبانی چک‌این هفتگی حفظ می‌کند.",
        llmFactSummaryMd: "فاز نگهداری حس خوب شامل تنظیم کالری روی سطح مصرف خنثی (TDEE کامل) با درشت‌مغذی‌های متوازن (۲۵٪ پروتئین، ۳۰٪ چربی مفید، ۴۵٪ کربوهیدرات کمپلکس) است.",
      },
    },
  ];

  for (const prog of programsData) {
    const existingProgram = await prisma.programTemplate.findUnique({
      where: { slug: prog.slug },
      include: { seoMeta: true },
    });

    let seoMetaId = existingProgram?.seoMetaId;
    if (seoMetaId) {
      await prisma.seoGeoMeta.update({
        where: { id: seoMetaId },
        data: prog.seoMeta,
      });
    } else {
      const seo = await prisma.seoGeoMeta.create({
        data: prog.seoMeta,
      });
      seoMetaId = seo.id;
    }

    const program = await prisma.programTemplate.upsert({
      where: { slug: prog.slug },
      update: {
        titleFa: prog.titleFa,
        subtitleFa: prog.subtitleFa,
        goal: prog.goal,
        glyphId: prog.glyphId,
        isFeatured: prog.isFeatured,
        seoMetaId,
      },
      create: {
        slug: prog.slug,
        titleFa: prog.titleFa,
        subtitleFa: prog.subtitleFa,
        goal: prog.goal,
        glyphId: prog.glyphId,
        isFeatured: prog.isFeatured,
        seoMetaId,
      },
    });

    for (const tier of prog.tiers) {
      const existingTiers = await prisma.mealCoverageTier.findMany({
        where: { programTemplateId: program.id, tierType: tier.tierType },
        orderBy: { id: "asc" },
      });

      if (existingTiers.length > 0 && existingTiers[0]) {
        // Keep the first tier and update it
        const primaryTier = existingTiers[0];
        const duplicates = existingTiers.slice(1);
        await prisma.mealCoverageTier.update({
          where: { id: primaryTier.id },
          data: {
            titleFa: tier.titleFa,
            badgeFa: tier.badgeFa,
            includedMealTypes: tier.includedMealTypes,
            calorieSharePercent: tier.calorieSharePercent,
            daysCount: tier.daysCount,
            basePriceToman: tier.basePriceToman,
            dailyDisplayPrice: tier.dailyDisplayPrice,
            isDecoyOption: tier.isDecoyOption,
            isActive: true,
          },
        });

        // Safely remove any duplicate tiers that have no subscriptions
        for (const dup of duplicates) {
          const subCount = await prisma.subscription.count({
            where: { coverageTierId: dup.id },
          });
          if (subCount === 0) {
            await prisma.mealCoverageTier.delete({ where: { id: dup.id } });
          }
        }
      } else {
        await prisma.mealCoverageTier.create({
          data: {
            programTemplateId: program.id,
            tierType: tier.tierType,
            titleFa: tier.titleFa,
            badgeFa: tier.badgeFa,
            includedMealTypes: tier.includedMealTypes,
            calorieSharePercent: tier.calorieSharePercent,
            daysCount: tier.daysCount,
            basePriceToman: tier.basePriceToman,
            dailyDisplayPrice: tier.dailyDisplayPrice,
            isDecoyOption: tier.isDecoyOption,
            isActive: true,
          },
        });
      }
    }
  }
  console.log("✅ Program Templates & Coverage Tiers seeded");

  // 7. Core Meals & Modular Variants (14-day rotational dishes)
  const sampleMeals = [
    {
      slug: "lemon-herb-grilled-chicken-brown-rice",
      titleFa: "چلو جوجه کباب لیمویی با برنج قهوه‌ای و سبزیجات بخارپز",
      descriptionFa: "سینه مرغ مزه‌دار شده با زعفران قائنات، آبلیموی تازه جهرم، روغن زیتون فرابکر به همراه برنج قهوه‌ای کته و بروکلی بخارپز",
      mealType: MealType.LUNCH,
      ingredientsFa: ["سینه مرغ", "برنج قهوه‌ای", "زعفران", "روغن زیتون", "کلم بروکلی", "هویج"],
      allergens: [],
      dietTags: ["HIGH_PROTEIN", "LOW_FAT", "GLUTEN_FREE"],
      variants: [
        { calorieTierKcal: 1200, servingKcal: 420, proteinGrams: 38, carbsGrams: 45, fatGrams: 8, bomCostToman: BigInt(65000) },
        { calorieTierKcal: 1500, servingKcal: 520, proteinGrams: 46, carbsGrams: 58, fatGrams: 10, bomCostToman: BigInt(78000) },
        { calorieTierKcal: 1800, servingKcal: 620, proteinGrams: 54, carbsGrams: 70, fatGrams: 12, bomCostToman: BigInt(92000) },
        { calorieTierKcal: 2200, servingKcal: 750, proteinGrams: 62, carbsGrams: 85, fatGrams: 15, bomCostToman: BigInt(110000) },
        { calorieTierKcal: 2500, servingKcal: 850, proteinGrams: 70, carbsGrams: 98, fatGrams: 18, bomCostToman: BigInt(125000) },
      ],
    },
    {
      slug: "turkey-steak-pumpkin-puree",
      titleFa: "استیک بوقلمون گریل با پوره کدو حلوایی و سالاد اسفناج",
      descriptionFa: "فیله بوقلمون با رزماری تازه و سیر، پوره کدو حلوایی ارگانیک با دارچین و اسفناج تازه با سس لیمو و کنجد",
      mealType: MealType.LUNCH,
      ingredientsFa: ["فیله بوقلمون", "کدو حلوایی", "اسفناج تازه", "کنجد", "روغن کنجد", "سیر"],
      allergens: ["SESAME"],
      dietTags: ["HIGH_PROTEIN", "KETO_FRIENDLY", "LOW_CARB"],
      variants: [
        { calorieTierKcal: 1200, servingKcal: 400, proteinGrams: 42, carbsGrams: 28, fatGrams: 12, bomCostToman: BigInt(72000) },
        { calorieTierKcal: 1500, servingKcal: 500, proteinGrams: 50, carbsGrams: 35, fatGrams: 14, bomCostToman: BigInt(85000) },
        { calorieTierKcal: 1800, servingKcal: 610, proteinGrams: 58, carbsGrams: 44, fatGrams: 18, bomCostToman: BigInt(99000) },
        { calorieTierKcal: 2200, servingKcal: 730, proteinGrams: 66, carbsGrams: 55, fatGrams: 22, bomCostToman: BigInt(118000) },
        { calorieTierKcal: 2500, servingKcal: 840, proteinGrams: 75, carbsGrams: 65, fatGrams: 26, bomCostToman: BigInt(134000) },
      ],
    },
    {
      slug: "baked-trout-quinoa-bowl",
      titleFa: "ماهی قزل‌آلا تنوری با کینوا ارگانیک و سالاد مارچوبه",
      descriptionFa: "فیله ماهی قزل‌آلای تازه با سبزیجات معطر، کینوای سه رنگ پرک و مارچوبه گریل با روغن زیتون و سس نارنج",
      mealType: MealType.DINNER,
      ingredientsFa: ["ماهی قزل‌آلا", "کینوا ارگانیک", "مارچوبه", "آب نارنج", "روغن زیتون"],
      allergens: ["FISH"],
      dietTags: ["OMEGA_3", "HIGH_PROTEIN", "GLUTEN_FREE"],
      variants: [
        { calorieTierKcal: 1200, servingKcal: 380, proteinGrams: 35, carbsGrams: 32, fatGrams: 11, bomCostToman: BigInt(85000) },
        { calorieTierKcal: 1500, servingKcal: 470, proteinGrams: 42, carbsGrams: 40, fatGrams: 14, bomCostToman: BigInt(98000) },
        { calorieTierKcal: 1800, servingKcal: 560, proteinGrams: 50, carbsGrams: 48, fatGrams: 17, bomCostToman: BigInt(112000) },
        { calorieTierKcal: 2200, servingKcal: 680, proteinGrams: 58, carbsGrams: 60, fatGrams: 21, bomCostToman: BigInt(130000) },
        { calorieTierKcal: 2500, servingKcal: 780, proteinGrams: 66, carbsGrams: 70, fatGrams: 25, bomCostToman: BigInt(148000) },
      ],
    },
    {
      slug: "grilled-tofu-teriyaki-salad",
      titleFa: "کاسه سالاد توفو گریل با قارچ، کلم بنفش و سس تاهینی",
      descriptionFa: "توفو ارگانیک گریل شده با سس تریاکی خانگی بدون شکر، قارچ بلنچ، جوانه ماش و دانه کینوا با سس ارده و لیمو",
      mealType: MealType.DINNER,
      ingredientsFa: ["توفو ارگانیک", "قارچ", "کلم بنفش", "جوانه ماش", "سس ارده", "کنجد"],
      allergens: ["SOY", "SESAME"],
      dietTags: ["VEGAN", "HIGH_FIBER", "PLANT_BASED"],
      variants: [
        { calorieTierKcal: 1200, servingKcal: 360, proteinGrams: 24, carbsGrams: 34, fatGrams: 13, bomCostToman: BigInt(55000) },
        { calorieTierKcal: 1500, servingKcal: 450, proteinGrams: 30, carbsGrams: 42, fatGrams: 16, bomCostToman: BigInt(68000) },
        { calorieTierKcal: 1800, servingKcal: 540, proteinGrams: 36, carbsGrams: 50, fatGrams: 20, bomCostToman: BigInt(80000) },
        { calorieTierKcal: 2200, servingKcal: 650, proteinGrams: 44, carbsGrams: 62, fatGrams: 24, bomCostToman: BigInt(95000) },
        { calorieTierKcal: 2500, servingKcal: 750, proteinGrams: 50, carbsGrams: 72, fatGrams: 28, bomCostToman: BigInt(110000) },
      ],
    },
  ];

  const createdMeals = [];
  for (const m of sampleMeals) {
    const meal = await prisma.meal.upsert({
      where: { slug: m.slug },
      update: {},
      create: {
        slug: m.slug,
        titleFa: m.titleFa,
        descriptionFa: m.descriptionFa,
        mealType: m.mealType,
        status: DishLifecycleStatus.ACTIVE,
        ingredientsFa: m.ingredientsFa,
        allergens: m.allergens,
        dietTags: m.dietTags,
        heatingGuideFa: "در مایکروویو به مدت ۲ دقیقه با درب نیمه‌باز گرم شود.",
      },
    });

    for (const v of m.variants) {
      await prisma.mealVariant.upsert({
        where: { mealId_calorieTierKcal: { mealId: meal.id, calorieTierKcal: v.calorieTierKcal } },
        update: {},
        create: {
          mealId: meal.id,
          calorieTierKcal: v.calorieTierKcal,
          servingKcal: v.servingKcal,
          proteinGrams: v.proteinGrams,
          carbsGrams: v.carbsGrams,
          fatGrams: v.fatGrams,
          bomCostToman: v.bomCostToman,
        },
      });
    }
    createdMeals.push(meal);
  }
  console.log(`✅ ${createdMeals.length} Core Meals & Calorie Variants seeded`);

  // 8. 14-Day Modular Rotational Menu
  if (createdMeals.length >= 4) {
    for (let day = 1; day <= 14; day++) {
      // Rotate between dishes
      const optionA = day % 2 === 1 ? createdMeals[0]! : createdMeals[1]!;
      const optionB = day % 2 === 1 ? createdMeals[1]! : createdMeals[0]!;

      await prisma.rotationalMenuDay.upsert({
        where: { cycleDayIndex_mealType: { cycleDayIndex: day, mealType: MealType.LUNCH } },
        update: {},
        create: {
          cycleDayIndex: day,
          mealType: MealType.LUNCH,
          optionAMealId: optionA.id,
          optionBMealId: optionB.id,
          isActive: true,
        },
      });

      const optionADinner = day % 2 === 1 ? createdMeals[2]! : createdMeals[3]!;
      const optionBDinner = day % 2 === 1 ? createdMeals[3]! : createdMeals[2]!;

      await prisma.rotationalMenuDay.upsert({
        where: { cycleDayIndex_mealType: { cycleDayIndex: day, mealType: MealType.DINNER } },
        update: {},
        create: {
          cycleDayIndex: day,
          mealType: MealType.DINNER,
          optionAMealId: optionADinner.id,
          optionBMealId: optionBDinner.id,
          isActive: true,
        },
      });
    }
    console.log("✅ 14-Day Rotational Menu Days seeded (Option A & Option B)");
  }

  // 9. Health Boutique Cafe Menu Items (Module F)
  const cafeItems = [
    {
      slug: "avocado-poached-egg-toast",
      categoryFa: "صبحانه و برانچ سلامت",
      titleFa: "تست آووکادو با تخم‌مرغ پوچد و نان چاودار",
      descriptionFa: "نان چاودار تخمیر طبیعی، پوره آووکادوی تازه، تخم‌مرغ محلی پوچد، دانه چیا و گوجه گیلاسی",
      priceToman: BigInt(185000),
      caloriesKcal: 380,
      proteinGrams: 18,
      carbsGrams: 28,
      fatGrams: 21,
      allergens: ["EGG", "GLUTEN"],
      sortOrder: 1,
    },
    {
      slug: "quinoa-halloumi-super-salad",
      categoryFa: "سالادهای تخصصی و سوپرفود",
      titleFa: "سالاد کینوا با پنیر هالومی گریل و بادام هندی",
      descriptionFa: "کینوای سه‌رنگ، پنیر هالومی کبابی کم‌نمک، بیبی اسفناج، بادام هندی تست‌شده و سس بالزامیک انار",
      priceToman: BigInt(265000),
      caloriesKcal: 440,
      proteinGrams: 22,
      carbsGrams: 36,
      fatGrams: 24,
      allergens: ["DAIRY", "NUTS"],
      sortOrder: 2,
    },
    {
      slug: "green-detox-smoothie",
      categoryFa: "نوشیدنی‌های سم‌زدا و دتاکس",
      titleFa: "اسموتی دتاکس سوپرگرین",
      descriptionFa: "اسفناج تازه، سیب سبز، خیار بوته‌ای، زنجبیل تازه، کرفس و لیمو شیرازی بدون شکر افزوده",
      priceToman: BigInt(95000),
      caloriesKcal: 110,
      proteinGrams: 3,
      carbsGrams: 24,
      fatGrams: 1,
      allergens: ["CELERY"],
      sortOrder: 3,
    },
    {
      slug: "cold-brew-hessekhub",
      categoryFa: "نوشیدنی‌های بر پایه قهوه",
      titleFa: "کلدبرو تخصصی حس خوب (عصاره‌گیری سرد ۱۸ ساعته)",
      descriptionFa: "دانه ۱۰۰٪ عربیکا تخصصی اتیوپی، نت‌های گلی و میوه‌ای، صفر کالری، اسیدیته ملایم و انرژی پایدار",
      priceToman: BigInt(110000),
      caloriesKcal: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      allergens: [],
      sortOrder: 4,
    },
  ];

  for (const item of cafeItems) {
    await prisma.cafeMenuItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }
  console.log(`✅ ${cafeItems.length} Health Boutique Cafe items seeded`);

  // 10. CMS Homepage with Blocks & FAQ (Module G)
  const homeSeoData = {
    metaTitleFa: "حس خوب | پلتفرم سبک زندگی سالم و کافه‌بوتیک سلامت مشهد",
    metaDescriptionFa: "ارسال روزانه پکیج‌های غذای رژیمی تازه در مشهد تحت نظارت مستقیم متخصص تغذیه و کافه‌بوتیک سلامت در مشهد (بلوار هاشمیه). محاسبه رایگان کالری، منوی چرخشی و فعال‌سازی آنی اشتراک.",
    directAnswerCapsuleFa: "حس خوب پلتفرم پیشرو سبک زندگی سالم و غذای رژیمی در مشهد است که از سال ۱۳۹۷ فعالیت می‌کند. کاربران می‌توانند با محاسبه کالری BMR/TDEE، برنامه غذایی شخصی‌سازی‌شده دریافت کرده و غذاهای ارگانیک و تازه را با منوی چرخشی ۱۴ روزه روزانه درب منزل یا محل کار خود در مشهد تحویل بگیرند یا در کافه‌بوتیک سلامت تجربه کنند.",
    llmFactSummaryMd: "حس خوب (Hessekhub) اولین پلتفرم یکپارچه سلامت در مشهد تحت نظارت مستقیم متخصصین تغذیه و رژیم‌درمانی است. ویژگی‌ها: تحویل روزانه پکیج‌های رژیمی، کافه‌بوتیک سلامت (ساعت ۸ الی ۲۴)، سیستم تنظیم‌گر تطبیقی چندمتغیره برای چک‌این جمعه و محاسبه دقیق کالری و ماکروها.",
  };

  const existingHome = await prisma.cmsPage.findUnique({
    where: { slug: "/" },
    include: { seoMeta: true },
  });

  let homeSeoId = existingHome?.seoMetaId;
  if (homeSeoId) {
    await prisma.seoGeoMeta.update({
      where: { id: homeSeoId },
      data: homeSeoData,
    });
  } else {
    const homeSeo = await prisma.seoGeoMeta.create({
      data: homeSeoData,
    });
    homeSeoId = homeSeo.id;
  }

  const homePage = await prisma.cmsPage.upsert({
    where: { slug: "/" },
    update: {
      titleFa: "صفحه اصلی پلتفرم حس خوب",
      status: PagePublishStatus.PUBLISHED,
      seoMetaId: homeSeoId,
    },
    create: {
      slug: "/",
      titleFa: "صفحه اصلی پلتفرم حس خوب",
      status: PagePublishStatus.PUBLISHED,
      seoMetaId: homeSeoId,
    },
  });

  // Clean existing sections & FAQs to prevent duplicate blocks on re-seed
  await prisma.cmsSectionBlock.deleteMany({
    where: { pageId: homePage.id },
  });
  await prisma.faqItem.deleteMany({
    where: { pageId: homePage.id },
  });

  // Dynamic Section Blocks for Home Page
  const homeBlocks = [
    {
      blockType: "HERO_LEAF",
      orderIndex: 1,
      contentJson: {
        headlineFa: "سبک زندگی سالم، بدون زحمت آشپزی در مشهد",
        subheadlineFa: "غذاهای رژیمی لذیذ، محاسبه دقیق کالری و ماکروها با نظارت کارشناس تغذیه، روزانه درب منزل یا محل کار شما",
        primaryCtaTitleFa: "محاسبه کالری و شروع برنامه",
        primaryCtaUrl: "/tools/calorie-calculator",
        secondaryCtaTitleFa: "مشاهده منوی کافه‌بوتیک",
        secondaryCtaUrl: "/cafe/menu",
        badgeFa: "فعالیت مستمر و تخصصی از ۱۳۹۷ در مشهد",
        glyphId: "brand-hourglass",
      },
    },
    {
      blockType: "VALUE_GRID",
      orderIndex: 2,
      contentJson: {
        sectionTitleFa: "چرا ساکنین مشهد حس خوب را انتخاب می‌کنند؟",
        sectionSubtitleFa: "ترکیب دانش علمی تغذیه، کیفیت بی‌نظیر مواد اولیه و تجربه حسی فوق‌العاده",
        items: [
          { glyphId: "plate", titleFa: "منوی چرخشی ۱۴ روزه", descriptionFa: "هرگز از تکرار غذا خسته نمی‌شوید؛ روزانه ۲ گزینه متفاوت برای انتخاب دارید." },
          { glyphId: "leaf", titleFa: "مواد اولیه ارگانیک و تازه", descriptionFa: "طبخ روزانه بدون روغن‌های ناسالم، سس‌های مایونز یا مواد نگهدارنده صنعتی." },
          { glyphId: "target", titleFa: "نظارت تخصصی کارشناس تغذیه", descriptionFa: "پایش هفتگی وزن و سایز دور شکم و تنظیم هوشمند کالری در هر مرحله." },
          { glyphId: "water-bottle", titleFa: "کافه‌بوتیک سلامت در مشهد", descriptionFa: "امکان تحویل حضوری پکیج بدون هزینه پیک و لذت چیت‌دی سالم جمعه‌ها." },
        ],
      },
    },
    {
      blockType: "PACKAGE_COMPARISON",
      orderIndex: 3,
      contentJson: {
        sectionTitleFa: "برنامه‌های نتیجه‌محور و پکیج‌های فعال",
        sectionSubtitleFa: "پکیج متناسب با هدف و برنامه روزانه خود را انتخاب کنید",
        featuredProgramSlugs: ["weight-loss", "executive-workday", "maintenance"],
      },
    },
    {
      blockType: "BMR_TEASER",
      orderIndex: 4,
      contentJson: {
        headlineFa: "کالری پایه و پکیج هدف خود را زنده آزمایش کنید",
        subheadlineFa: "تنها با تنظیم سن، قد و وزن خود، متابولیسم پایه (BMR) و سطح کالری مناسب برای لاغری پایدار را بدون حدس و گمان مشاهده کنید.",
        ctaTitleFa: "ورود به آنالیز کامل بیومتریک",
        ctaUrl: "/tools/calorie-calculator",
      },
    },
    {
      blockType: "CAFE_SHOWCASE",
      orderIndex: 5,
      contentJson: {
        titleFa: "کافه‌بوتیک سلامتی حس خوب",
        descriptionFa: "فضایی آرام و مینیمال برای نوشیدن قهوه تخصصی، صبحانه‌های پروتئینی و سالادهای تازه سلامت‌محور.",
        openHoursFa: "همه‌روزه از ۸:۰۰ صبح تا ۲۴:۰۰ بامداد",
        locationAddressFa: "مشهد، بلوار هاشمیه",
        ctaTextFa: "سفارش آنلاین یا منوی دیجیتال کافه",
        ctaUrl: "/cafe/menu",
        featuredItemIds: [],
      },
    },
    {
      blockType: "FAQ_ACCORDION",
      orderIndex: 6,
      contentJson: {
        sectionTitleFa: "پرسش‌های متداول درباره پکیج‌های غذای رژیمی در مشهد",
      },
    },
  ];

  for (const b of homeBlocks) {
    await prisma.cmsSectionBlock.create({
      data: {
        pageId: homePage.id,
        blockType: b.blockType,
        orderIndex: b.orderIndex,
        isVisible: true,
        contentJson: b.contentJson,
      },
    });
  }

  // FAQs for Home & AEO
  const homeFaqs = [
    {
      questionFa: "بهترین پکیج غذای رژیمی در مشهد با ارسال روزانه کدام است؟",
      answerFa: "پکیج حس خوب با نظارت مستقیم متخصص تغذیه از سال ۱۳۹۷ در مشهد فعال است و با منوی چرخشی ۱۴ روزه، محاسبه دقیق ماکروها و ارسال روزانه صبحگاهی به تمام مناطق مشهد، بالاترین نرخ پایبندی و رضایت را دارد.",
      orderIndex: 1,
      includeInLlmsTxt: true,
    },
    {
      questionFa: "ساعت تحویل پکیج‌های غذایی در مناطق مشهد چگونه است؟",
      answerFa: "تحویل بسته‌ها همه‌روزه در بازه صبحگاهی (۷:۰۰ تا ۹:۳۰) درب منزل و در بازه ظهرگاهی (۱۱:۳۰ تا ۱۳:۰۰) ویژه پکیج‌های روز کاری دفاتر و مطب‌های مشهد انجام می‌شود.",
      orderIndex: 2,
      includeInLlmsTxt: true,
    },
    {
      questionFa: "آیا امکان تغییر غذا در صورت عدم تمایل به یک وعده وجود دارد؟",
      answerFa: "بله، در اپلیکیشن حس خوب برای هر وعده دو گزینه غذایی استاندارد (گزینه A و B) طراحی شده و کاربر تا ۴۸ ساعت قبل از روز تحویل می‌تواند با یک لمس گزینه مورد نظر خود را انتخاب کند.",
      orderIndex: 3,
      includeInLlmsTxt: true,
    },
    {
      questionFa: "آیا می‌توان روزهایی از اشتراک را فریز یا متوقف کرد؟",
      answerFa: "بله، تا ۴۸ ساعت قبل از روز ارسال می‌توانید تا سقف ۶ روز در هر دوره ماهانه، روزهای سفر یا مهمانی خود را در پنل اپلیکیشن فریز کنید تا به انتهای اشتراک شما اضافه شود.",
      orderIndex: 4,
      includeInLlmsTxt: true,
    },
  ];

  for (const faq of homeFaqs) {
    await prisma.faqItem.create({
      data: {
        pageId: homePage.id,
        questionFa: faq.questionFa,
        answerFa: faq.answerFa,
        orderIndex: faq.orderIndex,
        includeInLlmsTxt: faq.includeInLlmsTxt,
      },
    });
  }
  console.log("✅ CMS Home Page, Dynamic Blocks & AEO FAQs seeded");

  console.log("🎉 All Seed Data successfully inserted into PostgreSQL!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
