// apps/api/src/modules/nutrition-engine/nutrition-engine.module.ts
import { Module } from "@nestjs/common";
import { NutritionEngineService } from "./nutrition-engine.service";
import { RotationalMenuAllocatorService } from "./rotational-menu-allocator.service";
import { NutritionEngineController } from "./nutrition-engine.controller";

@Module({
  controllers: [NutritionEngineController],
  providers: [NutritionEngineService, RotationalMenuAllocatorService],
  exports: [NutritionEngineService, RotationalMenuAllocatorService],
})
export class NutritionEngineModule {}

