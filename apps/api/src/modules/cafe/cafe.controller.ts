import { Body, Controller, Get, Post } from "@nestjs/common";
import { CafeService, CreateCafeOrderDto } from "./cafe.service";

@Controller("cafe")
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Get("menu")
  async getMenu() {
    return this.cafeService.getCafeMenu();
  }

  @Post("orders")
  async createOrder(@Body() body: CreateCafeOrderDto) {
    return this.cafeService.createOrder(body);
  }
}
