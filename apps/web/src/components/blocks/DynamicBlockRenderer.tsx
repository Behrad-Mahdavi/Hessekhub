// apps/web/src/components/blocks/DynamicBlockRenderer.tsx
import React from "react";
import { HeroLeafBlock } from "./HeroLeafBlock";
import { ValueGridBlock } from "./ValueGridBlock";
import { PackageComparisonBlock, ProgramInfo } from "./PackageComparisonBlock";
import { CafeShowcaseBlock } from "./CafeShowcaseBlock";
import { BmrTeaserBlock } from "./BmrTeaserBlock";
import { FaqAccordionBlock, FaqItemData } from "./FaqAccordionBlock";

export interface CmsBlockData {
  id: string;
  blockType: string;
  orderIndex: number;
  contentJson: any;
}

export interface DynamicBlockRendererProps {
  sections: CmsBlockData[];
  programs?: ProgramInfo[];
  faqs?: FaqItemData[];
}

export function DynamicBlockRenderer({
  sections,
  programs = [],
  faqs = [],
}: DynamicBlockRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {sections.map((section) => {
        const content = section.contentJson || {};

        switch (section.blockType) {
          case "HERO_LEAF":
            return <HeroLeafBlock key={section.id} content={content} />;

          case "VALUE_GRID":
            return <ValueGridBlock key={section.id} content={content} />;

          case "PACKAGE_COMPARISON":
            return (
              <PackageComparisonBlock
                key={section.id}
                content={content}
                programs={programs}
              />
            );

          case "CAFE_SHOWCASE":
            return <CafeShowcaseBlock key={section.id} content={content} />;

          case "BMR_TEASER":
            return <BmrTeaserBlock key={section.id} content={content} />;

          case "FAQ_ACCORDION":
            return (
              <FaqAccordionBlock
                key={section.id}
                content={content}
                faqs={faqs}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

