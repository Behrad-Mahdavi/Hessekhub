// apps/web/src/app/(public)/cafe/menu/CafeMenuClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, Badge, formatToman, toPersianDigits } from "@hessekhub/ui";

export interface CafeMenuItemData {
  id: string;
  nameFa: string;
  descriptionFa: string;
  categoryFa: string;
  priceToman: number;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  allergens: string[];
  isAvailable: boolean;
}

export interface CafeMenuClientProps {
  initialItems: CafeMenuItemData[];
}

export function CafeMenuClient({ initialItems }: CafeMenuClientProps) {
  // Extract unique categories
  const categories = Array.from(
    new Set(initialItems.map((item) => item.categoryFa))
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0] || "همه"
  );

  // Cart state: Record<itemId, quantity>
  const [cart, setCart] = useState<Record<string, number>>({});

  // Sync cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hessekhub_cafe_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignore initial parse error
    }
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      try {
        localStorage.setItem("hessekhub_cafe_cart", JSON.stringify(updated));
      } catch {
        // Ignore storage write error
      }
      return updated;
    });
  };

  const filteredItems = initialItems.filter(
    (item) => selectedCategory === "همه" || item.categoryFa === selectedCategory
  );

  // Cart metrics
  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPriceToman = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = initialItems.find((i) => i.id === id);
    return sum + (item ? item.priceToman * qty : 0);
  }, 0);

  return (
    <div className="w-full relative pb-28">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory("همه")}
          className={`h-control-sm px-5 rounded-pill text-xs font-bold whitespace-nowrap transition-all duration-fast select-none ${
            selectedCategory === "همه"
              ? "bg-primary text-white shadow-elevation-1"
              : "bg-surface text-muted border border-border-default hover:text-strong hover:border-border-control"
          }`}
        >
          همه بخش‌ها ({toPersianDigits(initialItems.length)})
        </button>

        {categories.map((cat) => {
          const count = initialItems.filter((i) => i.categoryFa === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-control-sm px-5 rounded-pill text-xs font-bold whitespace-nowrap transition-all duration-fast select-none ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-elevation-1"
                  : "bg-surface text-muted border border-border-default hover:text-strong hover:border-border-control"
              }`}
            >
              {cat} ({toPersianDigits(count)})
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const qty = cart[item.id] || 0;

          return (
            <Card
              key={item.id}
              className="flex flex-col justify-between p-6 border-border-default text-start hover:border-primary/40 transition-all shadow-elevation-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="calm" size="sm">
                    {item.categoryFa}
                  </Badge>
                  <span className="text-xs font-bold text-muted">
                    {toPersianDigits(item.calories)} کیلوکالری
                  </span>
                </div>

                <h3 className="text-lg font-bold text-strong mb-2">
                  {item.nameFa}
                </h3>

                <p className="text-xs text-muted leading-relaxed mb-4">
                  {item.descriptionFa}
                </p>

                {/* Macro metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-canvas border border-border-default text-center mb-4 text-[11px]">
                  <div>
                    <span className="text-muted block">پروتئین</span>
                    <span className="font-extrabold text-primary">
                      {toPersianDigits(item.proteinGrams)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block">کربوهیدرات</span>
                    <span className="font-extrabold text-strong">
                      {toPersianDigits(item.carbsGrams)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block">چربی</span>
                    <span className="font-extrabold text-strong">
                      {toPersianDigits(item.fatGrams)}g
                    </span>
                  </div>
                </div>

                {item.allergens.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="text-[10px] text-muted">حساسیت:</span>
                    {item.allergens.map((alg, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-canvas text-muted text-[10px]"
                      >
                        {alg}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price and Add/Remove Button */}
              <div className="pt-4 border-t border-border-default flex items-center justify-between">
                <span className="text-sm font-extrabold text-strong">
                  {formatToman(item.priceToman)}
                </span>

                {qty === 0 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    افزودن به سفارش
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 bg-calm p-1 rounded-xl border border-border-default">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center font-bold text-strong hover:bg-canvas"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-extrabold text-strong">
                      {toPersianDigits(qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-6 start-4 end-4 md:start-auto md:end-8 md:w-96 z-40 animate-in fade-in slide-in-from-bottom duration-300">
          <Card className="p-4 bg-surface/95 backdrop-blur-md border-primary/40 shadow-elevation-3 flex items-center justify-between gap-4">
            <div className="text-start">
              <span className="text-xs text-muted block">
                {toPersianDigits(totalItemsCount)} آیتم انتخاب‌شده
              </span>
              <span className="text-base font-extrabold text-strong">
                {formatToman(totalPriceToman)}
              </span>
            </div>

            <Link href="/cafe/checkout">
              <Button variant="primary" size="md">
                تکمیل سفارش و پرداخت
              </Button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
}
