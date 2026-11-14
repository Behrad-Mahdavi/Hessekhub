# Hessekhub (حس خوب) — Premier Healthy Lifestyle Platform & Health Boutique Cafe

> **مشهد، از سال ۱۳۹۷** · پلتفرم یکپارچه پکیج‌های غذای رژیمی تازه، محاسبه هوشمند کالری، منوی چرخشی ۱۴ روزه و کافه‌بوتیک سلامت سجاد مشهد.

---

## 🏛️ ساختار معماری مخزن (Monorepo Architecture)

پروژه با استاندارد مدرن **pnpm Workspaces** و **Turborepo** طراحی شده و تفکیک کامل لایه‌ها در قالب اپلیکیشن‌ها و پکیج‌های مشترک تضمین شده است:

```text
hessekhub-platform/
├── apps/
│   ├── web/                         # اپلیکیشن فرانت‌اند (Next.js 14 App Router)
│   │   ├── public/                  # دارایی‌های استاتیک، لوگوها، گلیف‌ها و فونت‌ها
│   │   └── src/
│   │       ├── app/
│   │       │   ├── (public)/        # صفحات اصلی مارکتینگ و دیسکاوری (SSR/ISR)
│   │       │   ├── (funnel)/        # قیف ثبت‌نام، ماشین‌حساب، شخصی‌سازی و پرداخت
│   │       │   └── api/             # وب‌هوک‌های بازاعتبارسنجی (Revalidation) و llms.txt
│   │       ├── components/          # کامپوننت‌های بلاک CMS، ناوبری و سئو
│   │       └── lib/                 # کلاینت ارتباط با API و ابزارهای مشترک
│   └── api/                         # هسته بک‌اند (NestJS Modular Monolith)
│       └── src/
│           ├── common/              # گاردها، رول‌ها، اینترسپتورها، ردیس و دکوراتورها
│           └── modules/             # ماژول‌های دامنه‌ای (Auth, CMS, Cafe, Finance, Logistics, Nutrition, Onboarding)
│
├── packages/
│   ├── database/                    # اسکیمای Prisma، مایگریشن‌ها و داده‌های سید مشهد
│   ├── design-tokens/               # توکن‌های CSS، پریست Tailwind، مانیفست دارایی‌ها
│   ├── shared-types/                # اسکیمای Zod، قراردادهای تایپ‌اسکریپت و DTOها
│   └── ui/                          # کیت کامپوننت‌های رابط کاربری مشترک (RTL Token-driven)
│
├── docs/
│   ├── architecture/                # نقشه معماری سیستم، توپولوژی URLها و پایگاه داده
│   ├── specs/                       # اسناد نیازمندی‌ها (PRD)، دیزاین سیستم و موتور تغذیه
│   ├── seo-geo/                     # استراتژی بهینه‌سازی برای هوش مصنوعی (GEO/AEO) و اسکیماها
│   ├── design/                      # فایل‌های خروجی طراحی فیگما / فیگ‌کرفت
│   └── brand-archive/               # آرشیو هویت بصری، برندبوک و گلیف‌های پایه
│
├── .cursorrules                     # قوانین راهنمای توسعه هوشمند
├── AGENTS.md                        # قانون اساسی و خطوط قرمز ایجنت‌های هوش مصنوعی
├── docker-compose.yml               # پیکربندی سرویس‌های زیرساختی (PostgreSQL, Redis, MinIO)
├── package.json                     # اسکریپت‌های ریشه مونو‌ریپو
├── pnpm-workspace.yaml              # تنظیمات ورک‌اسپیس pnpm
├── tsconfig.base.json               # تنظیمات مشترک TypeScript
└── turbo.json                       # خط لوله کش و بیلد Turborepo
```

---

## 🚀 راه‌اندازی و توسعه سریع (Getting Started)

### پیش‌نیازها
- **Node.js:** `>= 20.11.0`
- **pnpm:** `>= 9.12.0`
- **Docker & Docker Compose** (برای PostgreSQL، Redis و MinIO)

### ۱. اجرای زیرساخت با داکر
```bash
docker compose up -d
```
سرویس‌های زیر در دسترس خواهند بود:
- **PostgreSQL:** `localhost:5432` (دیتابیس: `hessekhub`)
- **Redis:** `localhost:6379`
- **MinIO Storage:** `localhost:9000` (کنسول وب: `localhost:9001`)

### ۲. نصب وابستگی‌ها
```bash
pnpm install
```

### ۳. آماده‌سازی دیتابیس و داده‌های اولیه
```bash
pnpm db:generate   # تولید کلاینت پریزما
pnpm db:push       # همگام‌سازی اسکیما با دیتابیس
pnpm db:seed       # بارگذاری داده‌های واقعی مشهد، شعب، پکیج‌ها و محتوای CMS
```

### ۴. اجرای سرویس‌ها در حالت توسعه
```bash
pnpm dev
```
- **وب‌سایت و استورفرانت (Next.js):** [http://localhost:3000](http://localhost:3000)
- **سرویس‌های بک‌اند (NestJS API):** [http://localhost:4000](http://localhost:4000)

---

## 🧪 دستورات تست و اعتبارسنجی کیفیت

```bash
pnpm typecheck   # بررسی سلامت تایپ‌های TypeScript در تمام پکیج‌ها
pnpm lint        # بررسی خطاهای ساختاری و استاندارد کد
pnpm build       # تست بیلد نهایی تمام سرویس‌ها
```

---

## 🎨 اصول سیستم دیزاین ۲.۰ (Design System Discipline)

1. **فقط لایت مود (Pure Light Mode):** پلتفرم حس خوب منحصراً بر پایه پالت گرم و لوکس نوری (`bg-canvas`، `bg-surface`، `text-strong`) توسعه داده شده و هیچ کلاس یا متغیر دارک‌مود ندارد.
2. **استایل‌های معنایی ۱۰۰٪ (Zero Hardcoding):** استفاده از کدهای رنگ هگز و پدینگ‌های دلخواه ممنوع است؛ تمام استایل‌ها از توکن‌های `--hk-*` و کلاس‌های معنایی `tailwind.preset.js` تغذیه می‌شوند.
3. **پشتیبانی سخت‌گیرانه از RTL و ویژگی‌های منطقی (CSS Logical Properties):** استفاده از `ms-*`، `me-*`، `ps-*`، `pe-*` و پرهیز از کلاس‌های فیزیکی (`left`/`right`/`ml`/`mr`).
4. **تایپوگرافی استاندارد:** فونت فارسی و اعداد ۱۰۰٪ بر پایه `IRANSansFaNum` با ارقام فارسی.

---

## 📄 راهنمای اسناد کلیدی
- [AGENTS.md](file:///Users/behrad/Desktop/Hessekhub/ui/website/AGENTS.md): منشور و قوانین خط قرمز توسعه هوشمند.
- [docs/architecture/project-online-map.md](file:///Users/behrad/Desktop/Hessekhub/ui/website/docs/architecture/project-online-map.md): نقشه کامل ساختار و مسیرهای پلتفرم.
- [docs/specs/DESIGN_SYSTEM.md](file:///Users/behrad/Desktop/Hessekhub/ui/website/docs/specs/DESIGN_SYSTEM.md): مشخصات جامع توکن‌ها و راهنمای سیستم طراحی.
- [docs/specs/PRD.md](file:///Users/behrad/Desktop/Hessekhub/ui/website/docs/specs/PRD.md): سند نیازمندی‌های محصول و ماژول‌های A تا L.
- [docs/specs/NUTRITION_ENGINE.md](file:///Users/behrad/Desktop/Hessekhub/ui/website/docs/specs/NUTRITION_ENGINE.md): فرمول‌های علمی BMR/TDEE و موتور تنظیم‌گر متابولیک.
