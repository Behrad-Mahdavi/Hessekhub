"use client";

// packages/ui/src/components/BottomSheet.tsx
import React, { useEffect, useRef } from "react";
import { cn } from "../utils/cn";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "sheet-title" : undefined}
      className="fixed inset-0 z-modal flex flex-col justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-backdrop transition-opacity duration-base"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div
        ref={sheetRef}
        className={cn(
          "relative z-10 w-full max-w-lg mx-auto bg-surface rounded-t-xl border-t border-border-default p-6 shadow-elevation-3 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-base text-start",
          className
        )}
      >
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-border-control rounded-full mx-auto mb-4 shrink-0" aria-hidden="true" />

        {/* Header */}
        {(title || description) && (
          <div className="mb-4 text-start">
            {title && (
              <h3 id="sheet-title" className="text-lg font-bold text-strong">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

