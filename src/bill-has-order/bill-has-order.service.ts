import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PublicOrderDto } from 'src/order/dto/public-order.dto';

import { OrderService } from 'src/order/order.service';
import { BillHasOrder } from './bill-has-order.entity';
import { BillHasOrderRepository } from './bill-has-order.repository';
import { CreateBillHasOrderDto } from './dto/create-bill-has-order.dto';

@Injectable()
export class BillHasOrderService {
	constructor(
		private readonly billHasOrderRepository: BillHasOrderRepository,
		@Inject(forwardRef(() => OrderService))
		private readonly orderService: OrderService
	) {}

	async create(billHasOrder: CreateBillHasOrderDto): Promise<BillHasOrder> {
		return await this.billHasOrderRepository.save({
			bill: { id: billHasOrder.billId },
			order: { id: billHasOrder.orderId },
		});
	}

	async findAll(): Promise<BillHasOrder[]> {
		return await this.billHasOrderRepository.find({
			relations: ['bill', 'order'],
		});
	}

	async getOrderByBillId(billId: string): Promise<PublicOrderDto[]> {
		const billHasOrders = await this.billHasOrderRepository.find({
			where: { bill: { id: billId } },
			relations: ['order'],
		});

		const publicOrders: PublicOrderDto[] = [];

		for (const billHasOrder of billHasOrders) {
			const currentOrder = await this.orderService.getOrderById(
				billHasOrder.order.id
			);

			publicOrders.push({
				id: currentOrder.id,
				deviceId: currentOrder.deviceId,
				status: currentOrder.status.description,
			});
		}

		return publicOrders;
	}
}
