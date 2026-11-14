// apps/api/src/modules/logistics/logistics.service.ts
import { Injectable } from "@nestjs/common";
import { prisma } from "@hessekhub/database";

@Injectable()
export class LogisticsService {
  async getDeliveryZones() {
    return prisma.deliveryZone.findMany({
      where: { isActive: true },
      include: { city: true },
    });
  }

  async getDeliverySlots() {
    return prisma.deliverySlot.findMany({
      orderBy: { startTime: "asc" },
    });
  }
}

