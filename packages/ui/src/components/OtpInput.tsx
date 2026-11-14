"use client";

// packages/ui/src/components/OtpInput.tsx
import React, { useRef, useEffect } from "react";
import { cn, toEnglishDigits, toPersianDigits } from "../utils/cn";

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isError?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 5,
  value = "",
  onChange,
  disabled = false,
  isError = false,
  autoFocus = true,
  className,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const rawVal = toEnglishDigits(e.target.value).replace(/\D/g, "");
    if (!rawVal) return;

    const char = rawVal[rawVal.length - 1]!;
    const valArray = value.split("");
    valArray[index] = char;
    const newVal = valArray.join("").slice(0, length);
    onChange(newVal);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const valArray = value.split("");
      if (valArray[index]) {
        valArray[index] = "";
        onChange(valArray.join(""));
      } else if (index > 0) {
        valArray[index - 1] = "";
        onChange(valArray.join(""));
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    } else if (e.key === "ArrowRight" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = toEnglishDigits(e.clipboardData.getData("text/plain")).replace(/\D/g, "");
    if (!pastedData) return;

    const trimmed = pastedData.slice(0, length);
    onChange(trimmed);

    const nextIndex = Math.min(trimmed.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div dir="ltr" className={cn("flex items-center justify-center gap-3", className)}>
      {Array.from({ length }).map((_, index) => {
        const char = value[index] || "";
        const displayChar = char ? toPersianDigits(char) : "";

        return (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={displayChar}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={cn(
              "w-12 h-14 text-center text-2xl font-bold font-sans rounded-md border bg-surface text-strong transition-all duration-fast select-none focus:outline-none shadow-sm",
              isError
                ? "border-danger text-danger focus:ring-2 focus:ring-danger/20"
                : "border-border-default hover:border-border-control focus:border-primary focus:ring-2 focus:ring-primary/20",
              disabled && "bg-disabled text-faint cursor-not-allowed",
              char && !isError && "border-primary bg-primary-subtle text-primary"
            )}
            aria-label={`رقم ${index + 1} از ${length}`}
          />
        );
      })}
    </div>
  );
};

