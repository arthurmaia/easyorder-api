import { Injectable } from '@nestjs/common';

import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { OrderStatus } from './order-status.entity';
import { OrderStatusRepository } from './order-status.repository';

@Injectable()
export class OrderStatusService {
	constructor(private orderStatusRepository: OrderStatusRepository) {}

	async createOrderStatus(body: CreateOrderStatusDto): Promise<OrderStatus> {
		return await this.orderStatusRepository.save(body);
	}

	async findAll(): Promise<OrderStatus[]> {
		return await this.orderStatusRepository.find();
	}

	async findByDescription(description: string): Promise<OrderStatus> {
		return await this.orderStatusRepository.findOne({
			where: {
				description,
			},
		});
	}

	async deleteOrderStatus(id: number): Promise<void> {
		await this.orderStatusRepository.delete(id);
	}
}
