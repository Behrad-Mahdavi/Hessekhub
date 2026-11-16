// packages/ui/src/components/Badge.tsx
import React from "react";
import { cn } from "../utils/cn";

export type BadgeVariant = "primary" | "success" | "warning" | "danger" | "neutral" | "accent" | "luxe" | "calm" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    primary: "bg-primary-subtle text-primary border-primary",
    success: "bg-success-subtle text-success border-success",
    warning: "bg-warning-subtle text-warning border-warning",
    danger: "bg-danger-subtle text-danger border-danger",
    neutral: "bg-subtle text-muted border-border-default",
    accent: "bg-accent text-ink border-transparent font-bold",
    luxe: "bg-luxe-subtle text-luxe-text border-luxe font-medium",
    calm: "bg-calm text-strong border-border-default font-medium",
    info: "bg-primary-subtle text-primary border-primary",
  };

  const dotColors: Record<BadgeVariant, string> = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    neutral: "bg-muted",
    accent: "bg-ink",
    luxe: "bg-luxe",
    calm: "bg-primary",
    info: "bg-primary",
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs md:text-sm gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-pill border select-none transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
};

