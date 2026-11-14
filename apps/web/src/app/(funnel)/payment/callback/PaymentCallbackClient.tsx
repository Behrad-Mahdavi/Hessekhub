// apps/web/src/app/(funnel)/payment/callback/PaymentCallbackClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, Button, Badge } from "@hessekhub/ui";
import { apiFetch } from "@/lib/api";

export function PaymentCallbackClient() {
  const searchParams = useSearchParams();
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!authority) {
      setErrorMessage("شناسه مرجع پرداخت یافت نشد.");
      setLoading(false);
      return;
    }

    if (status !== "OK") {
      setErrorMessage("تراکنش توسط کاربر لغو شد یا درگاه بانک آن را تایید نکرد.");
      setLoading(false);
      return;
    }

    // Call Verification endpoint
    apiFetch<any>(`/finance/verify?Authority=${encodeURIComponent(authority)}`)
      .then((data) => {
        setResultData(data);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message || "خطا در تایید تراکنش بانکی.");
        setLoading(false);
      });
  }, [authority, status]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-6" />
        <h2 className="text-xl font-extrabold text-strong mb-2">
          در حال تایید پرداخت بانکی و فعال‌سازی اشتراک...
        </h2>
        <p className="text-xs text-muted">
          لطفاً شکیبا باشید و صفحه را نبندید.
        </p>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <Card className="p-8 border-border-default">
          <div className="w-16 h-16 rounded-full bg-warning-subtle text-warning-text flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <Badge variant="calm" size="md" className="mb-4">
            تراکنش ناموفق
          </Badge>

          <h1 className="text-xl font-extrabold text-strong mb-3">
            پرداخت تکمیل نشد
          </h1>

          <p className="text-xs text-muted mb-8 leading-relaxed">
            {errorMessage || "تراکنش بانکی تایید نشد. اگر مبلغی از حساب شما کسر شده است، ظرف حداکثر ۷۲ ساعت توسط بانک عودت داده می‌شود."}
          </p>

          <div className="space-y-3">
            <Link href="/checkout" className="w-full block">
              <Button variant="primary" size="md" className="w-full">
                تلاش مجدد برای پرداخت
              </Button>
            </Link>

            <Link href="/" className="w-full block">
              <Button variant="ghost" size="sm" className="w-full text-muted">
                بازگشت به صفحه اصلی
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-start">
      <Card className="p-8 border-primary/30 shadow-elevation-2">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <Badge variant="primary" size="md" className="mb-2">
            اشتراک شما با موفقیت فعال شد
          </Badge>

          <h1 className="text-2xl font-extrabold text-strong">
            به خانواده حس خوب مشهد خوش آمدید!
          </h1>
        </div>

        <div className="space-y-3 p-4 rounded-2xl bg-calm border border-border-default text-xs mb-6">
          <div className="flex justify-between">
            <span className="text-muted">شماره پیگیری پرداخت:</span>
            <span className="font-extrabold text-strong">
              {resultData?.trackingNumber || resultData?.refId || authority}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">وضعیت اشتراک:</span>
            <span className="font-extrabold text-primary">
              فعال (آماده طبخ روزانه)
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">آغاز ارسال اولین بسته:</span>
            <span className="font-extrabold text-strong">
              از فردا صبح در بازه انتخابی شما
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">تخصیص منوی چرخشی:</span>
            <span className="font-extrabold text-strong">
              ۱۴ روز کامل با ۲ گزینه انتخابی
            </span>
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed mb-6">
          پیامک تایید حاوی اطلاعات ورود به وب‌اپلیکیشن حس خوب و زمان‌بندی تحویل برای شماره موبایل شما ارسال گردید. شما می‌توانید هر روز تا ۴۸ ساعت قبل از تحویل، بین گزینه‌های غذایی جابجا شوید.
        </p>

        <Link href="/" className="w-full block">
          <Button variant="primary" size="lg" className="w-full">
            ورود به برنامه امروز و مشاهده غذاها
          </Button>
        </Link>
      </Card>
    </div>
  );
}
