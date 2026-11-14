// packages/ui/src/components/EmptyState.tsx
import React from "react";
import { BRAND_GLYPHS, BrandGlyphId } from "@hessekhub/design-tokens";
import { cn } from "../utils/cn";
import { Button } from "./Button";

export interface EmptyStateProps {
  glyphId?: BrandGlyphId;
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  glyphId = "plate",
  title,
  description,
  actionTitle,
  onAction,
  className,
}) => {
  const glyph = BRAND_GLYPHS[glyphId];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 max-w-md mx-auto select-none",
        className
      )}
    >
      {glyph && (
        <div
          className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-calm border border-border-default shadow-elevation-1"
          style={{ borderColor: glyph.semanticColorToken }}
        >
          <img
            src={glyph.path}
            alt={glyph.faTitle}
            className="w-12 h-12 object-contain"
            loading="lazy"
          />
        </div>
      )}

      <h3 className="text-xl font-bold text-strong mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed mb-6 max-w-[45ch]">
        {description}
      </p>

      {actionTitle && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionTitle}
        </Button>
      )}
    </div>
  );
};
