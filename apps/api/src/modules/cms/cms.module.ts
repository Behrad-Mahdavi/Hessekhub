// apps/api/src/modules/cms/cms.module.ts
import { Module } from "@nestjs/common";
import { CmsService } from "./cms.service";
import { CmsController } from "./cms.controller";
import { MediaService } from "./media.service";
import { RevalidateService } from "./revalidate.service";

@Module({
  controllers: [CmsController],
  providers: [CmsService, MediaService, RevalidateService],
  exports: [CmsService, MediaService, RevalidateService],
})
export class CmsModule {}

