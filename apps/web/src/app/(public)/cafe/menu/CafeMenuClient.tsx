// apps/web/src/app/(public)/cafe/menu/CafeMenuClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, formatToman, toPersianDigits } from "@hessekhub/ui";

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
        // Ignore quota error
      }
      return updated;
    });
  };

  const filteredItems =
    selectedCategory === "همه"
      ? initialItems
      : initialItems.filter((item) => item.categoryFa === selectedCategory);

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPriceToman = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = initialItems.find((i) => i.id === id);
    return sum + (item ? item.priceToman * qty : 0);
  }, 0);

  return (
    <div className="w-full">
      {/* Apple-Style Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-8 mb-4">
        <button
          type="button"
          onClick={() => setSelectedCategory("همه")}
          className={`h-11 px-5 rounded-pill text-xs font-bold whitespace-nowrap transition-all duration-fast select-none ${
            selectedCategory === "همه"
              ? "bg-primary text-white shadow-xs"
              : "bg-surface text-muted border border-border-subtle hover:text-strong hover:border-border-default"
          }`}
        >
          همه آیتم‌ها ({toPersianDigits(initialItems.length)})
        </button>

        {categories.map((cat) => {
          const count = initialItems.filter((i) => i.categoryFa === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-11 px-5 rounded-pill text-xs font-bold whitespace-nowrap transition-all duration-fast select-none ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-xs"
                  : "bg-surface text-muted border border-border-subtle hover:text-strong hover:border-border-default"
              }`}
            >
              {cat} ({toPersianDigits(count)})
            </button>
          );
        })}
      </div>

      {/* Items Grid (Apple Store Minimalist Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const qty = cart[item.id] || 0;

          return (
            <div
              key={item.id}
              className="rounded-3xl bg-surface border border-border-subtle hover:border-border-default p-6 flex flex-col justify-between text-start transition-all duration-medium group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-primary bg-calm px-2.5 py-1 rounded-pill">
                    {item.categoryFa}
                  </span>
                  <span className="text-xs font-bold text-strong">
                    {toPersianDigits(item.calories)} کیلوکالری
                  </span>
                </div>

                <h3 className="text-lg font-bold text-strong mb-2 leading-snug">
                  {item.nameFa}
                </h3>

                <p className="text-xs text-muted leading-relaxed mb-5">
                  {item.descriptionFa}
                </p>

                {/* Macro metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-canvas border border-border-subtle text-center mb-4 text-[11px]">
                  <div>
                    <span className="text-muted block text-[10px]">پروتئین</span>
                    <span className="font-bold text-primary">
                      {toPersianDigits(item.proteinGrams)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px]">کربوهیدرات</span>
                    <span className="font-bold text-strong">
                      {toPersianDigits(item.carbsGrams)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px]">چربی مفید</span>
                    <span className="font-bold text-strong">
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
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted block mb-0.5">قیمت:</span>
                  <span className="text-base font-black text-strong">
                    {formatToman(item.priceToman)}
                  </span>
                </div>

                {qty === 0 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="rounded-pill px-4 text-xs font-bold shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    افزودن به سفارش
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 bg-canvas p-1 rounded-pill border border-border-subtle">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-full bg-surface flex items-center justify-center font-bold text-strong hover:bg-surface-hover shadow-xs"
                      aria-label="کاهش تعداد"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-strong">
                      {toPersianDigits(qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-xs"
                      aria-label="افزایش تعداد"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apple-Style Floating Bag / Checkout Bar */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-6 start-4 end-4 md:start-auto md:end-8 md:w-96 z-sticky animate-in fade-in slide-in-from-bottom duration-300">
          <div className="p-4 rounded-3xl bg-surface/90 backdrop-blur-2xl border border-primary/30 shadow-[0_20px_50px_rgba(20,35,70,0.12)] flex items-center justify-between gap-4">
            <div className="text-start ps-2">
              <span className="text-xs text-muted block">
                {toPersianDigits(totalItemsCount)} آیتم در سبد خرید
              </span>
              <span className="text-base font-black text-strong">
                {formatToman(totalPriceToman)}
              </span>
            </div>

            <Link href="/cafe/checkout">
              <Button variant="primary" size="md" className="rounded-pill px-5 text-xs font-bold shadow-sm">
                تکمیل سفارش و پرداخت ←
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
