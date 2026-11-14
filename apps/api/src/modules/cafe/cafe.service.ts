// apps/api/src/modules/cafe/cafe.service.ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { prisma, DeliveryMethod } from "@hessekhub/database";
import { FinanceLedgerService } from "../finance-ledger/finance-ledger.service";

export interface CreateCafeOrderDto {
  customerId?: string;
  guestMobile?: string;
  deliveryMethod: DeliveryMethod;
  tableNumber?: string;
  isFridayCheatDay?: boolean;
  items: Array<{ cafeMenuItemId: string; quantity: number }>;
}

@Injectable()
export class CafeService {
  constructor(private readonly financeLedger: FinanceLedgerService) {}

  async getCafeMenu() {
    return prisma.cafeMenuItem.findMany({
      where: { isAvailable: true },
      orderBy: [{ categoryFa: "asc" }, { sortOrder: "asc" }],
      include: { mediaAsset: true },
    });
  }

  async createOrder(input: CreateCafeOrderDto) {
    if (!input.items || input.items.length === 0) {
      throw new BadRequestException("سبد خرید نمی‌تواند خالی باشد.");
    }

    const itemIds = input.items.map((i) => i.cafeMenuItemId);
    const menuItems = await prisma.cafeMenuItem.findMany({
      where: { id: { in: itemIds }, isAvailable: true },
    });

    const itemMap = new Map(menuItems.map((m) => [m.id, m]));

    let totalAmountToman = BigInt(0);
    let totalCalories = 0;

    const orderItemsData = input.items.map((item) => {
      const menuItem = itemMap.get(item.cafeMenuItemId);
      if (!menuItem) {
        throw new BadRequestException(`آیتم با شناسه ${item.cafeMenuItemId} در منو موجود نیست.`);
      }

      const itemTotal = menuItem.priceToman * BigInt(item.quantity);
      totalAmountToman += itemTotal;
      totalCalories += menuItem.caloriesKcal * item.quantity;

      return {
        cafeMenuItemId: menuItem.id,
        quantity: item.quantity,
        unitPriceToman: menuItem.priceToman,
      };
    });

    // Create CafeOrder
    const order = await prisma.cafeOrder.create({
      data: {
        customerId: input.customerId,
        guestMobile: input.guestMobile,
        deliveryMethod: input.deliveryMethod,
        tableNumber: input.tableNumber,
        isFridayCheatDay: input.isFridayCheatDay || false,
        totalAmountToman,
        totalCalories,
        items: {
          create: orderItemsData,
        },
      },
      include: { items: { include: { cafeMenuItem: true } } },
    });

    // Create Invoice & initiate IPG
    // If guest, we create a placeholder customer or use customerId
    let customerId = input.customerId;
    if (!customerId && input.guestMobile) {
      const user = await prisma.user.upsert({
        where: { mobile: input.guestMobile },
        update: {},
        create: { mobile: input.guestMobile },
        include: { customer: true },
      });
      if (!user.customer) {
        const cust = await prisma.customer.create({
          data: {
            userId: user.id,
            referralCode: "CF-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          },
        });
        customerId = cust.id;
      } else {
        customerId = user.customer.id;
      }
    }

    if (customerId) {
      const invoice = await this.financeLedger.createInvoice(customerId, totalAmountToman);
      const payment = await this.financeLedger.initiatePayment(invoice.id, input.guestMobile);
      return {
        order,
        invoiceId: invoice.id,
        payableToman: Number(invoice.payableToman),
        authority: payment.authority,
        paymentUrl: payment.paymentUrl,
      };
    }

    return {
      order,
      payableToman: Number(totalAmountToman),
    };
  }
}

