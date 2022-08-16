import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { OrderStatusService } from './order-status.service';

@Controller('order-status')
export class OrderStatusController {
	constructor(private readonly orderStatusService: OrderStatusService) {}

	@Post('create')
	async createOrderStatus(@Body() body: CreateOrderStatusDto) {
		return await this.orderStatusService.createOrderStatus(body);
	}

	@Get('all')
	async findAll() {
		return await this.orderStatusService.findAll();
	}

	@Delete('delete/:id')
	async deleteOrderStatus(@Param('id') id: number) {
		return await this.orderStatusService.deleteOrderStatus(id);
	}
}
