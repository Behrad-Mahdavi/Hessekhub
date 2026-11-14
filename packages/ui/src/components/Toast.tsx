// packages/ui/src/components/Toast.tsx
import React from "react";
import { cn } from "../utils/cn";

export type ToastType = "success" | "warning" | "danger" | "info";

export interface ToastProps {
  id: string;
  type?: ToastType;
  title: string;
  message?: string;
  onUndo?: () => void;
  undoLabel?: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = "info",
  title,
  message,
  onUndo,
  undoLabel = "بازگردانی ",
  onClose,
  className,
}) => {
  const typeStyles: Record<ToastType, string> = {
    success: "border-success bg-surface text-strong",
    warning: "border-warning bg-surface text-strong",
    danger: "border-danger bg-surface text-strong",
    info: "border-primary bg-surface text-strong",
  };

  const badgeColors: Record<ToastType, string> = {
    success: "bg-success text-white",
    warning: "bg-warning text-ink",
    danger: "bg-danger text-white",
    info: "bg-primary text-white",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-between gap-4 p-4 rounded-lg border shadow-elevation-3 transition-all duration-base text-start max-w-md w-full bg-surface",
        typeStyles[type],
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "w-2.5 h-2.5 rounded-full mt-1.5 shrink-0",
            badgeColors[type]
          )}
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <span className="font-bold text-sm text-strong">{title}</span>
          {message && <span className="text-xs text-muted mt-0.5 leading-relaxed">{message}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onUndo && (
          <button
            type="button"
            onClick={onUndo}
            className="text-xs font-bold text-primary hover:text-primary-hover underline underline-offset-4 focus-visible:outline-none"
          >
            {undoLabel}
          </button>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن اعلان"
            className="text-muted hover:text-strong p-1 rounded-sm focus-visible:outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
