// apps/api/src/app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./common/redis/redis.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CmsModule } from "./modules/cms/cms.module";
import { NutritionEngineModule } from "./modules/nutrition-engine/nutrition-engine.module";
import { FinanceLedgerModule } from "./modules/finance-ledger/finance-ledger.module";
import { CafeModule } from "./modules/cafe/cafe.module";
import { LogisticsModule } from "./modules/logistics/logistics.module";
import { OnboardingModule } from "./modules/onboarding/onboarding.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "../../.env"],
    }),
    RedisModule,
    AuthModule,
    CmsModule,
    NutritionEngineModule,
    FinanceLedgerModule,
    CafeModule,
    LogisticsModule,
    OnboardingModule,
  ],
})
export class AppModule {}

