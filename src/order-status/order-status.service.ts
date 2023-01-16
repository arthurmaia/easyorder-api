import { Injectable, OnModuleInit } from '@nestjs/common';
import { In } from 'typeorm';

import { OrderStatusDescriptions, OrderStatusEnum } from 'src/utils/constants';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { OrderStatus } from './order-status.entity';
import { OrderStatusRepository } from './order-status.repository';

@Injectable()
export class OrderStatusService implements OnModuleInit {
	constructor(private orderStatusRepository: OrderStatusRepository) {}

	async createOrderStatus(body: CreateOrderStatusDto): Promise<OrderStatus> {
		return await this.orderStatusRepository.save(body);
	}

	async findAll(): Promise<OrderStatus[]> {
		return await this.orderStatusRepository.find();
	}

	async deleteOrderStatus(id: number): Promise<void> {
		await this.orderStatusRepository.delete(id);
	}

	private async createOrderStatusTable(): Promise<void> {
		const defaultStatuses = Object.values(OrderStatusEnum).filter(
			Number
		) as number[];

		const statuses = await this.orderStatusRepository.find({
			where: {
				id: In(defaultStatuses),
			},
		});

		const nonExistentStatuses = defaultStatuses.filter(
			num => !statuses.find(status => status.externalId === num)
		);

		if (nonExistentStatuses.length) {
			await this.orderStatusRepository.save(
				nonExistentStatuses.map(num => ({
					externalId: num,
					id: crypto.randomUUID(),
					description: OrderStatusDescriptions[num],
				}))
			);
		}
	}

	async onModuleInit() {
		await this.createOrderStatusTable();
	}
}
