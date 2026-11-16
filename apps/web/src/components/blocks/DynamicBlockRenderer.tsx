// apps/web/src/components/blocks/DynamicBlockRenderer.tsx
import React from "react";
import { HeroLeafBlock } from "./HeroLeafBlock";
import { ProgramInfo } from "./PackageComparisonBlock";
import { AppleBentoPromoBlock } from "./AppleBentoPromoBlock";
import { RotationalMenuSliderBlock } from "./RotationalMenuSliderBlock";
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
  faqs = [],
}: DynamicBlockRendererProps) {
  if (!sections || sections.length === 0) {
    // Elegant fallback to complete Apple Homepage experience
    return (
      <div className="flex flex-col w-full">
        <HeroLeafBlock
          content={{
            headlineFa: "حس خوب زندگی سالم، در هر وعده غذای شما.",
            subheadlineFa:
              "طبخ روزانه با مواد اولیه ارگانیک و کنترل گرمی ماکروها، تحت نظارت کارشناس ارشد تغذیه، با ارسال اختصاصی صبحگاهی به تمام نقاط مشهد.",
            primaryCtaTitleFa: "محاسبه کالری و شروع اشتراک",
            primaryCtaUrl: "/start",
            secondaryCtaTitleFa: "مشاهده و مقایسه پکیج‌ها",
            secondaryCtaUrl: "/programs",
          }}
        />
        <AppleBentoPromoBlock />
        <RotationalMenuSliderBlock />
        <BmrTeaserBlock />
        <CafeShowcaseBlock
          content={{
            titleFa: "کافه‌بوتیک سلامت حس خوب در مشهد؛ تلفیق طعم اصیل و تغذیه بالینی",
            descriptionFa:
              "نخستین کافه‌بوتیک سلامت در مشهد با منوی تخصصی بدون شکر افزوده، قهوه تخصصی و سالادبارهای غنی‌شده.",
            openHoursFa: "همه‌روزه ۸:۰۰ تا ۲۴:۰۰",
            locationAddressFa: "مشهد، بلوار هاشمیه",
            ctaTextFa: "مشاهده منوی کافه‌بوتیک",
            ctaUrl: "/cafe/menu",
          }}
        />
        {faqs.length > 0 && <FaqAccordionBlock content={{ sectionTitleFa: "پرسش‌های متداول مشترکین حس خوب" }} faqs={faqs} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {sections.map((section) => {
        const content = section.contentJson || {};

        switch (section.blockType) {
          case "HERO_LEAF":
            return <HeroLeafBlock key={section.id} content={content} />;

          case "APPLE_BENTO_PROMO":
            return <AppleBentoPromoBlock key={section.id} content={content} />;

          case "ROTATIONAL_MENU_SLIDER":
            return <RotationalMenuSliderBlock key={section.id} />;

          case "VALUE_GRID":
            // Render Apple Bento Promo Grid
            return <AppleBentoPromoBlock key={section.id} content={content} />;

          case "PACKAGE_COMPARISON":
            return (
              <React.Fragment key={section.id}>
                <AppleBentoPromoBlock content={content} />
                <RotationalMenuSliderBlock />
              </React.Fragment>
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
