// apps/api/src/modules/cafe/cafe.module.ts
import { Module } from "@nestjs/common";
import { CafeService } from "./cafe.service";
import { CafeController } from "./cafe.controller";
import { FinanceLedgerModule } from "../finance-ledger/finance-ledger.module";

@Module({
  imports: [FinanceLedgerModule],
  controllers: [CafeController],
  providers: [CafeService],
  exports: [CafeService],
})
export class CafeModule {}

