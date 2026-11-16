// apps/api/src/modules/cms/cms.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { prisma, Prisma } from "@hessekhub/database";
import { RevalidateService } from "./revalidate.service";

@Injectable()
export class CmsService {
  constructor(private readonly revalidateService: RevalidateService) {}

  async getPageBySlug(slug: string) {
    const page = await prisma.cmsPage.findUnique({
      where: { slug },
      include: {
        seoMeta: true,
        sections: {
          where: { isVisible: true },
          orderBy: { orderIndex: "asc" },
        },
        faqs: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!page) {
      throw new NotFoundException(`صفحه با مسیر ${slug} یافت نشد.`);
    }

    return page;
  }

  async updateSectionBlock(blockId: string, contentJson: Prisma.InputJsonValue, isVisible?: boolean) {
    const block = await prisma.cmsSectionBlock.update({
      where: { id: blockId },
      data: {
        contentJson,
        ...(isVisible !== undefined && { isVisible }),
      },
      include: { page: true },
    });

    // Trigger on-demand ISR revalidation for this page
    await this.revalidateService.revalidateTag(`page:${block.page.slug}`);
    return block;
  }

  async updateSeoMeta(
    seoId: string,
    data: {
      metaTitleFa?: string;
      metaDescriptionFa?: string;
      directAnswerCapsuleFa?: string;
      llmFactSummaryMd?: string;
    }
  ) {
    const updated = await prisma.seoGeoMeta.update({
      where: { id: seoId },
      data,
      include: { cmsPage: true },
    });

    if (updated.cmsPage) {
      await this.revalidateService.revalidateTag(`page:${updated.cmsPage.slug}`);
    }
    await this.revalidateService.revalidateTag("llms-txt");
    return updated;
  }

  async getFaqs(pageSlug?: string) {
    return prisma.faqItem.findMany({
      where: pageSlug ? { page: { slug: pageSlug } } : undefined,
      orderBy: { orderIndex: "asc" },
    });
  }

  async getSiteSettings() {
    return prisma.siteSetting.findMany();
  }

  async setSiteSetting(key: string, valueJson: Prisma.InputJsonValue, description?: string) {
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { valueJson, ...(description && { description }) },
      create: { key, valueJson, description },
    });
    await this.revalidateService.revalidateTag("seo:global");
    return setting;
  }

  async getPrograms() {
    return prisma.programTemplate.findMany({
      where: { isActive: true },
      include: {
        coverageTiers: { where: { isActive: true }, orderBy: { basePriceToman: "desc" } },
        seoMeta: true,
      },
      orderBy: { sortOrder: "asc" },
    });
  }

  async getProgramBySlug(slug: string) {
    const program = await prisma.programTemplate.findUnique({
      where: { slug },
      include: {
        phases: { orderBy: { orderIndex: "asc" } },
        coverageTiers: { where: { isActive: true }, orderBy: { basePriceToman: "desc" } },
        seoMeta: true,
      },
    });

    if (!program) {
      throw new NotFoundException(`برنامه با شناسه ${slug} یافت نشد.`);
    }

    return program;
  }

  async getProgrammaticLanding(intentSlug: string) {
    const landing = await prisma.programmaticLanding.findUnique({
      where: { intentSlug },
      include: { seoMeta: true },
    });

    if (!landing) {
      throw new NotFoundException(`صفحه محلی ${intentSlug} یافت نشد.`);
    }

    return landing;
  }

  async getRedirectRules() {
    return prisma.redirectRule.findMany();
  }

  async getEntityGraph() {
    const branch = await prisma.branch.findFirst({ where: { isActive: true } });
    const programs = await this.getPrograms();

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Organization", "HealthAndBeautyBusiness", "Restaurant"],
          "@id": "https://hessekhub.ir/#organization",
          name: "حس خوب | Hessekhub",
          url: "https://hessekhub.ir",
          foundingDate: "2018",
          telephone: branch?.phone || "05137660000",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mashhad",
            streetAddress: branch?.addressFa || "مشهد، بلوار هاشمیه",
            addressCountry: "IR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: branch?.latitude || 36.3155,
            longitude: branch?.longitude || 59.5421,
          },
          servesCuisine: "Healthy Diet & Organic Persian/International",
          openingHours: branch?.openingHours || "08:00-24:00",
        },
        ...programs.map((p) => ({
          "@type": "Product",
          name: p.titleFa,
          description: p.subtitleFa,
          brand: { "@id": "https://hessekhub.ir/#organization" },
          offers: p.coverageTiers.map((t) => ({
            "@type": "Offer",
            name: t.titleFa,
            price: Number(t.basePriceToman) * 10, // IRR
            priceCurrency: "IRR",
            availability: "https://schema.org/InStock",
            areaServed: "Mashhad",
          })),
        })),
      ],
    };
  }
}

