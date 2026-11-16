import React from "react";
import { HeroLeafBlock } from "./HeroLeafBlock";
import { AppleBentoPromoBlock } from "./AppleBentoPromoBlock";
import { RotationalMenuSliderBlock } from "./RotationalMenuSliderBlock";
import { PackageComparisonBlock, ProgramInfo } from "./PackageComparisonBlock";
import { CafeShowcaseBlock } from "./CafeShowcaseBlock";
import { BmrTeaserBlock } from "./BmrTeaserBlock";
import { FaqAccordionBlock, FaqItemData } from "./FaqAccordionBlock";

export interface CmsBlockData {
  id: string;
  blockType: string;
  orderIndex: number;
  contentJson: Record<string, unknown>;
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
    return (
      <div className="flex flex-col w-full">
        <HeroLeafBlock />
        <AppleBentoPromoBlock />
        <RotationalMenuSliderBlock />
        {programs.length > 0 && <PackageComparisonBlock programs={programs} />}
        <BmrTeaserBlock />
        <CafeShowcaseBlock
          content={{
            titleFa: "کافه‌بوتیک سلامتی حس خوب در مشهد",
            descriptionFa:
              "نخستین کافه‌بوتیک سلامت در مشهد با منوی تخصصی بدون شکر افزوده، قهوه تخصصی و سالادبارهای غنی‌شده.",
            openHoursFa: "همه‌روزه ۸:۰۰ تا ۲۴:۰۰",
            locationAddressFa: "مشهد، بلوار سجاد",
            ctaTextFa: "مشاهده منوی کافه‌بوتیک",
            ctaUrl: "/cafe/menu",
          }}
        />
        {faqs.length > 0 && (
          <FaqAccordionBlock
            content={{ sectionTitleFa: "پرسش‌های متداول مشترکین حس خوب" }}
            faqs={faqs}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {sections.map((section) => {
        const content = (section.contentJson || {}) as any;

        switch (section.blockType) {
          case "HERO_LEAF":
            return <HeroLeafBlock key={section.id} content={content} />;

          case "APPLE_BENTO_PROMO":
          case "VALUE_GRID":
            return <AppleBentoPromoBlock key={section.id} content={content} />;

          case "ROTATIONAL_MENU_SLIDER":
            return <RotationalMenuSliderBlock key={section.id} />;

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