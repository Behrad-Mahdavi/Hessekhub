// apps/api/src/modules/auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { prisma, UserRole } from "@hessekhub/database";
import { RedisService } from "../../common/redis/redis.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redis: RedisService
  ) {}

  async sendOtp(mobile: string): Promise<{ success: boolean; message: string; ttlSeconds: number; devCode?: string }> {
    const rateLimitKey = `rate:otp:${mobile}`;
    const isRateLimited = await this.redis.get(rateLimitKey);
    if (isRateLimited) {
      throw new BadRequestException("لطفاً ۶۰ ثانیه قبل از درخواست مجدد صبر کنید.");
    }

    // In dev / sandbox: generate 5-digit code or deterministic code
    const isDev = process.env.NODE_ENV !== "production";
    const otpCode = isDev ? "12345" : Math.floor(10000 + Math.random() * 90000).toString();

    const otpKey = `otp:${mobile}`;
    const ttlSeconds = parseInt(process.env.OTP_TTL_SECONDS || "120", 10);

    await this.redis.set(otpKey, otpCode, ttlSeconds);
    await this.redis.set(rateLimitKey, "1", 60);

    console.log(`[SMS Gateway Mock] Sent OTP to ${mobile}: ${otpCode}`);

    return {
      success: true,
      message: "کد تایید پیامک شد.",
      ttlSeconds,
      ...(isDev && { devCode: otpCode }),
    };
  }

  async verifyOtp(
    mobile: string,
    code: string,
    deviceInfo?: string,
    ipAddress?: string
  ): Promise<{ accessToken: string; user: { id: string; mobile: string; role: UserRole; customerId?: string } }> {
    const otpKey = `otp:${mobile}`;
    const storedCode = await this.redis.get(otpKey);

    if (!storedCode || storedCode !== code) {
      throw new UnauthorizedException("کد تایید اشتباه است یا منقضی شده است.");
    }

    // Delete used OTP
    await this.redis.del(otpKey);

    // Upsert User
    const user = await prisma.user.upsert({
      where: { mobile },
      update: {},
      create: {
        mobile,
        role: UserRole.CUSTOMER,
      },
      include: { customer: true },
    });

    let customerId = user.customer?.id;

    // Create Customer profile if role is CUSTOMER and customer doesn't exist
    if (!customerId && user.role === UserRole.CUSTOMER) {
      const referralCode = "HK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const customer = await prisma.customer.create({
        data: {
          userId: user.id,
          referralCode,
        },
      });
      customerId = customer.id;
    }

    const payload = {
      userId: user.id,
      mobile: user.mobile,
      role: user.role,
      customerId,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET || "hessekhub-jwt-secret-key-1405",
      expiresIn: "30d",
    });

    // Create Session
    const tokenHash = "token_" + Math.random().toString(36).substring(2, 15);
    await prisma.session.create({
      data: {
        userId: user.id,
        tokenHash,
        deviceInfo: deviceInfo || "Unknown Device",
        ipAddress: ipAddress || "127.0.0.1",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      user: {
        id: user.id,
        mobile: user.mobile,
        role: user.role,
        customerId,
      },
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        customer: {
          include: {
            healthProfiles: { orderBy: { version: "desc" }, take: 1 },
            subscriptions: { where: { status: "ACTIVE" }, take: 1 },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException("کاربر یافت نشد.");
    }

    return user;
  }
}

