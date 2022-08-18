import { Injectable } from '@nestjs/common';

import { PublicOrderDto } from 'src/order/dto/public-order.dto';
import { PublicProductDto } from 'src/order/dto/public-product.dto';
import { BillHasOrder } from './bill-has-order.entity';
import { BillHasOrderRepository } from './bill-has-order.repository';
import { CreateBillHasOrderDto } from './dto/create-bill-has-order.dto';

@Injectable()
export class BillHasOrderService {
	constructor(
		private readonly billHasOrderRepository: BillHasOrderRepository
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
			relations: [
				'order',
				'order.status',
				'order.orderHasProducts',
				'order.orderHasProducts.product',
			],
		});

		let publicOrders: PublicOrderDto[] = [];

		billHasOrders.forEach(({ order }) => {
			const publicOrder = new PublicOrderDto();
			publicOrder.id = order.id;
			publicOrder.deviceId = order.deviceId;
			publicOrder.status = order.status.description;

			order.orderHasProducts.forEach(({ quantity, product }) => {
				const publicProduct = new PublicProductDto();

				publicProduct.id = product.id;
				publicProduct.name = product.name;
				publicProduct.value = product.value;
				publicProduct.quantity = quantity;

				publicOrder.products.push(publicProduct);
			});

			publicOrders = [...publicOrders, publicOrder];
		});

		return publicOrders;
	}
}
