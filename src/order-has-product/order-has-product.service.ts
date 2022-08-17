import { HttpException, Injectable } from '@nestjs/common';

import { OrderHasProductRepository } from './order-has-product.repository';
import { OrderHasProduct } from './order-has-product.entity';
import { OrderRepository } from 'src/order/order.repository';
import { CreateOrderHasProductDto } from './dto/create-order-has-product.dto';

@Injectable()
export class OrderHasProductService {
	constructor(
		private orderHasProductRepository: OrderHasProductRepository,
		private orderRepository: OrderRepository
	) {}

	async create(
		createOrderHasProduct: CreateOrderHasProductDto
	): Promise<OrderHasProduct> {
		const orderHasProduct = await this.orderHasProductRepository.findOne({
			where: {
				order: { id: createOrderHasProduct.orderId },
				product: { id: createOrderHasProduct.productId },
			},
			relations: ['order', 'product'],
		});

		if (orderHasProduct) {
			throw new HttpException(
				'Este produto já foi adicionado dentro do pedido!',
				400
			);
		}

		return await this.orderHasProductRepository.save(createOrderHasProduct);
	}

	async findAll(): Promise<OrderHasProduct[]> {
		return await this.orderHasProductRepository.find({
			relations: ['order', 'product'],
		});
	}

	async findByOrderId(orderId: string): Promise<OrderHasProduct[]> {
		const order = await this.orderRepository.findOne({
			where: { id: orderId },
		});

		return await this.orderHasProductRepository.find({
			where: { order },
			relations: ['order', 'product'],
		});
	}
}
