// apps/api/src/modules/cms/media.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { prisma, MediaAsset } from "@hessekhub/database";

export interface RegisterMediaAssetInput {
  fileName: string;
  mimeType: string;
  altTextFa: string;
  captionFa?: string;
  width?: number;
  height?: number;
  tags?: string[];
}

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  async registerMediaAsset(input: RegisterMediaAssetInput): Promise<MediaAsset> {
    const s3Endpoint = process.env.S3_ENDPOINT || "http://localhost:9000";
    const bucket = process.env.S3_PUBLIC_BUCKET || "hessekhub-media";
    const storageKey = `uploads/${Date.now()}-${input.fileName}`;
    const publicUrl = `${s3Endpoint}/${bucket}/${storageKey}`;
    const webpUrl = `${s3Endpoint}/${bucket}/${storageKey}.webp`;
    const avifUrl = `${s3Endpoint}/${bucket}/${storageKey}.avif`;

    const asset = await prisma.mediaAsset.create({
      data: {
        fileName: input.fileName,
        storageKey,
        publicUrl,
        webpUrl,
        avifUrl,
        mimeType: input.mimeType,
        width: input.width || 1200,
        height: input.height || 800,
        altTextFa: input.altTextFa,
        captionFa: input.captionFa,
        tags: input.tags || [],
      },
    });

    this.logger.log(`[Media] Registered asset ${asset.id} for ${input.fileName}`);
    return asset;
  }

  async listMediaAssets(tag?: string): Promise<MediaAsset[]> {
    return prisma.mediaAsset.findMany({
      where: tag ? { tags: { has: tag } } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }
}

