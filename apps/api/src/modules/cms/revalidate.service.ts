// apps/api/src/modules/cms/revalidate.service.ts
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RevalidateService {
  private readonly logger = new Logger(RevalidateService.name);

  async revalidateTag(tag: string): Promise<boolean> {
    const webUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const secret = process.env.REVALIDATE_WEBHOOK_SECRET || "hessekhub-revalidate-secret-token";

    try {
      const response = await fetch(`${webUrl}/api/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag, secret }),
      });

      if (response.ok) {
        this.logger.log(`[ISR] Successfully revalidated tag: ${tag}`);
        return true;
      } else {
        this.logger.warn(`[ISR] Failed to revalidate tag: ${tag}, status: ${response.status}`);
        return false;
      }
    } catch {
      // In local dev if web is not running, log silently
      this.logger.debug(`[ISR] Web server not reachable for tag: ${tag}`);
      return false;
    }
  }
}

