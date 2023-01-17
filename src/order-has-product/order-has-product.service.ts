import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';

import { OrderHasProductRepository } from './order-has-product.repository';
import { OrderHasProduct } from './order-has-product.entity';
import { CreateOrderHasProductDto } from './dto/create-order-has-product.dto';
import { OrderService } from 'src/order/order.service';
import { Product } from 'src/product/product.entity';
import { CustomGetProductsResponseDto } from './dto/custom-get-products-response.dto';

@Injectable()
export class OrderHasProductService {
	constructor(
		private orderHasProductRepository: OrderHasProductRepository,
		@Inject(forwardRef(() => OrderService))
		private readonly orderService: OrderService
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

		return await this.orderHasProductRepository.save({
			quantity: createOrderHasProduct.quantity,
			order: { id: createOrderHasProduct.orderId },
			product: { id: createOrderHasProduct.productId },
		});
	}

	async findAll(): Promise<OrderHasProduct[]> {
		return await this.orderHasProductRepository.find({
			relations: ['order', 'product'],
		});
	}

	async findByOrderId(orderId: string): Promise<OrderHasProduct[]> {
		const order = await this.orderService.getOrderById(orderId);

		return await this.orderHasProductRepository.find({
			where: { order },
			relations: ['order', 'product'],
		});
	}

	async getProductsByOrderId(
		orderId: string
	): Promise<CustomGetProductsResponseDto[]> {
		const ordersHasProduct = await this.orderHasProductRepository.find({
			where: { order: { id: orderId } },
			relations: ['order', 'product'],
		});

		console.log({ ordersHasProduct });

		const products: CustomGetProductsResponseDto[] = ordersHasProduct.map(
			orderHasProduct => ({
				...orderHasProduct.product,
				quantity: orderHasProduct.quantity,
			})
		);

		return products;
	}
}
