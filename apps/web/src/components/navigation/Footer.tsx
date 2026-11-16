// apps/web/src/components/navigation/Footer.tsx
import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-canvas border-t border-border-subtle pt-12 pb-10 text-start text-xs text-muted transition-colors">
      <div className="max-w-container mx-auto px-4 md:px-8">
        {/* Apple-Style Footnotes & Medical/Delivery Disclosures */}
        <div className="space-y-2 pb-8 border-b border-border-subtle text-[11px] leading-relaxed text-faint">
          <p>
            ۱. پکیج‌های غذای رژیمی حس خوب تحت نظارت مستقیم و تأیید علمی کارشناس ارشد تغذیه و رژیم‌درمانی برنامه‌ریزی و با رعایت گرمی ماکروها طبخ می‌شوند.
          </p>
          <p>
            ۲. تحویل روزانه پکیج‌ها در نوبت صبحگاهی (ساعت ۶:۳۰ تا ۸:۳۰ صبح) و نوبت ناهار کاری (ساعت ۱۱:۰۰ تا ۱۲:۳۰ ظهر) در تمامی مناطق شهری مشهد (هاشمیه، سجاد، ملک‌آباد، احمدآباد، وکیل‌آباد، کوهسنگی، فرامرز و...) انجام می‌شود. تحویل حضوری در کافه‌بوتیک سلامت بدون هزینه ارسال امکان‌پذیر است.
          </p>
          <p>
            ۳. منوی پکیج‌ها به صورت چرخشی ۱۴ روزه طراحی شده تا از هرگونه یکنواختی و افت متابولیک جلوگیری شود. تمامی فرآورده‌ها روزانه با مواد اولیه تازه و بدون نگه‌دارنده صنعتی آماده می‌گردند.
          </p>
        </div>

        {/* Apple-Style 5-Column Directory Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-10">
          {/* Column 1: Diet Programs */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-bold text-xs text-strong tracking-normal mb-1">
              پکیج‌های غذایی و رژیمی
            </h3>
            <Link href="/programs/weight-loss" className="hover:text-primary transition-colors">
              پکیج لاغری و کاهش وزن
            </Link>
            <Link href="/programs/executive-workday" className="hover:text-primary transition-colors">
              پکیج روز کاری مدیران و پزشکان
            </Link>
            <Link href="/programs/maintenance" className="hover:text-primary transition-colors">
              برنامه تثبیت و سلامت عمومی
            </Link>
            <Link href="/programs" className="hover:text-primary transition-colors">
              مقایسه سطوح پوشش (۳ روزه، ۵ روزه، فول‌برد)
            </Link>
            <Link href="/start" className="hover:text-primary transition-colors font-medium text-primary">
              آغاز اشتراک اختصاصی ←
            </Link>
          </div>

          {/* Column 2: Boutique Cafe & Delivery */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-bold text-xs text-strong tracking-normal mb-1">
              کافه‌بوتیک سلامت
            </h3>
            <Link href="/cafe" className="hover:text-primary transition-colors">
              درباره کافه‌بوتیک
            </Link>
            <Link href="/cafe/menu" className="hover:text-primary transition-colors">
              منوی قهوه تخصصی و برانچ
            </Link>
            <Link href="/cafe/menu" className="hover:text-primary transition-colors">
              سالادبار و کاسه‌های پروتئینی
            </Link>
            <Link href="/cafe/checkout" className="hover:text-primary transition-colors">
              سفارش آنلاین و تحویل حضوری
            </Link>
            <Link href="/mashhad/diet-food-delivery" className="hover:text-primary transition-colors">
              مناطق ارسال در مشهد
            </Link>
          </div>

          {/* Column 3: Health Tools & Screening */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-bold text-xs text-strong tracking-normal mb-1">
              ابزارها و ارزیابی سلامت
            </h3>
            <Link href="/tools/calorie-calculator" className="hover:text-primary transition-colors">
              محاسبه‌گر کالری و BMR
            </Link>
            <Link href="/tools/calorie-calculator" className="hover:text-primary transition-colors">
              تخمین وزن ایده‌آل و TDEE
            </Link>
            <Link href="/programs" className="hover:text-primary transition-colors">
              جدول درصدهای درشت‌مغذی
            </Link>
            <Link href="/#faq" className="hover:text-primary transition-colors">
              پرسش‌های متداول مشترکین
            </Link>
          </div>

          {/* Column 4: Story & Standards */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-bold text-xs text-strong tracking-normal mb-1">
              درباره و ارزش‌های حس خوب
            </h3>
            <Link href="/about" className="hover:text-primary transition-colors">
              داستان حس خوب از ۱۳۹۷
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              نظارت مستقیم متخصص تغذیه
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              استانداردهای آشپزخانه صنعتی
            </Link>
            <Link href="/llms.txt" className="hover:text-primary transition-colors">
              نمایه شفاف هوش مصنوعی (llms.txt)
            </Link>
          </div>

          {/* Column 5: Contact & Location */}
          <div className="flex flex-col gap-2.5 col-span-2 md:col-span-1">
            <h3 className="font-bold text-xs text-strong tracking-normal mb-1">
              تماس و موقعیت مکانی
            </h3>
            <p className="leading-relaxed">
              مشهد، بلوار هاشمیه
            </p>
            <p>
              تلفن:{" "}
              <a href="tel:05137660000" dir="ltr" className="font-bold text-strong hover:text-primary font-sans">
                ۰۵۱-۳۷۶۶۰۰۰۰
              </a>
            </p>
            <div className="pt-2 text-[11px] text-faint flex flex-col gap-1">
              <span>کافه: همه‌روزه ۸:۰۰ تا ۲۴:۰۰</span>
              <span>پشتیبانی اشتراک‌ها: ۸:۰۰ تا ۲۰:۰۰</span>
            </div>
          </div>
        </div>

        {/* Apple-Style Global Divider */}
        <div className="pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-faint">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© ۱۳۹۷ – ۱۴۰۵ حس خوب (Hessekhub). تمامی حقوق مادی و معنوی محفوظ است.</p>
            <span className="hidden md:inline">•</span>
            <Link href="/about" className="hover:text-primary transition-colors">
              سیاست حفظ حریم خصوصی
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              شرایط استفاده و اشتراک
            </Link>
            <Link href="/mashhad/diet-food-delivery" className="hover:text-primary transition-colors">
              پوشش شهری مشهد
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/70" aria-hidden="true" />
            <span className="font-medium text-strong">مشهد، ایران</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
