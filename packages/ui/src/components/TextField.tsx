// packages/ui/src/components/TextField.tsx
import React, { forwardRef, useId } from "react";
import { cn } from "../utils/cn";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  isFullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      startAdornment,
      endAdornment,
      isFullWidth = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const isError = Boolean(errorMessage);

    return (
      <div className={cn("flex flex-col gap-1.5 text-start", isFullWidth ? "w-full" : "w-auto")}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium transition-colors select-none",
              isError ? "text-danger" : disabled ? "text-faint" : "text-strong"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {startAdornment && (
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-muted pointer-events-none">
              {startAdornment}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={isError}
            aria-describedby={isError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              "w-full h-control min-h-hit bg-surface text-strong text-base px-4 rounded-md border transition-all duration-fast placeholder:text-faint font-sans focus:outline-none",
              "[[data-density='compact']_&]:h-control [[data-density='compact']_&]:text-sm",
              isError
                ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                : "border-border-default hover:border-border-control focus:border-primary focus:ring-2 focus:ring-primary/20",
              disabled && "bg-disabled text-faint border-border-disabled cursor-not-allowed",
              startAdornment ? "ps-10" : "ps-4",
              endAdornment ? "pe-10" : "pe-4",
              className
            )}
            {...props}
          />

          {endAdornment && (
            <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted">
              {endAdornment}
            </span>
          )}
        </div>

        {errorMessage ? (
          <span id={`${inputId}-error`} className="text-xs text-danger font-medium select-none" role="alert">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={`${inputId}-helper`} className="text-xs text-muted select-none">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = "TextField";

