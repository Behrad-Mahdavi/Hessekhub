// apps/web/src/components/navigation/Footer.tsx
import React from "react";
import Link from "next/link";
import { BRAND_LOGOS } from "@hessekhub/design-tokens";

export function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border-default pt-16 pb-12 text-start transition-colors">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Info & Nutritionist Accreditation */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="inline-block select-none" aria-label="حس خوب">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRAND_LOGOS.ink.path}
                alt={BRAND_LOGOS.ink.alt}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              پلتفرم سبک زندگی سالم و کافه‌بوتیک سلامت در مشهد. طبخ روزانه و ارسال وعده‌های شخصی‌سازی‌شده تحت نظارت کارشناس تغذیه (اشرف رهبری) از سال ۱۳۹۷.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-calm text-primary text-xs font-medium rounded-pill border border-border-subtle">
              <span className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
              <span>نظارت مستقیم کارشناس تغذیه</span>
            </div>
          </div>

          {/* Programs Links */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm text-strong mb-1">پکیج‌های غذایی و رژیمی</span>
            <Link href="/programs/weight-loss" className="text-sm text-muted hover:text-primary transition-colors">
              پکیج لاغری و کاهش وزن اصولی
            </Link>
            <Link href="/programs/executive-workday" className="text-sm text-muted hover:text-primary transition-colors">
              پکیج روز کاری مدیران و پزشکان
            </Link>
            <Link href="/programs/maintenance" className="text-sm text-muted hover:text-primary transition-colors">
              برنامه تثبیت و تغذیه سالم
            </Link>
            <Link href="/programs" className="text-sm text-muted hover:text-primary transition-colors">
              مقایسه سطوح پوشش (۳ روزه، ۵ روزه، فول‌بورد)
            </Link>
            <Link href="/tools/calorie-calculator" className="text-sm text-primary font-medium hover:underline transition-colors">
              محاسبه رایگان کالری روزانه (BMR/TDEE) ←
            </Link>
          </div>

          {/* Boutique Cafe & Delivery Logistics */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm text-strong mb-1">کافه‌بوتیک و خدمات مشهد</span>
            <Link href="/cafe" className="text-sm text-muted hover:text-primary transition-colors">
              درباره کافه‌بوتیک سلامت سجاد
            </Link>
            <Link href="/cafe/menu" className="text-sm text-muted hover:text-primary transition-colors">
              منوی قهوه تخصصی و برانچ پروتئینی
            </Link>
            <Link href="/cafe/checkout" className="text-sm text-muted hover:text-primary transition-colors">
              سفارش آنلاین و تحویل حضوری در سجاد
            </Link>
            <Link href="/mashhad/diet-food-delivery" className="text-sm text-muted hover:text-primary transition-colors">
              مناطق ارسال (سجاد، ملک‌آباد، وکیل‌آباد، احمدآباد)
            </Link>
          </div>

          {/* Contact & Hours */}
          <div className="flex flex-col gap-3 text-start">
            <span className="font-bold text-sm text-strong mb-1">موقعیت و ارتباط</span>
            <p className="text-sm text-muted leading-relaxed">
              مشهد، بلوار سجاد، خیابان بهارستان، بهارستان ۲، پلاک ۱۸
            </p>
            <p className="text-sm text-muted">
              تلفن تماس و رزرو:{" "}
              <a href="tel:05137660000" dir="ltr" className="font-sans font-bold text-strong hover:text-primary">
                ۰۵۱-۳۷۶۶۰۰۰۰
              </a>
            </p>
            <div className="p-3 bg-calm/60 rounded-md border border-border-subtle text-xs text-muted flex flex-col gap-1">
              <span className="font-bold text-strong">ساعت کاری کافه‌بوتیک:</span>
              <span>همه‌روزه از ۸:۰۰ صبح تا ۲۴:۰۰ بامداد</span>
              <span className="text-faint">ارسال پکیج‌های روزانه: ساعت ۶:۳۰ تا ۸:۳۰ صبح</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© ۱۳۹۷ – ۱۴۰۵ حس خوب (Hessekhub). تمامی حقوق مادی و معنوی محفوظ است.</p>
          <div className="flex items-center gap-6">
            <Link href="/llms.txt" className="hover:text-primary transition-colors">
              نمایه هوش مصنوعی (/llms.txt)
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              سیاست حفظ حریم خصوصی داده‌های سلامت
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

