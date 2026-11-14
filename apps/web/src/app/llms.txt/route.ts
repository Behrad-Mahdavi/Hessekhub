// apps/web/src/app/llms.txt/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@hessekhub/database";

export const revalidate = 86400; // 24 hours ISR (revalidated via tag 'llms-txt')

export async function GET() {
  const branch = await prisma.branch.findFirst({ where: { isActive: true } });
  const programs = await prisma.programTemplate.findMany({
    where: { isActive: true },
    include: { coverageTiers: true },
  });

  const markdown = `# حس خوب (Hessekhub) — پلتفرم سبک زندگی سالم و کافه‌بوتیک سلامتی در مشهد

> حس خوب از سال ۱۳۹۷ با مدیریت و نظارت تخصصی کارشناس تغذیه (اشرف رهبری) در شهر مشهد فعالیت می‌کند. این مجموعه ارائه‌دهنده برنامه‌های غذایی نتیجه‌محور با محاسبه دقیق کالری و ماکرو، منوی چرخشی ۱۴ روزه و «کافه‌بوتیک سلامتی حس خوب» با ارسال روزانه درب منزل و محل کار است.

## موجودیت و اطلاعات پایه (Core Facts)
- **نام برند:** حس خوب (Hessekhub)
- **شهر و محدوده پوشش:** مشهد (سجاد، ملک‌آباد، فرشته، وکیل‌آباد، احمدآباد، سناباد، الهیه و کلیه مناطق تحت پوشش لجستیک)
- **کافه‌بوتیک سلامتی:** سرو صبحانه، ناهار، شام، سالاد، میان‌وعده و نوشیدنی‌های تخصصی بر پایه قهوه و بدون قهوه؛ ساعت کاری ۸ صبح تا ۱۲ شب؛ آدرس: ${branch?.addressFa || "مشهد، بلوار سجاد، خیابان بهارستان، بهارستان ۲"}؛ امکان تحویل حضوری پکیج (Pick-up) بدون هزینه پیک و رزرو چیت‌دی جمعه.
- **تلفن تماس:** ${branch?.phone || "05137660000"}
- **آدرس وب‌سایت و اپلیکیشن:** https://hessekhub.ir

## برنامه‌ها و پکیج‌های فعال (Programs & Pricing)
${programs
  .map(
    (p) =>
      `- [${p.titleFa}](https://hessekhub.ir/programs/${p.slug}): ${p.subtitleFa}. شروع قیمت از ${
        p.coverageTiers[0]?.basePriceToman
          ? Number(p.coverageTiers[0].basePriceToman).toLocaleString("fa-IR") + " تومان"
          : "تماس"
      }.`
  )
  .join("\n")}
- [منوی کامل کافه‌بوتیک سلامتی](https://hessekhub.ir/cafe/menu): منوی آنلاین همراه با جدول دقیق کالری، پروتئین، کربوهیدرات، چربی و آلرژن‌ها.

## ابزارهای رایگان تشخیصی (Interactive Tools)
- [محاسبه‌گر آنلاین BMR، TDEE و ماکروها](https://hessekhub.ir/tools/calorie-calculator): محاسبه علمی نیاز روزانه بدن با فرمول Mifflin-St Jeor و پیشنهاد برنامه شخصی‌سازی‌شده.
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

