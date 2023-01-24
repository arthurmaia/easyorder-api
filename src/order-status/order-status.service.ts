import { Injectable, OnModuleInit } from '@nestjs/common';
import { In } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { OrderStatusDescriptions, OrderStatusEnum } from 'src/utils/constants';
import { OrderStatus } from './order-status.entity';
import { OrderStatusRepository } from './order-status.repository';

@Injectable()
export class OrderStatusService implements OnModuleInit {
	constructor(private orderStatusRepository: OrderStatusRepository) {}

	async createOrderStatus(body: CreateOrderStatusDto): Promise<OrderStatus> {
		const lastExternalId = await this.orderStatusRepository.find({
			order: {
				externalId: 'DESC',
			},
		});

		const externalId = lastExternalId[0].externalId + 1;

		return await this.orderStatusRepository.save({
			...body,
			externalId,
		});
	}

	async findAll(): Promise<OrderStatus[]> {
		return await this.orderStatusRepository.find();
	}

	async findByExternalId(externalId: number): Promise<OrderStatus> {
		return await this.orderStatusRepository.findOne({
			where: {
				externalId,
			},
		});
	}

	async deleteOrderStatus(id: string): Promise<void> {
		await this.orderStatusRepository.delete(id);
	}

	private async createOrderStatusTable(): Promise<void> {
		const defaultStatuses = Object.values(OrderStatusEnum).filter(
			Number
		) as number[];

		const statuses = await this.orderStatusRepository.find({
			where: {
				externalId: In(defaultStatuses),
			},
		});

		const nonExistentStatuses = defaultStatuses.filter(
			num => !statuses.find(status => status.externalId === num)
		);

		if (nonExistentStatuses.length) {
			await this.orderStatusRepository.save(
				nonExistentStatuses.map(num => ({
					externalId: num,
					id: uuid(),
					description: OrderStatusDescriptions[num],
				}))
			);
		}
	}

	async onModuleInit() {
		await this.createOrderStatusTable();
	}
}
