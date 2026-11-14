// packages/ui/src/components/Skeleton.tsx
import React from "react";
import { cn } from "../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rounded",
  width,
  height,
  style,
  ...props
}) => {
  const variantStyles = {
    text: "h-4 w-full rounded-xs",
    circular: "rounded-full",
    rectangular: "rounded-0",
    rounded: "rounded-md",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-subtle select-none pointer-events-none",
        variantStyles[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};

