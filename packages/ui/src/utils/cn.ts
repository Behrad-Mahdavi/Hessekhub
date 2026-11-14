// packages/ui/src/utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Convert English digits to Persian digits
export function toPersianDigits(input: string | number): string {
  const str = String(input);
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (match) => persianDigits[parseInt(match, 10)] ?? match);
}

// Convert Persian digits to English digits (for parsing and API submission)
export function toEnglishDigits(input: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let result = input;
  for (let i = 0; i < persianDigits.length; i++) {
    result = result.replace(new RegExp(persianDigits[i]!, "g"), String(i));
  }
  return result;
}

// Format currency / number in Persian locale (e.g. ۱۲,۵۰۰,۰۰۰ تومان)
export function formatToman(amount: number | bigint): string {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("fa-IR").format(num) + " تومان";
}

