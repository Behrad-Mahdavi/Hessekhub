// apps/api/src/modules/onboarding/onboarding.service.ts
import { Injectable } from "@nestjs/common";
import { RedisService } from "../../common/redis/redis.service";

@Injectable()
export class OnboardingService {
  constructor(private readonly redis: RedisService) {}

  async saveDraft(key: string, data: Record<string, unknown>) {
    const draftKey = `draft:${key}`;
    // 7 days TTL (604800 seconds)
    await this.redis.set(draftKey, JSON.stringify(data), 604800);
    return { success: true, key };
  }

  async getDraft(key: string): Promise<Record<string, unknown> | null> {
    const draftKey = `draft:${key}`;
    const raw = await this.redis.get(draftKey);
    return raw ? JSON.parse(raw) : null;
  }
}

