import { HttpException, Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { InsertProductsOrderDto } from './dto/insert-products-order.dto';
import { PublicOrderDto } from './dto/public-order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderHasProductService } from 'src/order-has-product/order-has-product.service';
import { BillHasOrderService } from 'src/bill-has-order/bill-has-order.service';
import { OrderStatusService } from 'src/order-status/order-status.service';
import { BillService } from 'src/bill/bill.service';
import { OrderStatusEnum } from 'src/utils/constants';
import { CustomGetProductsResponseDto } from 'src/order-has-product/dto/custom-get-products-response.dto';

@Injectable()
export class OrderService {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly orderHasProductService: OrderHasProductService,
		private readonly billHasOrderService: BillHasOrderService,
		private readonly orderStatusService: OrderStatusService,
		private readonly billService: BillService
	) {}

	async createOrder(body: CreateOrderDto): Promise<string> {
		const inProgressOrderStatus =
			await this.orderStatusService.findByExternalId(OrderStatusEnum.PENDING);

		if (!inProgressOrderStatus) {
			throw new HttpException('Status de pedido não encontrado!', 400);
		}

		const currentOrder = await this.orderRepository.findOne({
			where: {
				deviceId: body.deviceId,
				status: {
					id: inProgressOrderStatus.id,
				},
			},
			relations: ['status'],
		});

		if (currentOrder) {
			throw new HttpException(
				'Já existe um pedido em aberto neste dispositivo!',
				400
			);
		}

		const currentBill = await this.billService.getBillById(body.billId);

		if (!currentBill) {
			throw new HttpException('Comanda não encontrada!', 400);
		}

		const order = new Order();

		order.deviceId = body.deviceId;

		order.status = { ...inProgressOrderStatus };

		const savedOrder = await this.orderRepository.save(order);

		await this.billHasOrderService.create({
			billId: body.billId,
			orderId: savedOrder.id,
		});

		return savedOrder.id;
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

		const inProgressOrderStatus =
			await this.orderStatusService.findByExternalId(OrderStatusEnum.PENDING);

		if (!inProgressOrderStatus) {
			throw new HttpException('Status de pedido não encontrado!', 400);
		}

		if (order.status.id !== inProgressOrderStatus.id) {
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

		return `${products.length} ${
			products.length > 1 ? 'produtos' : 'produto'
		} inseridos com sucesso!`;
	}

	async getProductsByOrderId(
		id: string
	): Promise<CustomGetProductsResponseDto[]> {
		return await this.orderHasProductService.getProductsByOrderId(id);
	}
}
