import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { InsertProductsOrderDto } from './dto/insert-products-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('create')
	async createOrder(@Body() body: CreateOrderDto) {
		return this.orderService.createOrder(body);
	}

	@Get('all')
	async findAll() {
		return this.orderService.findAll();
	}

	@Post('insertProductsIntoOrder')
	async insertProductsIntoOrder(@Body() body: InsertProductsOrderDto) {
		return this.orderService.insertProductsIntoOrder(body);
	}

	@Get('getProductsByOrderId/:id')
	async getProductsByOrderId(@Param('id') id: string) {
		return this.orderService.getProductsByOrderId(id);
	}
}
