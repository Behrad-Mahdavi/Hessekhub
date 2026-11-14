// apps/api/src/modules/logistics/logistics.controller.ts
import { Controller, Get } from "@nestjs/common";
import { LogisticsService } from "./logistics.service";

@Controller("logistics")
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get("zones")
  async getZones() {
    return this.logisticsService.getDeliveryZones();
  }

  @Get("slots")
  async getSlots() {
    return this.logisticsService.getDeliverySlots();
  }
}

