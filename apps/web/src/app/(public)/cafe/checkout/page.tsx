// apps/web/src/app/(public)/cafe/checkout/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button, TextField, Badge, formatToman, toPersianDigits } from "@hessekhub/ui";
import { apiFetch } from "@/lib/api";

type DeliveryMethod = "DINE_IN_CAFE" | "CAFE_PICKUP" | "COURIER_DELIVERY";

interface MenuItemMeta {
  id: string;
  nameFa: string;
  priceToman: number;
  categoryFa: string;
}

export default function CafeCheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [menuItems, setMenuItems] = useState<MenuItemMeta[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("DINE_IN_CAFE");
  const [tableNumber, setTableNumber] = useState("");
  const [guestMobile, setGuestMobile] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    // Load cart
    try {
      const saved = localStorage.getItem("hessekhub_cafe_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignore JSON parse errors on initial mount
    }

    // Load available menu items from API
    apiFetch<MenuItemMeta[]>("/cafe/menu")
      .then((items) => {
        setMenuItems(items);
        setLoadingMenu(false);
      })
      .catch(() => {
        setLoadingMenu(false);
      });
  }, []);

  const cartEntries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const totalAmountToman = cartEntries.reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item ? item.priceToman * qty : 0);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (cartEntries.length === 0) {
      setErrorMsg("سبد خرید شما خالی است.");
      return;
    }

    if (!guestMobile || !guestMobile.startsWith("09") || guestMobile.length < 11) {
      setErrorMsg("لطفاً شماره موبایل معتبر (مثال: ۰۹۱۵۱۲۳۴۵۶۷) وارد کنید.");
      return;
    }

    if (deliveryMethod === "DINE_IN_CAFE" && !tableNumber) {
      setErrorMsg("لطفاً شماره میز خود در کافه‌بوتیک را وارد نمایید.");
      return;
    }

    if (deliveryMethod === "COURIER_DELIVERY" && !deliveryAddress) {
      setErrorMsg("لطفاً آدرس دقیق تحویل در مشهد را وارد نمایید.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<any>("/cafe/orders", {
        method: "POST",
        body: JSON.stringify({
          guestMobile,
          deliveryMethod,
          tableNumber: deliveryMethod === "DINE_IN_CAFE" ? tableNumber : undefined,
          items: cartEntries.map(([cafeMenuItemId, quantity]) => ({
            cafeMenuItemId,
            quantity,
          })),
        }),
      });

      // Clear cart
      localStorage.removeItem("hessekhub_cafe_cart");

      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        router.push("/cafe?order_success=true");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "خطا در ثبت سفارش کافه");
      setSubmitting(false);
    }
  };

  if (loadingMenu) {
    return (
      <main className="w-full py-16 text-center">
        <div className="text-muted text-sm">در حال بارگذاری سبد خرید...</div>
      </main>
    );
  }

  if (cartEntries.length === 0) {
    return (
      <main className="w-full py-16 text-center">
        <div className="max-w-md mx-auto px-4">
          <Badge variant="calm" size="md" className="mb-4">
            سبد خرید کافه‌بوتیک
          </Badge>
          <h1 className="text-2xl font-extrabold text-strong mb-4">
            سبد خرید شما در حال حاضر خالی است
          </h1>
          <p className="text-sm text-muted mb-8 leading-relaxed">
            می‌توانید از منوی دیجیتال کافه، برانچ سلامت، سالادها یا نوشیدنی‌های مورد علاقه خود را انتخاب کنید.
          </p>
          <Link href="/cafe/menu">
            <Button variant="primary" size="md">
              مشاهده منوی کافه
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full py-10 md:py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-start">
        <div className="mb-8">
          <Link
            href="/cafe/menu"
            className="text-xs font-bold text-muted hover:text-primary transition-colors inline-flex items-center gap-1.5 mb-4"
          >
            <span>→</span>
            <span>بازگشت به منوی کافه</span>
          </Link>

          <h1 className="text-2xl md:text-3xl font-extrabold text-strong mb-2">
            تکمیل سفارش کافه‌بوتیک حس خوب
          </h1>
          <p className="text-sm text-muted">
            کافه‌بوتیک سلامت مشهد (بلوار هاشمیه) — فعال از ۱۳۹۷
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Items Review Card */}
          <Card className="p-6">
            <h2 className="text-base font-bold text-strong mb-4">
              اقلام انتخابی شما
            </h2>

            <div className="divide-y divide-border-default">
              {cartEntries.map(([id, qty]) => {
                const item = menuItems.find((m) => m.id === id);
                if (!item) return null;

                return (
                  <div key={id} className="py-3 flex items-center justify-between text-sm">
                    <div>
                      <span className="font-bold text-strong block">{item.nameFa}</span>
                      <span className="text-xs text-muted">
                        {toPersianDigits(qty)} عدد × {formatToman(item.priceToman)}
                      </span>
                    </div>

                    <span className="font-extrabold text-strong">
                      {formatToman(item.priceToman * qty)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-border-default flex items-center justify-between">
              <span className="font-bold text-muted">مبلغ کل قابل پرداخت:</span>
              <span className="text-xl font-extrabold text-primary">
                {formatToman(totalAmountToman)}
              </span>
            </div>
          </Card>

          {/* Delivery Method Choice */}
          <Card className="p-6">
            <h2 className="text-base font-bold text-strong mb-4">
              نحوه دریافت سفارش
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setDeliveryMethod("DINE_IN_CAFE")}
                className={`p-4 rounded-2xl border text-start transition-all ${
                  deliveryMethod === "DINE_IN_CAFE"
                    ? "border-primary bg-primary-subtle/30 shadow-elevation-1"
                    : "border-border-default bg-canvas hover:border-primary/40"
                }`}
              >
                <span className="text-xs font-bold text-primary block mb-1">
                  حضور در سالن
                </span>
                <span className="text-sm font-extrabold text-strong block">
                  میل در کافه
                </span>
                <span className="text-[11px] text-muted block mt-1">
                  تحویل روی میز با آرامش
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod("CAFE_PICKUP")}
                className={`p-4 rounded-2xl border text-start transition-all ${
                  deliveryMethod === "CAFE_PICKUP"
                    ? "border-primary bg-primary-subtle/30 shadow-elevation-1"
                    : "border-border-default bg-canvas hover:border-primary/40"
                }`}
              >
                <span className="text-xs font-bold text-primary block mb-1">
                  بیرون‌بر
                </span>
                <span className="text-sm font-extrabold text-strong block">
                  تحویل حضوری
                </span>
                <span className="text-[11px] text-muted block mt-1">
                  آماده‌سازی بدون معطلی
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod("COURIER_DELIVERY")}
                className={`p-4 rounded-2xl border text-start transition-all ${
                  deliveryMethod === "COURIER_DELIVERY"
                    ? "border-primary bg-primary-subtle/30 shadow-elevation-1"
                    : "border-border-default bg-canvas hover:border-primary/40"
                }`}
              >
                <span className="text-xs font-bold text-primary block mb-1">
                  ارسال سریع
                </span>
                <span className="text-sm font-extrabold text-strong block">
                  پیک در مشهد
                </span>
                <span className="text-[11px] text-muted block mt-1">
                  ارسال فوری درب منزل/محل کار
                </span>
              </button>
            </div>

            {/* Conditional input for Table Number */}
            {deliveryMethod === "DINE_IN_CAFE" && (
              <div className="mb-4">
                <TextField
                  label="شماره میز در سالن کافه"
                  placeholder="مثال: ۴"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Conditional input for Courier Address */}
            {deliveryMethod === "COURIER_DELIVERY" && (
              <div className="mb-4">
                <TextField
                  label="آدرس دقیق تحویل در مشهد"
                  placeholder="مشهد، خیابان، پلاک، واحد..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <TextField
                label="شماره موبایل جهت هماهنگی و فاکتور پیامکی"
                placeholder="۰۹۱۵۱۲۳۴۵۶۷"
                value={guestMobile}
                onChange={(e) => setGuestMobile(e.target.value)}
                required
              />
            </div>
          </Card>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-warning-subtle text-warning-text border border-warning/40 text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? "در حال اتصال به درگاه پرداخت..." : "پرداخت آنلاین و ثبت نهایی سفارش"}
          </Button>
        </form>
      </div>
    </main>
  );
}
