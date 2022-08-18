import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PublicOrderDto } from './dto/public-order.dto';
import { InsertProductsOrderDto } from './dto/insert-products-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('create')
	async createOrder(@Body() body: CreateOrderDto): Promise<PublicOrderDto> {
		return this.orderService.createOrder(body);
	}

	@Get('all')
	async findAll(): Promise<PublicOrderDto[]> {
		return this.orderService.findAll();
	}

	@Post('insertProductsIntoOrder')
	async insertProductsIntoOrder(
		@Body() body: InsertProductsOrderDto
	): Promise<boolean> {
		return this.orderService.insertProductsIntoOrder(body);
	}
}
