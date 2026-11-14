// apps/web/src/components/navigation/ChapterNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ChapterNavItem {
  href: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface ChapterNavProps {
  items: ChapterNavItem[];
  ariaLabel?: string;
}

export function ChapterNav({ items, ariaLabel = "دسته‌بندی‌ها" }: ChapterNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className="w-full bg-surface/90 backdrop-blur-md border-b border-border-subtle py-3 overflow-x-auto no-scrollbar"
    >
      <div className="max-w-container mx-auto px-4 md:px-8 flex items-center justify-start md:justify-center gap-6 md:gap-10 min-w-max">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex flex-col items-center gap-1.5 transition-all text-center select-none py-1 px-2 rounded-lg ${
                isActive ? "text-primary" : "text-muted hover:text-strong"
              }`}
            >
              {item.icon && (
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-fast group-hover:scale-110 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-canvas text-muted group-hover:text-primary"
                  }`}
                >
                  {item.icon}
                </div>
              )}
              <div className="flex items-center gap-1">
                <span className={`text-xs font-medium transition-colors ${isActive ? "font-bold text-primary" : ""}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className="text-[10px] bg-accent/20 text-accent font-bold px-1.5 py-0.2 rounded-pill">
                    {item.badge}
                  </span>
                )}
              </div>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

