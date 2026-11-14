// apps/web/src/app/(funnel)/checkout/CheckoutClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, Button, TextField, Badge, formatToman } from "@hessekhub/ui";
import { apiFetch } from "@/lib/api";

export function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tierIdFromUrl = searchParams.get("tierId");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [tier, setTier] = useState<any>(null);
  const [zones, setZones] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);

  // Delivery options
  const [deliveryMethod, setDeliveryMethod] = useState<"COURIER" | "PICKUP">("COURIER");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  useEffect(() => {
    // Check auth token
    const token = localStorage.getItem("hessekhub_token");
    if (!token) {
      router.push("/start");
      return;
    }

    // Load zones, slots and programs
    Promise.all([
      apiFetch<any[]>("/cms/programs"),
      apiFetch<any[]>("/logistics/zones"),
      apiFetch<any[]>("/logistics/slots"),
    ])
      .then(([progs, zList, sList]) => {
        setZones(zList);
        setSlots(sList);
        if (zList.length > 0) setSelectedZoneId(zList[0].id);
        if (sList.length > 0) setSelectedSlotId(sList[0].id);

        // Find tier from URL param, localStorage draft, or default to first full board tier
        const allTiers = progs.flatMap((p) => p.coverageTiers || []);
        let found = allTiers.find(
          (t: any) => t.id === tierIdFromUrl || t.tierType === tierIdFromUrl
        );

        if (!found) {
          try {
            const draft = localStorage.getItem("hessekhub_onboarding_draft");
            if (draft) {
              const parsed = JSON.parse(draft);
              found = allTiers.find(
                (t: any) =>
                  t.id === parsed.coverageTierId || t.tierType === parsed.coverageTierId
              );
            }
          } catch {
            // Ignore draft parse error
          }
        }

        if (!found) {
          found =
            allTiers.find((t: any) => t.tierType === "FULL_BOARD") || allTiers[0];
        }

        setTier(found);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [tierIdFromUrl, router]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const token = localStorage.getItem("hessekhub_token");
    if (!token) {
      router.push("/start");
      return;
    }

    if (!tier?.id) {
      setErrorMsg("پلن تغذیه‌ای یافت نشد. لطفاً مجدداً از منوی برنامه‌ها پکیج خود را انتخاب کنید.");
      return;
    }

    if (deliveryMethod === "COURIER" && !fullAddress) {
      setErrorMsg("لطفاً آدرس دقیق تحویل در مشهد را وارد نمایید.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<any>("/finance/checkout/subscription", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          coverageTierId: tier.id,
          deliverySlotId: selectedSlotId || undefined,
        }),
      });

      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        router.push("/payment/callback?Authority=demo&Status=OK");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "خطا در برقراری ارتباط با درگاه پرداخت بانکی.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-muted text-sm">
        در حال آماده‌سازی اطلاعات تسویه حساب...
      </div>
    );
  }

  if (!tier) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted text-sm mb-4">هیچ پلن تغذیه‌ای انتخاب نشده است.</p>
        <Link href="/start">
          <Button variant="primary" size="md">
            بازگشت به شروع
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 text-start">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-strong mb-2">
          تسویه حساب و فعال‌سازی فوری اشتراک
        </h1>
        <p className="text-sm text-muted">
          اطلاعات تحویل در مشهد و پیش‌فاکتور نهایی
        </p>
      </div>

      <form onSubmit={handlePay} className="space-y-8">
        {/* Plan Summary Card */}
        <Card className="p-6 border-border-default">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-primary">پلن انتخابی شما</span>
            <Badge variant="primary" size="sm">
              {tier.daysPerWeek} روز در هفته
            </Badge>
          </div>

          <h2 className="text-xl font-extrabold text-strong mb-2">
            {tier.tierNameFa}
          </h2>

          <div className="text-xs text-muted mb-4">
            وعده‌های شامل: {tier.mealsIncluded?.join(" + ")}
          </div>

          <div className="pt-4 border-t border-border-default flex items-center justify-between">
            <span className="text-xs text-muted">مبلغ دوره:</span>
            <span className="text-lg font-extrabold text-strong">
              {formatToman(tier.basePriceToman)}
            </span>
          </div>
        </Card>

        {/* Delivery Method & Zone */}
        <Card className="p-6 border-border-default">
          <h2 className="text-base font-bold text-strong mb-4">
            روش دریافت بسته در مشهد
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setDeliveryMethod("COURIER")}
              className={`p-4 rounded-2xl border text-start transition-all ${
                deliveryMethod === "COURIER"
                  ? "border-primary bg-primary-subtle/30 shadow-elevation-1"
                  : "border-border-default bg-canvas hover:border-primary/40"
              }`}
            >
              <span className="text-xs font-bold text-primary block mb-1">
                ارسال روزانه با پیک
              </span>
              <span className="text-sm font-extrabold text-strong block">
                درب منزل یا محل کار
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryMethod("PICKUP")}
              className={`p-4 rounded-2xl border text-start transition-all ${
                deliveryMethod === "PICKUP"
                  ? "border-primary bg-primary-subtle/30 shadow-elevation-1"
                  : "border-border-default bg-canvas hover:border-primary/40"
              }`}
            >
              <span className="text-xs font-bold text-primary block mb-1">
                تحویل حضوری
              </span>
              <span className="text-sm font-extrabold text-strong block">
                کافه‌بوتیک سجاد (بدون هزینه)
              </span>
            </button>
          </div>

          {deliveryMethod === "COURIER" ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted block mb-2">
                  منطقه ارسال در مشهد
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => setSelectedZoneId(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-canvas border border-border-default text-sm text-strong"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.nameFa}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <TextField
                  label="آدرس دقیق تحویل در مشهد"
                  placeholder="بلوار، خیابان، کوچه، پلاک، زنگ، واحد..."
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-muted block mb-2">
                  بازه زمانی تحویل روزانه
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {slots.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSlotId(s.id)}
                      className={`p-3 rounded-xl border text-start text-xs font-bold transition-all ${
                        selectedSlotId === s.id
                          ? "border-primary bg-primary text-white"
                          : "border-border-default bg-canvas text-strong hover:border-primary/40"
                      }`}
                    >
                      <div>{s.titleFa}</div>
                      <div className="text-[11px] font-normal opacity-90">
                        {s.startTime} الی {s.endTime}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-calm border border-border-default text-xs leading-relaxed text-muted">
              بسته شما هر روز صبح از ساعت ۸:۰۰ در کافه‌بوتیک حس خوب (بلوار سجاد، بهارستان ۲) آماده تحویل با احترام خواهد بود.
            </div>
          )}
        </Card>

        {/* Invoice Summary */}
        <Card className="p-6 border-border-default">
          <h2 className="text-base font-bold text-strong mb-4">
            فاکتور نهایی و پرداخت
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">هزینه دوره تغذیه:</span>
              <span className="font-bold text-strong">
                {formatToman(tier.basePriceToman)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">هزینه ارسال روزانه پیک:</span>
              <span className="font-bold text-strong">
                {deliveryMethod === "PICKUP" ? "رایگان (تحویل کافه)" : "رایگان (طرح تشویقی مشهد)"}
              </span>
            </div>

            <div className="pt-3 border-t border-border-default flex justify-between text-base">
              <span className="font-extrabold text-strong">مبلغ قابل پرداخت:</span>
              <span className="text-xl font-extrabold text-primary">
                {formatToman(tier.basePriceToman)}
              </span>
            </div>
          </div>
        </Card>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-warning-subtle text-warning-text border border-warning/40 text-xs font-medium">
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
          {submitting
            ? "در حال اتصال به درگاه پرداخت زرین‌پال..."
            : "اتصال به درگاه پرداخت و فعال‌سازی فوری"}
        </Button>
      </form>
    </div>
  );
}
