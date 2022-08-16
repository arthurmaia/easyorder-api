import { Injectable } from '@nestjs/common';

import { OrderStatus } from 'src/order-status/order-status.entity';
import { OrderStatusRepository } from 'src/order-status/order-status.repository';
import { OrderStatusEnum } from 'src/utils/constants';
import { CreateOrderDto } from './dto/create-order.dto';
import { PublicOrderDto } from './dto/public-order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
	constructor(
		private orderRepository: OrderRepository,
		private orderStatusRepository: OrderStatusRepository
	) {}

	async createOrder(body: CreateOrderDto): Promise<Order> {
		const order = new Order();

		order.deviceId = body.deviceId;

		order.status = { id: OrderStatusEnum.PENDING } as OrderStatus;

		return this.orderRepository.save(order);
	}

	async findAll(): Promise<PublicOrderDto[]> {
		const allOrders = await this.orderRepository.find({
			relations: ['status'],
		});

		return allOrders.map(
			order =>
				({
					id: order.id,
					deviceId: order.deviceId,
					status: order.status.description,
				} as PublicOrderDto)
		);
	}
}
