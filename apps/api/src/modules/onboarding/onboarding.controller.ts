// apps/api/src/modules/onboarding/onboarding.controller.ts
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OnboardingService } from "./onboarding.service";

@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post("draft")
  async saveDraft(@Body("key") key: string, @Body("data") data: Record<string, unknown>) {
    return this.onboardingService.saveDraft(key, data);
  }

  @Get("draft/:key")
  async getDraft(@Param("key") key: string) {
    return this.onboardingService.getDraft(key);
  }
}

