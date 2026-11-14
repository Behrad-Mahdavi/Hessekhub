// apps/api/src/modules/cms/cms.controller.ts
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CmsService } from "./cms.service";
import { MediaService, RegisterMediaAssetInput } from "./media.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Prisma, UserRole } from "@hessekhub/database";

@Controller("cms")
export class CmsController {
  constructor(
    private readonly cmsService: CmsService,
    private readonly mediaService: MediaService
  ) {}

  // Public: Get dynamic page by slug (for Next.js SSR/ISR)
  @Get("pages/:slug")
  async getPage(@Param("slug") slug: string) {
    const formattedSlug = slug.startsWith("/") ? slug : `/${slug}`;
    return this.cmsService.getPageBySlug(formattedSlug);
  }

  // Public: Get FAQs
  @Get("faqs")
  async getFaqs(@Query("pageSlug") pageSlug?: string) {
    return this.cmsService.getFaqs(pageSlug);
  }

  // Public: Get all active programs & pricing
  @Get("programs")
  async getPrograms() {
    return this.cmsService.getPrograms();
  }

  // Public: Get single program by slug
  @Get("programs/:slug")
  async getProgram(@Param("slug") slug: string) {
    return this.cmsService.getProgramBySlug(slug);
  }

  // Public: Get programmatic landing for local Mashhad queries
  @Get("mashhad/:intentSlug")
  async getProgrammaticLanding(@Param("intentSlug") intentSlug: string) {
    return this.cmsService.getProgrammaticLanding(intentSlug);
  }

  // Public: Get 301 redirects for middleware
  @Get("redirects")
  async getRedirects() {
    return this.cmsService.getRedirectRules();
  }

  // Public: Entity Graph for GEO
  @Get("entity-graph")
  async getEntityGraph() {
    return this.cmsService.getEntityGraph();
  }

  // Admin: Update section block
  @Patch("blocks/:id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.MARKETING_EDITOR, UserRole.SUPER_ADMIN, UserRole.OPS_MANAGER)
  async updateBlock(
    @Param("id") id: string,
    @Body("contentJson") contentJson: Prisma.InputJsonValue,
    @Body("isVisible") isVisible?: boolean
  ) {
    return this.cmsService.updateSectionBlock(id, contentJson, isVisible);
  }

  // Admin: Update SEO / GEO / AEO meta
  @Patch("seo/:id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.MARKETING_EDITOR, UserRole.SUPER_ADMIN)
  async updateSeoMeta(
    @Param("id") id: string,
    @Body() body: { metaTitleFa?: string; metaDescriptionFa?: string; directAnswerCapsuleFa?: string; llmFactSummaryMd?: string }
  ) {
    return this.cmsService.updateSeoMeta(id, body);
  }

  // Admin: Register media asset
  @Post("media")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.MARKETING_EDITOR, UserRole.SUPER_ADMIN, UserRole.OPS_MANAGER)
  async registerMedia(@Body() input: RegisterMediaAssetInput) {
    return this.mediaService.registerMediaAsset(input);
  }

  // Public/Admin: List media assets
  @Get("media")
  async listMedia(@Query("tag") tag?: string) {
    return this.mediaService.listMediaAssets(tag);
  }
}

