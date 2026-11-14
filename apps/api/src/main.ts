// apps/api/src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

// Polyfill BigInt serialization for Prisma BigInt fields
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

async function bootstrap() {
  const logger = new Logger("HessekhubBackend");
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`🚀 Hessekhub API Server running on port ${port}`);
}

bootstrap();

