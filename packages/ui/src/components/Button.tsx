// packages/ui/src/components/Button.tsx
import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "tonal" | "accent" | "ghost" | "danger";
export type ButtonSize = "lg" | "md" | "sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isFullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      isFullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-fast select-none relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:bg-disabled disabled:text-faint active:scale-[0.98]";

    const densityRadius =
      "rounded-pill [[data-density='compact']_&]:rounded-md";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-elevation-1",
      secondary:
        "bg-surface text-strong border border-border-control hover:bg-surface-hover active:bg-surface-active",
      tonal:
        "bg-primary-subtle text-primary hover:bg-primary-subtle-hover",
      accent:
        "bg-accent text-ink hover:bg-accent-hover font-bold shadow-elevation-1",
      ghost:
        "bg-transparent text-body hover:bg-surface-hover active:bg-surface-active",
      danger:
        "bg-danger text-white hover:bg-danger-hover",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      lg: "h-[54px] min-h-hit px-8 text-base md:text-lg font-bold gap-2.5 [[data-density='compact']_&]:h-control [[data-density='compact']_&]:px-5 [[data-density='compact']_&]:text-base",
      md: "h-control min-h-hit px-6 text-base gap-2 [[data-density='compact']_&]:h-control [[data-density='compact']_&]:px-4 [[data-density='compact']_&]:text-sm",
      sm: "h-control-sm min-h-[44px] px-4 text-sm gap-1.5 [[data-density='compact']_&]:h-control-sm [[data-density='compact']_&]:px-3 [[data-density='compact']_&]:text-xs",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          baseStyles,
          densityRadius,
          variantStyles[variant],
          sizeStyles[size],
          isFullWidth ? "w-full" : "w-auto",
          className
        )}
        {...props}
      >
        {isLoading && (
          <span
            data-loading-spinner
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit"
          >
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}

        <span className={cn("inline-flex items-center gap-2", isLoading && "invisible")}>
          {startIcon && <span className="inline-flex shrink-0">{startIcon}</span>}
          <span>{children}</span>
          {endIcon && <span className="inline-flex shrink-0">{endIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

