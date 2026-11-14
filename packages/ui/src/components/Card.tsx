// packages/ui/src/components/Card.tsx
import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

export type CardVariant = "elevated" | "outlined" | "sunken" | "calm";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  isInteractive?: boolean;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "outlined",
      padding = "md",
      isInteractive = false,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    const activeInteractive = isInteractive || interactive;
    const variantStyles: Record<CardVariant, string> = {
      outlined: "bg-surface border border-border-subtle",
      elevated: "bg-surface border border-border-subtle shadow-elevation-2",
      sunken: "bg-sunken border-transparent",
      calm: "bg-calm border border-border-default",
    };

    const paddingStyles = {
      none: "p-0",
      sm: "p-3 md:p-4",
      md: "p-4 md:p-6",
      lg: "p-6 md:p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg text-start transition-all duration-base",
          variantStyles[variant],
          paddingStyles[padding],
          activeInteractive &&
            "hover:-translate-y-0.5 hover:shadow-elevation-3 hover:border-border-control cursor-pointer active:scale-[0.99] active:translate-y-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

