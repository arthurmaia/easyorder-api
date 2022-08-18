import { HttpException, Injectable } from '@nestjs/common';

import { OrderStatus } from 'src/order-status/order-status.entity';
import { OrderStatusEnum } from 'src/utils/constants';
import { CreateOrderDto } from './dto/create-order.dto';
import { InsertProductsOrderDto } from './dto/insert-products-order.dto';
import { PublicOrderDto } from './dto/public-order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderHasProductService } from 'src/order-has-product/order-has-product.service';
import { BillHasOrderService } from 'src/bill-has-order/bill-has-order.service';

@Injectable()
export class OrderService {
	constructor(
		private orderRepository: OrderRepository,
		private readonly orderHasProductService: OrderHasProductService,
		private readonly billHasOrderService: BillHasOrderService
	) {}

	async createOrder(body: CreateOrderDto): Promise<PublicOrderDto> {
		const currentOrder = await this.orderRepository.findOne({
			where: {
				deviceId: body.deviceId,
				status: { id: OrderStatusEnum.PENDING },
			},
			relations: ['status'],
		});

		if (currentOrder) {
			throw new HttpException(
				'Já existe um pedido em aberto neste dispositivo!',
				400
			);
		}

		const order = new Order();

		order.deviceId = body.deviceId;

		order.status = { id: OrderStatusEnum.PENDING } as OrderStatus;

		const savedOrder = await this.orderRepository.save(order);

		await this.billHasOrderService.create({
			billId: body.billId,
			orderId: savedOrder.id,
		});

		const publicOrder = new PublicOrderDto();

		publicOrder.id = savedOrder.id;
		publicOrder.deviceId = savedOrder.deviceId;
		publicOrder.status = savedOrder.status.description;

		return publicOrder;
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

	async getOrderById(id: string): Promise<Order> {
		return await this.orderRepository.findOne({
			where: { id },
			relations: ['status', 'orderHasProducts', 'orderHasProducts.product'],
		});
	}

	async insertProductsIntoOrder(body: InsertProductsOrderDto): Promise<string> {
		const order = await this.orderRepository.findOne({
			where: {
				id: body.orderId,
			},
			relations: ['status'],
		});

		if (!order) {
			throw new HttpException(
				'Não existe um pedido em aberto com esse ID!',
				400
			);
		}

		if (order.status.id !== OrderStatusEnum.PENDING) {
			throw new HttpException(
				'Não é possível inserir produtos em um pedido já finalizado!',
				400
			);
		}

		const { products } = body;

		const productsIds = products.map(product => product.productId);

		const isDuplicate = productsIds.some((item, idx) => {
			return productsIds.indexOf(item) != idx;
		});

		if (isDuplicate) {
			throw new HttpException(
				'Não é possível inserir produtos repetidos em um pedido!',
				400
			);
		}

		const hasQuantityLessThenZero = products.some(
			product => product.quantity <= 0
		);

		if (hasQuantityLessThenZero) {
			throw new HttpException(
				'Não é possível inserir produtos com quantidade menor ou igual a zero!',
				400
			);
		}

		for (const product of products) {
			await this.orderHasProductService.create({
				orderId: order.id,
				productId: product.productId,
				quantity: product.quantity,
			});
		}

		return `${products.length} produtos inseridos com sucesso!`;
	}
}
