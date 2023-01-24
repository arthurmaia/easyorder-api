import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { OrderStatusService } from './order-status.service';

@ApiTags('order-status')
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
	async deleteOrderStatus(@Param('id') id: string) {
		return await this.orderStatusService.deleteOrderStatus(id);
	}
}
