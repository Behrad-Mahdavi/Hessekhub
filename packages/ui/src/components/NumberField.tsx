// packages/ui/src/components/NumberField.tsx
import React, { forwardRef } from "react";
import { TextField, TextFieldProps } from "./TextField";
import { toEnglishDigits, toPersianDigits } from "../utils/cn";

export interface NumberFieldProps extends Omit<TextFieldProps, "type" | "onChange" | "value"> {
  value?: number | "";
  onChange?: (value: number | "") => void;
  unitLabel?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ value, onChange, unitLabel, min, max, dir = "rtl", onBlur, ...props }, ref) => {
    const displayValue = value !== undefined && value !== "" ? toPersianDigits(value) : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawText = e.target.value;
      const cleanEnglish = toEnglishDigits(rawText).replace(/[^\d.-]/g, "");

      if (cleanEnglish === "" || cleanEnglish === "-") {
        onChange?.("");
        return;
      }

      const parsed = parseFloat(cleanEnglish);
      if (!isNaN(parsed)) {
        if (max !== undefined && parsed > max) {
          onChange?.(max);
          return;
        }
        onChange?.(parsed);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      if (typeof value === "number" && min !== undefined && value < min) {
        onChange?.(min);
      }
    };

    return (
      <TextField
        ref={ref}
        type="text"
        inputMode="decimal"
        dir={dir}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        endAdornment={
          unitLabel ? (
            <span className="text-xs sm:text-sm font-medium text-muted select-none pointer-events-none">
              {unitLabel}
            </span>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

NumberField.displayName = "NumberField";

