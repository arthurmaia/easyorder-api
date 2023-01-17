import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PublicOrderDto } from './dto/public-order.dto';
import { InsertProductsOrderDto } from './dto/insert-products-order.dto';
import { OrderHasProductService } from 'src/order-has-product/order-has-product.service';
import { Product } from 'src/product/product.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly orderHasProductService: OrderHasProductService
	) {}

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
		return this.orderHasProductService.getProductsByOrderId(id);
	}
}
