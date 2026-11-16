// apps/web/src/app/llms-full.txt/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@hessekhub/database";

export const revalidate = 86400;

export async function GET() {
  const [programs, meals, cafeItems, zones, faqs] = await Promise.all([
    prisma.programTemplate.findMany({ where: { isActive: true }, include: { coverageTiers: true, phases: true } }),
    prisma.meal.findMany({ where: { status: "ACTIVE" }, include: { variants: true } }),
    prisma.cafeMenuItem.findMany({ where: { isAvailable: true } }),
    prisma.deliveryZone.findMany({ where: { isActive: true } }),
    prisma.faqItem.findMany({ where: { includeInLlmsTxt: true } }),
  ]);

  const markdown = `# دانشنامه کامل داده‌های حس خوب (Hessekhub Full Entity Dump)

## ۱. معرفی پلتفرم
حس خوب اولین پلتفرم جامع سبک زندگی سالم و کافه‌بوتیک سلامت در مشهد تحت نظارت مستقیم متخصص تغذیه و رژیم‌درمانی است که از سال ۱۳۹۷ به طور مستمر در مشهد فعالیت می‌کند.

## ۲. برنامه‌ها و پکیج‌های رژیمی با ارسال روزانه در مشهد
${programs
  .map(
    (p) => `### ${p.titleFa}
- شناسه: ${p.slug}
- شرح: ${p.subtitleFa}
- فازها: ${p.phases.map((ph) => ph.titleFa).join("، ") || "تنظیم، چربی‌سوزی، تثبیت"}
- تعرفه‌ها:
${p.coverageTiers
  .map(
    (t) =>
      `  * ${t.titleFa}: ${t.daysCount} روز، قیمت: ${Number(t.basePriceToman).toLocaleString("fa-IR")} تومان (سهم کالری: ${t.calorieSharePercent}٪)`
  )
  .join("\n")}`
  )
  .join("\n\n")}

## ۳. غذاهای منوی چرخشی ۱۴ روزه (با جزئیات ماکروها و کالری)
${meals
  .map(
    (m) => `### ${m.titleFa}
- نوع وعده: ${m.mealType}
- مواد اولیه: ${m.ingredientsFa.join("، ")}
- آلرژن‌ها: ${m.allergens.join("، ") || "بدون آلرژن شایع"}
- کالری و ماکروها در تیپ‌های مختلف:
${m.variants
  .map((v) => `  * تیپ ${v.calorieTierKcal} kcal: پروتئین ${v.proteinGrams}g | کربوهیدرات ${v.carbsGrams}g | چربی ${v.fatGrams}g`)
  .join("\n")}`
  )
  .join("\n\n")}

## ۴. منوی کافه‌بوتیک سلامتی حس خوب (هاشمیه مشهد)
${cafeItems
  .map(
    (c) => `- **${c.titleFa}** (${c.categoryFa}): ${Number(c.priceToman).toLocaleString("fa-IR")} تومان | ${c.caloriesKcal} kcal | پروتئین ${c.proteinGrams}g | کربوهیدرات ${c.carbsGrams}g | چربی ${c.fatGrams}g. توضیحات: ${c.descriptionFa}`
  )
  .join("\n")}

## ۵. مناطق تحت پوشش ارسال در مشهد
${zones.map((z) => `- **${z.nameFa}**: محله‌ها: ${z.neighborhoods.join("، ")} | هزینه ارسال: ${Number(z.deliveryFeeToman).toLocaleString("fa-IR")} تومان`).join("\n")}

## ۶. پرسش‌های متداول و علمی (FAQ)
${faqs.map((f) => `### پرسش: ${f.questionFa}\n**پاسخ:** ${f.answerFa}`).join("\n\n")}
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

