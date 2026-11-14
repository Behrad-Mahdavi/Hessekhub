// apps/api/src/common/interceptors/audit-log.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { prisma } from "@hessekhub/database";
import { CurrentUserPayload } from "../decorators/current-user.decorator";
import { Request } from "express";

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private readonly actionName: string,
    private readonly entityType: string
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request & { user?: CurrentUserPayload }>();
    const actorId = request.user?.userId;
    const ipAddress = request.ip || (request.headers["x-forwarded-for"] as string) || "127.0.0.1";
    const entityId = (request.params["id"] || request.params["customerId"] || "UNKNOWN") as string;

    return next.handle().pipe(
      tap(async () => {
        try {
          await prisma.auditLog.create({
            data: {
              actorId: actorId || null,
              action: this.actionName,
              entityType: this.entityType,
              entityId: entityId,
              ipAddress: typeof ipAddress === "string" ? ipAddress : String(ipAddress),
            },
          });
        } catch (err) {
          console.error("Failed to persist AuditLog:", err);
        }
      })
    );
  }
}

