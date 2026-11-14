// apps/api/src/common/guards/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("توکن احراز هویت الزامی است.");
    }

    const token = authHeader.split(" ")[1]!;
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || "hessekhub-jwt-secret-key-1405",
      });
      (request as unknown as { user: unknown }).user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("توکن منقضی یا نامعتبر است.");
    }
  }
}

