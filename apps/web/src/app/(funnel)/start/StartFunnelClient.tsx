// apps/web/src/app/(funnel)/start/StartFunnelClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  Button,
  Badge,
  TextField,
  NumberField,
  Chip,
  OtpInput,
  formatToman,
  toPersianDigits,
} from "@hessekhub/ui";
import { BRAND_GLYPHS } from "@hessekhub/design-tokens";
import { apiFetch } from "@/lib/api";

type FitnessGoal = "WEIGHT_LOSS" | "MAINTENANCE" | "MUSCLE_GAIN";
type Gender = "FEMALE" | "MALE";
type ActivityLevel = "SEDENTARY" | "LIGHTLY_ACTIVE" | "MODERATELY_ACTIVE" | "VERY_ACTIVE" | "ATHLETE";

const COMMON_ALLERGIES = [
  "گلوتن (گندم/جو)",
  "لاکتوز و لبنیات",
  "بادام‌زمینی و مغزیجات",
  "تخم‌مرغ",
  "سویا",
  "غذاهای دریایی",
];

const MEDICAL_CONDITIONS = [
  "دیابت نوع ۲",
  "فشار خون بالا",
  "کبد چرب",
  "کم‌کاری تیرویید",
  "سندروم روده تحریک‌پذیر (IBS)",
];

export function StartFunnelClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current Step: 1 to 6
  const [step, setStep] = useState(1);

  // Form State
  const [goal, setGoal] = useState<FitnessGoal>(
    (searchParams.get("goal") as FitnessGoal) || "WEIGHT_LOSS"
  );
  const [gender, setGender] = useState<Gender>(
    (searchParams.get("gender") as Gender) || "FEMALE"
  );
  const [age, setAge] = useState<number | "">(
    searchParams.get("age") ? Number(searchParams.get("age")) : 30
  );
  const [weightKg, setWeightKg] = useState<number | "">(
    searchParams.get("weight") ? Number(searchParams.get("weight")) : 70
  );
  const [heightCm, setHeightCm] = useState<number | "">(
    searchParams.get("height") ? Number(searchParams.get("height")) : 165
  );
  const [activity, setActivity] = useState<ActivityLevel>(
    (searchParams.get("activity") as ActivityLevel) || "MODERATELY_ACTIVE"
  );

  const [allergies, setAllergies] = useState<string[]>([]);
  const [medicalFlags, setMedicalFlags] = useState<string[]>([]);

  // Tiers from DB
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedTierId, setSelectedTierId] = useState<string>("");

  // OTP Auth
  const [mobile, setMobile] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const numWeight = typeof weightKg === "number" ? weightKg : 70;
  const numHeight = typeof heightCm === "number" ? heightCm : 165;
  const numAge = typeof age === "number" ? age : 30;

  useEffect(() => {
    // Load programs and tiers
    apiFetch<any[]>("/cms/programs")
      .then((data) => {
        setPrograms(data);
        if (data && data.length > 0 && data[0].coverageTiers?.length > 0) {
          const defaultTier =
            data[0].coverageTiers.find((t: any) => t.tierType === "FULL_BOARD") ||
            data[0].coverageTiers[0];
          setSelectedTierId(defaultTier.id);
        }
      })
      .catch(() => {});
  }, []);

  const toggleAllergy = (item: string) => {
    setAllergies((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleMedical = (item: string) => {
    setMedicalFlags((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Nutrition calculations
  const bmr =
    gender === "MALE"
      ? Math.round(10 * numWeight + 6.25 * numHeight - 5 * numAge + 5)
      : Math.round(10 * numWeight + 6.25 * numHeight - 5 * numAge - 161);

  const mult =
    activity === "SEDENTARY"
      ? 1.2
      : activity === "LIGHTLY_ACTIVE"
      ? 1.375
      : activity === "MODERATELY_ACTIVE"
      ? 1.55
      : activity === "VERY_ACTIVE"
      ? 1.725
      : 1.9;

  const tdee = Math.round(bmr * mult);
  const delta = goal === "WEIGHT_LOSS" ? -450 : goal === "MUSCLE_GAIN" ? 300 : 0;
  const minSafe = gender === "FEMALE" ? 1200 : 1500;
  const targetKcal = Math.max(minSafe, Math.min(tdee + delta, 3200));

  const tiers = [1200, 1500, 1800, 2200, 2500] as const;
  let discreteTier: number = 1200;
  let minDiff = Math.abs(targetKcal - discreteTier);
  for (const t of tiers) {
    if (Math.abs(targetKcal - t) < minDiff) {
      minDiff = Math.abs(targetKcal - t);
      discreteTier = t;
    }
  }

  // Handle Send OTP
  const handleSendOtp = async () => {
    setErrorMsg("");
    if (!mobile || !mobile.startsWith("09") || mobile.length < 11) {
      setErrorMsg("لطفاً شماره موبایل معتبر با فرمت ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<any>("/auth/otp/send", {
        method: "POST",
        body: JSON.stringify({ mobile }),
      });
      setOtpSent(true);
      if (res.devCode) {
        setOtpCode(res.devCode);
      }
      setSubmitting(false);
    } catch (err: any) {
      setErrorMsg(err.message || "خطا در ارسال پیامک کد تایید");
      setSubmitting(false);
    }
  };

  // Handle Verify OTP & Proceed
  const handleVerifyOtp = async () => {
    setErrorMsg("");
    if (!otpCode || otpCode.length < 4) {
      setErrorMsg("لطفاً کد تایید پیامک‌شده را وارد کنید.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<any>("/auth/otp/verify", {
        method: "POST",
        body: JSON.stringify({ mobile, code: otpCode }),
      });

      // Store JWT token
      if (res.accessToken) {
        localStorage.setItem("hessekhub_token", res.accessToken);
      }

      // Save Onboarding Draft in Backend & LocalStorage
      const draftData = {
        goal,
        gender,
        age: numAge,
        weightKg: numWeight,
        heightCm: numHeight,
        activityLevel: activity,
        allergies,
        medicalFlags,
        discreteTier,
        coverageTierId: selectedTierId,
      };

      try {
        await apiFetch("/onboarding/draft", {
          method: "POST",
          body: JSON.stringify({
            key: mobile,
            data: draftData,
          }),
        });
      } catch {
        // Fallback to local draft persistence if offline
      }

      localStorage.setItem("hessekhub_onboarding_draft", JSON.stringify(draftData));

      // Route to checkout
      router.push(`/checkout?tierId=${selectedTierId}`);
    } catch (err: any) {
      setErrorMsg(err.message || "کد تایید اشتباه است یا منقضی شده است.");
      setSubmitting(false);
    }
  };

  const targetGlyph = BRAND_GLYPHS["target"];
  const saladGlyph = BRAND_GLYPHS["salad-bowl"];
  const bicepGlyph = BRAND_GLYPHS["bicep-arm"];

  return (
    <div className="max-w-2xl mx-auto px-4 text-start">
      {/* Step Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-muted">
          <span>مرحله {toPersianDigits(step)} از ۶</span>
          <span>
            {step === 1 && "انتخاب هدف"}
            {step === 2 && "اطلاعات فیزیکی"}
            {step === 3 && "سوابق سلامت و حساسیت"}
            {step === 4 && "آنالیز کالری و ماکروها"}
            {step === 5 && "سطح پوشش وعده‌ها"}
            {step === 6 && "تایید شماره و پیش‌نویس"}
          </span>
        </div>

        <div className="w-full h-2.5 bg-calm rounded-pill overflow-hidden border border-border-subtle">
          <div
            className="h-full bg-primary rounded-pill transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Goal */}
      {step === 1 && (
        <Card className="p-6 md:p-8 bg-surface shadow-elevation-2 border-border-default/80">
          <Badge variant="primary" size="md" className="mb-4">
            گام اول: هدف اصلی شما
          </Badge>
          <h2 className="text-xl md:text-2xl font-black text-strong mb-2">
            هدف شما از دریافت پکیج غذایی چیست؟
          </h2>
          <p className="text-xs md:text-sm text-muted mb-6 leading-relaxed">
            برنامه غذایی و تنظیم کسری یا مازاد کالری مستقیماً بر مبنای این هدف فرموله خواهد شد.
          </p>

          <div className="space-y-3.5 mb-8">
            <button
              type="button"
              onClick={() => setGoal("WEIGHT_LOSS")}
              className={`w-full p-4 rounded-2xl border text-start transition-all flex items-start gap-4 ${
                goal === "WEIGHT_LOSS"
                  ? "border-primary bg-primary-subtle/30 shadow-elevation-1 ring-2 ring-primary/20"
                  : "border-border-default bg-canvas hover:border-border-control"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center shrink-0 mt-0.5">
                {targetGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={targetGlyph.path} alt="کاهش وزن" className="w-6 h-6 object-contain" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm font-extrabold text-strong block mb-1">
                  کاهش وزن و چربی‌سوزی علمی
                </span>
                <span className="text-xs text-muted block leading-relaxed">
                  کاهش سایز اصولی با کسری کالری هوشمند بدون گرسنگی، افت متابولیسم یا ریزش عضلانی.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setGoal("MAINTENANCE")}
              className={`w-full p-4 rounded-2xl border text-start transition-all flex items-start gap-4 ${
                goal === "MAINTENANCE"
                  ? "border-primary bg-primary-subtle/30 shadow-elevation-1 ring-2 ring-primary/20"
                  : "border-border-default bg-canvas hover:border-border-control"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center shrink-0 mt-0.5">
                {saladGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={saladGlyph.path} alt="تثبیت وزن" className="w-6 h-6 object-contain" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm font-extrabold text-strong block mb-1">
                  تثبیت وزن، تغذیه پاک و شادابی روزانه
                </span>
                <span className="text-xs text-muted block leading-relaxed">
                  رهایی از آشپزی روزانه، پایداری انرژی در ساعات کاری و بهره‌مندی از غذای سالم تازه.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setGoal("MUSCLE_GAIN")}
              className={`w-full p-4 rounded-2xl border text-start transition-all flex items-start gap-4 ${
                goal === "MUSCLE_GAIN"
                  ? "border-primary bg-primary-subtle/30 shadow-elevation-1 ring-2 ring-primary/20"
                  : "border-border-default bg-canvas hover:border-border-control"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center shrink-0 mt-0.5">
                {bicepGlyph && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={bicepGlyph.path} alt="افزایش عضله" className="w-6 h-6 object-contain" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm font-extrabold text-strong block mb-1">
                  افزایش توده عضلانی و وزن پاک
                </span>
                <span className="text-xs text-muted block leading-relaxed">
                  تأمین پروتئین بالا با منابع باکیفیت و کربوهیدرات‌های پیچیده جهت هایپرتروفی و ریکاوری.
                </span>
              </div>
            </button>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setStep(2)}
          >
            ادامه به مشخصات فردی ←
          </Button>
        </Card>
      )}

      {/* STEP 2: Biometrics */}
      {step === 2 && (
        <Card className="p-6 md:p-8 bg-surface shadow-elevation-2 border-border-default/80">
          <Badge variant="primary" size="md" className="mb-4">
            گام دوم: مشخصات فردی
          </Badge>
          <h2 className="text-xl md:text-2xl font-black text-strong mb-2">
            مشخصات بیومتریک و سطح فعالیت
          </h2>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            فرمول استاندارد بین‌المللی میفلین-سنت جور (Mifflin-St Jeor) با این متغیرها نرخ سوخت‌وساز پایه شما را محاسبه می‌کند.
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <label className="text-xs font-bold text-muted block mb-2">جنسیت</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("FEMALE")}
                  className={`py-3.5 rounded-2xl font-bold text-sm border transition-all ${
                    gender === "FEMALE"
                      ? "bg-primary text-white border-primary shadow-elevation-1"
                      : "bg-canvas text-strong border-border-default hover:border-border-control"
                  }`}
                >
                  خانم
                </button>
                <button
                  type="button"
                  onClick={() => setGender("MALE")}
                  className={`py-3.5 rounded-2xl font-bold text-sm border transition-all ${
                    gender === "MALE"
                      ? "bg-primary text-white border-primary shadow-elevation-1"
                      : "bg-canvas text-strong border-border-default hover:border-border-control"
                  }`}
                >
                  آقا
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <NumberField
                  label="سن"
                  value={age}
                  onChange={(val) => setAge(val)}
                  unitLabel="سال"
                  min={15}
                  max={85}
                />
              </div>
              <div>
                <NumberField
                  label="وزن"
                  value={weightKg}
                  onChange={(val) => setWeightKg(val)}
                  unitLabel="kg"
                  min={35}
                  max={200}
                />
              </div>
              <div>
                <NumberField
                  label="قد"
                  value={heightCm}
                  onChange={(val) => setHeightCm(val)}
                  unitLabel="cm"
                  min={120}
                  max={225}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-muted block mb-2">میزان فعالیت فیزیکی در هفته</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                className="w-full h-control min-h-hit px-4 rounded-md bg-surface border border-border-default text-sm text-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="SEDENTARY">کم‌تحرک (کارمندی و بدون ورزش منظم)</option>
                <option value="LIGHTLY_ACTIVE">فعالیت سبک (۱ تا ۳ جلسه پیاده‌روی یا ورزش سبک)</option>
                <option value="MODERATELY_ACTIVE">متوسط (۳ تا ۵ روز ورزش در هفته)</option>
                <option value="VERY_ACTIVE">بسیار فعال (۶ تا ۷ روز ورزش سنگین)</option>
                <option value="ATHLETE">ورزشکار حرفه‌ای</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={() => setStep(1)}>
              → بازگشت
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setStep(3)}
            >
              مرحله بعد: حساسیت‌ها و سلامت ←
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: Allergies & Medical */}
      {step === 3 && (
        <Card className="p-6 md:p-8 bg-surface shadow-elevation-2 border-border-default/80">
          <Badge variant="primary" size="md" className="mb-4">
            گام سوم: پایش سلامت و حساسیت‌ها
          </Badge>
          <h2 className="text-xl md:text-2xl font-black text-strong mb-2">
            حساسیت‌های غذایی یا بیماری‌های زمینه‌ای
          </h2>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            موتور تخصیص منوی حس خوب، هرگونه ماده حساسیت‌زا را به‌صورت قطعی از برنامه غذایی شما حذف می‌کند.
          </p>

          <div className="mb-6">
            <span className="text-xs font-bold text-muted block mb-3">
              حساسیت‌های غذایی (در صورت وجود انتخاب کنید):
            </span>
            <div className="flex flex-wrap gap-2.5">
              {COMMON_ALLERGIES.map((item) => {
                const isSelected = allergies.includes(item);
                return (
                  <Chip
                    key={item}
                    label={item}
                    isSelected={isSelected}
                    onToggle={() => toggleAllergy(item)}
                  />
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <span className="text-xs font-bold text-muted block mb-3">
              سوابق پزشکی جهت بررسی کارشناس تغذیه:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {MEDICAL_CONDITIONS.map((item) => {
                const isSelected = medicalFlags.includes(item);
                return (
                  <Chip
                    key={item}
                    label={item}
                    isSelected={isSelected}
                    onToggle={() => toggleMedical(item)}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={() => setStep(2)}>
              → بازگشت
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setStep(4)}
            >
              مشاهده آنالیز کالری پکیج ←
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: Calorie & Rotational Menu Preview */}
      {step === 4 && (
        <Card className="p-6 md:p-8 bg-surface shadow-elevation-2 border-border-default/80">
          <Badge variant="primary" size="md" className="mb-4">
            گام چهارم: نسخه تغذیه‌ای شما
          </Badge>
          <h2 className="text-xl md:text-2xl font-black text-strong mb-2">
            محاسبه کالری اختصاصی و توزیع ماکروها
          </h2>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            بر اساس اطلاعات بیومتریک و هدف شما، این تیپ کالری استاندارد جهت طبخ روزانه برای شما فعال می‌شود:
          </p>

          {/* Respect the body: Soft calm background with primary blue token */}
          <div className="p-6 rounded-2xl bg-calm/70 border border-primary/20 text-center mb-6">
            <span className="text-xs font-bold text-primary block mb-1">
              تیپ کالری تولید آشپزخانه حس خوب:
            </span>
            <span className="text-4xl md:text-5xl font-black text-primary block mb-2 font-sans">
              {toPersianDigits(discreteTier)} کیلوکالری
            </span>
            <span className="text-xs text-muted block">
              شامل منوی چرخشی ۱۴ روزه با ۲ گزینه انتخابی در هر وعده
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-8 text-center">
            <div className="p-3.5 rounded-xl bg-canvas border border-border-default">
              <span className="text-[11px] text-muted block mb-1">پروتئین خالص</span>
              <span className="font-black text-primary text-base font-sans">
                {toPersianDigits(Math.round((discreteTier * 0.3) / 4))}g
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas border border-border-default">
              <span className="text-[11px] text-muted block mb-1">کربوهیدرات پیچیده</span>
              <span className="font-black text-strong text-base font-sans">
                {toPersianDigits(Math.round((discreteTier * 0.45) / 4))}g
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas border border-border-default">
              <span className="text-[11px] text-muted block mb-1">چربی‌های مفید</span>
              <span className="font-black text-strong text-base font-sans">
                {toPersianDigits(Math.round((discreteTier * 0.25) / 9))}g
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={() => setStep(3)}>
              → بازگشت
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setStep(5)}
            >
              انتخاب سطح پوشش پکیج ←
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 5: Coverage Tier Selection */}
      {step === 5 && (
        <Card className="p-6 md:p-8 bg-surface shadow-elevation-2 border-border-default/80">
          <Badge variant="primary" size="md" className="mb-4">
            گام پنجم: سطح پوشش وعده‌ها
          </Badge>
          <h2 className="text-xl md:text-2xl font-black text-strong mb-2">
            کدام سطح پوشش برای زندگی شما مناسب‌تر است؟
          </h2>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            ارسال روزانه بین ۶:۳۰ تا ۸:۳۰ صبح در سراسر مشهد (سجاد، وکیل‌آباد، احمدآباد، ملک‌آباد و...).
          </p>

          <div className="space-y-4 mb-8">
            {programs.flatMap((p) => p.coverageTiers || []).map((tier: any) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`w-full p-4 md:p-5 rounded-2xl border text-start flex items-center justify-between transition-all ${
                  selectedTierId === tier.id
                    ? "border-primary bg-primary-subtle/30 shadow-elevation-1 ring-2 ring-primary/20"
                    : "border-border-default bg-canvas hover:border-border-control"
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-primary block mb-1">
                    {tier.tierType === "FULL_BOARD"
                      ? "فول‌برد ۶ روزه (کامل‌ترین پوشش)"
                      : tier.tierType === "WORKDAY"
                      ? "روز کاری اداری"
                      : "تست ۳ روزه"}
                  </span>
                  <span className="text-base font-black text-strong block mb-1">
                    {tier.tierNameFa}
                  </span>
                  <span className="text-xs text-muted">
                    {tier.mealsIncluded?.join(" + ") || "شامل وعده‌های اصلی"}
                  </span>
                </div>

                <div className="text-end shrink-0">
                  <span className="text-base font-black text-primary block font-sans">
                    {formatToman(tier.basePriceToman)}
                  </span>
                  <span className="text-[11px] text-muted">
                    {toPersianDigits(tier.daysPerWeek)} روز در هفته
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={() => setStep(4)}>
              → بازگشت
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setStep(6)}
            >
              ثبت شماره و ذخیره پیش‌نویس ←
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 6: OTP & Save Draft */}
      {step === 6 && (
        <Card className="p-6 md:p-8 bg-surface shadow-elevation-2 border-border-default/80">
          <Badge variant="primary" size="md" className="mb-4">
            گام نهایی: تایید شماره موبایل
          </Badge>
          <h2 className="text-xl md:text-2xl font-black text-strong mb-2">
            پیش‌نویس برنامه شما آماده است
          </h2>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            شماره موبایل خود را وارد کنید تا کد فعال‌سازی برای شما پیامک شود و پیش‌نویس برنامه در سیستم ثبت گردد.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <TextField
                label="شماره موبایل شما"
                placeholder="۰۹۱۵۱۲۳۴۵۶۷"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent}
                required
              />
            </div>

            {!otpSent ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSendOtp}
                disabled={submitting}
              >
                {submitting ? "در حال ارسال پیامک..." : "دریافت کد تایید یکبارمصرف"}
              </Button>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-strong block mb-3 text-center">
                    کد ۵ رقمی ارسال‌شده را وارد کنید (کد تست: ۱۲۳۴۵)
                  </label>
                  <OtpInput
                    length={5}
                    value={otpCode}
                    onChange={(val) => setOtpCode(val)}
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleVerifyOtp}
                  disabled={submitting}
                >
                  {submitting ? "در حال تایید..." : "تایید و ورود به مرحله تسویه حساب"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode("");
                    }}
                    className="text-xs font-medium text-muted hover:text-primary transition-colors"
                  >
                    ویرایش شماره موبایل
                  </button>
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-warning-subtle text-warning-text border border-warning/40 text-xs mb-4 font-medium">
              {errorMsg}
            </div>
          )}

          <div className="pt-4 border-t border-border-default">
            <button
              type="button"
              onClick={() => setStep(5)}
              className="text-xs font-bold text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <span>→</span>
              <span>بازگشت به ویرایش برنامه</span>
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
