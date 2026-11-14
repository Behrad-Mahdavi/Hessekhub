// packages/ui/src/components/LeafCard.tsx
import React, { forwardRef } from "react";
import { cn } from "../utils/cn";
import { CardProps } from "./Card";

export interface LeafCardProps extends CardProps {
  glowBorder?: boolean;
}

export const LeafCard = forwardRef<HTMLDivElement, LeafCardProps>(
  ({ className, glowBorder = false, isInteractive, interactive, children, ...props }, ref) => {
    const activeInteractive = isInteractive || interactive;
    return (
      <div
        ref={ref}
        className={cn(
          "hk-leaf-card bg-surface border border-border-subtle p-6 md:p-8 text-start transition-all duration-base",
          glowBorder && "border-primary shadow-elevation-2",
          activeInteractive &&
            "hover:-translate-y-0.5 hover:shadow-elevation-3 hover:border-primary cursor-pointer active:scale-[0.99]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LeafCard.displayName = "LeafCard";

