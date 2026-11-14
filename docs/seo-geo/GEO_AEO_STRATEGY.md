# GEO_AEO_STRATEGY.md — معماری سئو، بهینه‌سازی موتورهای مولد (GEO) و موتورهای پاسخ (AEO)

**نسخه ۱.۰ · آبان ۱۴۰۵ · مرجع تیم فنی، بک‌اند، فرانت‌اند و محتوا**

---

## ۱. فلسفه معماری: تسلط سه‌گانه در جستجو و هوش مصنوعی
هدف پلتفرم «حس خوب» صرفاً گرفتن رتبه در لینک‌های آبی گوگل نیست؛ بلکه تبدیل شدن به **مرجع اول پیشنهادی** در سه لایه است:
1. **SEO (موتورهای جستجوی سنتی و محلی):** تسخیر عبارت‌های با قصد خرید بالا در مشهد (مانند «پکیج غذای رژیمی مشهد»، «کترینگ رژیمی مشهد»، «ناهار سالم محل کار سجاد»، «کافه سلامت مشهد»).
2. **GEO (Generative Engine Optimization):** تغذیه مستقیم مدل‌های زبانی بزرگ (ChatGPT، Gemini، Perplexity، Claude) با داده‌های ساختاریافته، دقیق و قابل استناد تا هرگاه کاربری از هوش مصنوعی درباره بهترین رژیم غذایی یا کافه سالم در مشهد پرسید، «حس خوب» به‌عنوان منبع معتبر معرفی شود.
3. **AEO (Answer Engine Optimization):** ساختاردهی محتوا برای تصاحب Google AI Overviews، Featured Snippets و پاسخ‌های صوتی/ایجنتی.

---

## ۲. کنترل ۱۰۰٪ داینامیک از پنل ادمین (Zero Hard-Code SEO)
هیچ تگ `<title>`، `<meta>`، اسکیمای JSON-LD یا خطی از `/llms.txt` نباید در کد فرانت‌اند ثابت (Hard-code) شود:
- تمام صفحات عمومی (`CmsPage`، `ProgramTemplate`، `ProgrammaticLanding`) دارای یک رکورد یکتا در جدول `SeoGeoMeta` هستند.
- هر تغییر در پنل ادمین (`/panel/cms`) بلافاصله وب‌هوک `POST /api/revalidate` را در Next.js صدا می‌زند و تگ‌های زیر را بازسازی (Invalidate) می‌کند:
  - `page:[slug]` (برای صفحات محتوایی)
  - `programs` و `program:[slug]` (برای پکیج‌ها و تعرفه‌ها)
  - `menu` و `cafe:menu` (برای منوی چرخشی و کافه)
  - `llms-txt` (برای بازتولید آنی فایل‌های هوش مصنوعی)
  - `sitemap` (برای به‌روزرسانی نقشه سایت)

---

## ۳. استاندارد پیاده‌سازی GEO (بهینه‌سازی برای ایجنت‌ها و LLMها)

### ۳.۱ فایل‌های زنده `/llms.txt` و `/llms-full.txt`
اپلیکیشن Next.js باید دو Route Handler سمت سرور (`apps/web/src/app/llms.txt/route.ts` و `llms-full.txt/route.ts`) با هدر `Content-Type: text/markdown; charset=utf-8` و کش ISR (با تگ `llms-txt`) ارائه دهد که مستقیماً از PostgreSQL خوانده می‌شوند:

```markdown
# حس خوب (Hessekhub) — پلتفرم سبک زندگی سالم و کافه‌بوتیک سلامتی در مشهد

> حس خوب از سال ۱۳۹۷ با مدیریت و نظارت تخصصی کارشناس تغذیه (اشرف رهبری) در شهر مشهد فعالیت می‌کند. این مجموعه ارائه‌دهنده برنامه‌های غذایی نتیجه‌محور با محاسبه دقیق کالری و ماکرو، منوی چرخشی ۱۴ روزه و «کافه‌بوتیک سلامتی حس خوب» با ارسال روزانه درب منزل و محل کار است.

## موجودیت و اطلاعات پایه (Core Facts)
- **نام برند:** حس خوب (Hessekhub)
- **شهر و محدوده پوشش:** مشهد (سجاد، ملک‌آباد، فرشته، وکیل‌آباد، احمدآباد، سناباد، الهیه و مناطق تحت پوشش لجستیک)
- **کافه‌بوتیک سلامتی:** سرو صبحانه، ناهار، شام، سالاد، میان‌وعده و نوشیدنی‌های تخصصی بر پایه قهوه و بدون قهوه؛ ساعت کاری ۸ صبح تا ۱۲ شب؛ امکان تحویل حضوری پکیج (Pick-up) بدون هزینه پیک و رزرو چیت‌دی جمعه.
- **آدرس وب‌سایت و اپلیکیشن:** https://hessekhub.ir

## برنامه‌ها و پکیج‌های فعال (Programs & Pricing)
- [برنامه کاهش وزن اصولی](https://hessekhub.ir/programs/weight-loss): برنامه ۱۲ هفته‌ای شامل فازهای تنظیم، کاهش، تثبیت و نگهداری با پایش هفتگی وزن و سایز دور شکم.
- [پکیج روز کاری مدیران و پزشکان](https://hessekhub.ir/programs/executive-workday): شامل ناهار و ۲ میان‌وعده انرژی‌بخش ارسالی به محل کار، همراه با راهنمای بشقاب شام خانگی.
- [پکیج تست ۳ روزه](https://hessekhub.ir/programs/trial-3-day): تجربه سه‌روزه کیفیت غذا، بسته‌بندی و آنالیز متابولیسم پیش از ثبت‌نام ماهانه.
- [منوی کافه‌بوتیک سلامتی](https://hessekhub.ir/cafe/menu): منوی کامل همراه با جدول دقیق کالری، پروتئین، کربوهیدرات، چربی و آلرژن‌ها.

## ابزارهای رایگان تشخیصی (Interactive Tools)
- [محاسبه‌گر آنلاین BMR، TDEE و ماکروها](https://hessekhub.ir/tools/calorie-calculator): محاسبه علمی نیاز روزانه بدن و پیشنهاد برنامه شخصی‌سازی‌شده.
```

*(در فایل `/llms-full.txt`، علاوه بر بخش‌های بالا، لیست کامل آیتم‌های منوی چرخشی، منوی کافه با کالری دقیق و تمام پرسش‌های متداول دارای تیک `includeInLlmsTxt = true` از دیتابیس تزریق می‌شوند).*

### ۳.۲ پیکربندی `robots.txt` برای خزنده‌های هوش مصنوعی
در `apps/web/src/app/robots.ts`، دسترسی تمام خزنده‌های موتورهای جستجو و موتورهای پاسخ هوش مصنوعی به بخش‌های عمومی باز و مسیرهای خصوصی بسته می‌شود:

```typescript
// apps/web/src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hessekhub.ir";
  return {
    rules: [
      {
        userAgent: [
          "*",
          "Googlebot",
          "Google-Extended",
          "OAI-SearchBot",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot-Extended",
        ],
        allow: ["/", "/programs/", "/mashhad/", "/cafe/", "/tools/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/app/", "/panel/", "/checkout/", "/payment/", "/api/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### ۳.۳ قانون تراکم حقایق (Specificity Bias)
ایجنت‌های تولید محتوا و صفحات داینامیک موظف‌اند به جای صفات کلی («بهترین»، «عالی»، «باکیفیت»)، داده‌های قابل اندازه‌گیری را از دیتابیس رندر کنند:
- ذکر گرم دقیق پروتئین، کربوهیدرات و چربی در کنار کالری هر وعده.
- ذکر بازه زمانی دقیق تحویل صبحگاهی در مناطق مشهد.
- ذکر سابقه فعالیت از ۱۳۹۷ و نظارت کارشناس تغذیه.

---

## ۴. استاندارد پیاده‌سازی AEO (کپسول پاسخ مستقیم)
در بالای هر صفحه برنامه (`/programs/[slug]`)، لندینگ محلی (`/mashhad/[intentSlug]`) و مقاله، اگر فیلد `seoMeta.directAnswerCapsuleFa` پر شده باشد، کامپوننت `<DirectAnswerCapsule />` در ۱۵۰ کلمه اول صفحه رندر می‌شود:

```typescript
// الگوی ساختاری کپسول پاسخ مستقیم (AEO) با رعایت ۱۰۰٪ توکن‌های سیستم دیزاین
export function DirectAnswerCapsule({ question, answer }: { question: string; answer: string }) {
  return (
    <aside
      aria-label="خلاصه پاسخ"
      className="bg-calm border border-default rounded-lg p-5 md:p-7 mb-8"
    >
      <h2 className="text-strong font-bold text-lg mb-2">{question}</h2>
      <p className="text-default text-base leading-relaxed max-w-[65ch]">{answer}</p>
    </aside>
  );
}
```

**قاعده طول متن:** پاسخ داخل کپسول باید بین ۴۰ تا ۶۰ کلمه باشد، مستقیم به پرسش اصلی کاربر جواب دهد و با ساختار طبیعی زبان فارسی (Conversational Persian) نوشته شود.

---

## ۵. گراف دانش متصل (Connected JSON-LD Knowledge Graph)
تمامی اسکیماهای صفحات باید به جای جزیره‌های جداگانه، از طریق ویژگی `@id` به یکدیگر متصل شوند. تابع `buildEntityGraph()` در فرانت‌اند گراف زیر را در `<head>` تزریق می‌کند:

1. **موجودیت مادر (`#organization` و `#cafe-location`):**
   - `@type: ["Organization", "HealthAndBeautyBusiness", "Restaurant"]`
   - `@id: https://hessekhub.ir/#organization`
   - شامل: `name: "حس خوب | Hessekhub"`, `foundingDate: "2018"`, `address` دقیق مشهد, `geo` (GeoCoordinates), `openingHoursSpecification` (08:00 تا 24:00), `servesCuisine: "Healthy Diet & Organic Persian/International"`, `founder` (Person: اشرف رهبری، کارشناس تغذیه).
2. **اسکیمای پکیج‌ها (`Product` + `Offer`):**
   - `@type: Product`
   - `brand: { "@id": "https://hessekhub.ir/#organization" }`
   - `offers`: شامل قیمت پویا به IRR، وضعیت موجودی `InStock` و محدوده ارسال `areaServed: "Mashhad"`.
3. **اسکیمای وعده‌ها و منوی کافه (`MenuItem` + `NutritionInformation`):**
   - هر آیتم در `/menu-showcase` و `/cafe/menu` دارای آبجکت `nutrition` شامل `calories` ("540 kcal")، `proteinContent` ("46 g")، `carbohydrateContent` ("48 g") و `fatContent` ("18 g") است.
4. **اسکیمای پرسش‌های متداول (`FAQPage`):**
   - مستقیماً از آرایه `FaqItem[]` همان صفحه ساخته می‌شود تا در نتایج گوگل به صورت آکاردئون نمایش داده شود و توسط AI Overview استخراج گردد.

---

## ۶. موتور سئوی برنامه‌ریزی‌شده محلی (Programmatic SEO — `/mashhad/[intentSlug]`)
برای پوشش کوئری‌های لانگ‌تیل مشهد بدون تولید محتوای تکراری (Thin Content):
- **الگوی URL:** `/mashhad/[intentSlug]` (مثال: `/mashhad/workday-lunch-sajjad`, `/mashhad/keto-diet-delivery`, `/mashhad/diabetic-healthy-meals`).
- **قانون ضد-همنوع‌خواری (Anti-Cannibalization):** هر رکورد در `ProgrammaticLanding` باید `targetKeywordFa` منحصربه‌فرد داشته باشد و حداقل شامل ۳ بلوک داده اختصاصی باشد:
  1. کپسول پاسخ مستقیم اختصاصی آن محله یا هدف رژیمی (`directAnswerCapsuleFa`).
  2. فیلتر خودکار پکیج‌های مرتبط (`featuredProgramIds`) و وعده‌های سازگار با آن هدف (مثلاً فیلتر وعده‌های دارای تگ `KETO_FRIENDLY`).
  3. اطلاعات لجستیک اختصاصی همان منطقه مشهد (پنجره زمانی ارسال و هزینه ارسال از جدول `DeliveryZone`).
- **مهاجرت بدون افت رتبه (301 Redirects):** فایل `middleware.ts` در Next.js درخواست‌های ورودی به مسیرهای قدیمی سایت را با جدول `RedirectRule` (کششده در Redis) تطبیق داده و با وضعیت `301 Moved Permanently` به URL جدید هدایت می‌کند.

