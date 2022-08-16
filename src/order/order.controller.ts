import { Body, Controller, Get, Post } from '@nestjs/common';

import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { PublicOrderDto } from './dto/public-order.dto';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('create')
	async createOrder(@Body() body: CreateOrderDto): Promise<Order> {
		return this.orderService.createOrder(body);
	}

	@Get('all')
	async findAll(): Promise<PublicOrderDto[]> {
		return this.orderService.findAll();
	}
}
