// apps/web/src/components/navigation/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_LOGOS } from "@hessekhub/design-tokens";
import { Button } from "@hessekhub/ui";

const NAV_LINKS = [
  { href: "/programs", label: "برنامه‌های غذایی" },
  { href: "/cafe/menu", label: "کافه‌بوتیک سلامت" },
  { href: "/tools/calorie-calculator", label: "محاسبه‌گر کالری" },
  { href: "/about", label: "داستان حس خوب" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Luxury Minimalist Editorial Ticker */}
      <div className="w-full bg-calm/70 border-b border-border-subtle/80 py-1.5 px-4 text-center text-[11px] font-medium text-muted flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-primary font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          کافه‌بوتیک باز است (۸:۰۰ تا ۲۴:۰۰)
        </span>
        <span className="hidden sm:inline text-border-default">•</span>
        <span className="hidden sm:inline">تحویل اختصاصی روزانه در تمام مناطق مشهد با نظارت کارشناس تغذیه</span>
      </div>

      <header className="sticky top-0 z-sticky w-full bg-surface/85 backdrop-blur-xl border-b border-border-default/70 shadow-[0_8px_30px_rgba(16,15,13,0.04)] transition-all">
        <div className="max-w-container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 select-none transition-transform duration-fast hover:scale-[1.02] active:scale-[0.98]"
              aria-label="صفحه اصلی حس خوب"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRAND_LOGOS.ink.path}
                alt={BRAND_LOGOS.ink.alt}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 transition-all duration-fast ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-strong hover:text-primary"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-pill transition-all"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:05137660000"
              className="hidden xl:inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-primary px-3 py-2 rounded-md hover:bg-surface-hover transition-colors"
              dir="ltr"
            >
              <span>۰۵۱-۳۷۶۶۰۰۰۰</span>
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>

            <Link href="/tools/calorie-calculator">
              <Button variant="primary" size="md" className="shadow-elevation-1 hover:shadow-elevation-2 transition-all">
                محاسبه کالری و ثبت‌نام
              </Button>
            </Link>
          </div>

        {/* Mobile Hamburger Toggle & Quick CTA */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/start">
            <Button variant="primary" size="sm">
              شروع برنامه
            </Button>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-strong hover:bg-surface-hover rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-default bg-surface px-6 py-6 flex flex-col gap-4 text-start animate-in slide-in-from-top duration-fast shadow-elevation-2">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <span className="text-xs font-medium text-muted">کافه‌بوتیک و کترینگ سلامت حس خوب</span>
            <span className="text-xs font-bold text-primary">مشهد، بلوار هاشمیه</span>
          </div>

          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold py-2 border-b border-border-subtle transition-colors ${
                  isActive ? "text-primary" : "text-strong hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-2 flex flex-col gap-3">
            <Link href="/tools/calorie-calculator" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="tonal" size="md" isFullWidth>
                محاسبه‌گر آنلاین BMR و کالری
              </Button>
            </Link>
            <a
              href="tel:05137660000"
              className="inline-flex items-center justify-center gap-2 h-control bg-calm text-primary text-sm font-bold rounded-pill border border-border-subtle"
            >
              <span>تماس با کافه‌بوتیک: ۰۵۱-۳۷۶۶۰۰۰۰</span>
            </a>
          </div>
        </div>
      )}
    </header>
  </>
  );
}

