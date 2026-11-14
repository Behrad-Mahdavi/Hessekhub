// apps/web/src/components/navigation/StickyLocalNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@hessekhub/ui";

export interface LocalNavLink {
  href: string;
  label: string;
}

export interface StickyLocalNavProps {
  title: string;
  priceNote?: string;
  links?: LocalNavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function StickyLocalNav({
  title,
  priceNote,
  links = [],
  ctaLabel = "سفارش و شروع اشتراک",
  ctaHref = "/start",
}: StickyLocalNavProps) {
  return (
    <div className="sticky top-20 z-sticky-subnav w-full bg-surface/85 backdrop-blur-xl border-b border-border-subtle transition-all">
      <div className="max-w-container mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        {/* Title & Micro Price */}
        <div className="flex items-center gap-3">
          <h2 className="text-sm md:text-base font-bold text-strong tracking-normal">
            {title}
          </h2>
          {priceNote && (
            <span className="hidden sm:inline-block text-xs text-muted">
              {priceNote}
            </span>
          )}
        </div>

        {/* Links and CTA */}
        <div className="flex items-center gap-4 md:gap-6">
          {links.length > 0 && (
            <nav className="hidden lg:flex items-center gap-5 text-xs text-muted font-medium">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          <Link href={ctaHref}>
            <Button
              variant="primary"
              size="sm"
              className="rounded-pill px-4 text-xs font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

