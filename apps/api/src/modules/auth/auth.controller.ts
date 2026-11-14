// apps/api/src/modules/auth/auth.controller.ts
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CurrentUser, CurrentUserPayload } from "../../common/decorators/current-user.decorator";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("otp/send")
  async sendOtp(@Body("mobile") mobile: string) {
    return this.authService.sendOtp(mobile);
  }

  @Post("otp/verify")
  async verifyOtp(
    @Body("mobile") mobile: string,
    @Body("code") code: string,
    @Req() req: Request
  ) {
    const deviceInfo = req.headers["user-agent"] as string;
    const ipAddress = req.ip || (req.headers["x-forwarded-for"] as string);
    return this.authService.verifyOtp(mobile, code, deviceInfo, ipAddress);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.getMe(user.userId);
  }
}

