// apps/api/src/modules/finance-ledger/finance-ledger.module.ts
import { Module } from "@nestjs/common";
import { FinanceLedgerService } from "./finance-ledger.service";
import { ActivationService } from "./activation.service";
import { FinanceLedgerController } from "./finance-ledger.controller";
import { ZarinpalAdapter } from "./payment-gateway.adapter";
import { NutritionEngineModule } from "../nutrition-engine/nutrition-engine.module";

@Module({
  imports: [NutritionEngineModule],
  controllers: [FinanceLedgerController],
  providers: [FinanceLedgerService, ActivationService, ZarinpalAdapter],
  exports: [FinanceLedgerService, ActivationService, ZarinpalAdapter],
})
export class FinanceLedgerModule {}

