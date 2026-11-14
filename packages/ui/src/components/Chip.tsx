// packages/ui/src/components/Chip.tsx
import React from "react";
import { cn } from "../utils/cn";

export interface ChipProps {
  label: string;
  isSelected?: boolean;
  onToggle?: (selected: boolean) => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: "md" | "sm";
}

export const Chip: React.FC<ChipProps> = ({
  label,
  isSelected = false,
  onToggle,
  onRemove,
  icon,
  disabled = false,
  className,
  size = "md",
}) => {
  const handleClick = () => {
    if (!disabled && onToggle) {
      onToggle(!isSelected);
    }
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-pill transition-all duration-fast select-none border text-start",
        size === "md" ? "h-9 px-3.5 text-sm gap-2" : "h-7 px-2.5 text-xs gap-1.5",
        isSelected
          ? "bg-primary-subtle text-primary border-primary hover:bg-primary-subtle-hover shadow-elevation-1"
          : "bg-surface text-body border-border-default hover:bg-surface-hover hover:border-border-control active:bg-surface-active",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label={`حذف ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ms-1 hover:text-danger rounded-full p-0.5"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </button>
  );
};

