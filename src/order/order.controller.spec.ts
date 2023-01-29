import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import {
	createdOrderPayload,
	insertProductsIntoOrderPayload,
	orderList,
} from 'src/tests/order.data';
import { productList } from 'src/tests/product.data';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('Order Controller', () => {
	let orderController: OrderController;
	let orderService: OrderService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrderController],
			providers: [
				{
					provide: OrderService,
					useValue: {
						createOrder: jest.fn().mockResolvedValue(createdOrderPayload),
						findAll: jest.fn().mockResolvedValue(orderList),
						insertProductsIntoOrder: jest.fn().mockResolvedValue(undefined),
						getProductsByOrderId: jest.fn().mockResolvedValue(productList),
					},
				},
			],
		}).compile();

		orderController = module.get<OrderController>(OrderController);

		orderService = module.get<OrderService>(OrderService);
	});

	it('should be defined', () => {
		expect(orderController).toBeDefined();
		expect(orderService).toBeDefined();
	});

	describe('createOrder', () => {
		it('should return an order', async () => {
			const createdOrderId = uuid();

			jest.spyOn(orderService, 'createOrder').mockResolvedValue(createdOrderId);

			const request = await orderController.createOrder(createdOrderPayload);

			expect(request).toEqual(createdOrderId);
		});
	});

	describe('findAll', () => {
		it('should return an array of orders', async () => {
			const result = await orderController.findAll();

			expect(result).toEqual(orderList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(orderService, 'findAll').mockResolvedValue([]);

			const result = await orderController.findAll();

			expect(result).toEqual([]);
		});
	});

	describe('insertProductsIntoOrder', () => {
		it('should insert products into order', async () => {
			const result = await orderController.insertProductsIntoOrder(
				insertProductsIntoOrderPayload
			);

			expect(result).toBeUndefined();
		});
	});

	describe('getProductsByOrderId', () => {
		it('should return an array of products', async () => {
			const result = await orderController.getProductsByOrderId(
				insertProductsIntoOrderPayload.orderId
			);

			expect(result).toEqual(productList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(orderService, 'getProductsByOrderId').mockResolvedValue([]);

			const result = await orderController.getProductsByOrderId(
				insertProductsIntoOrderPayload.orderId
			);

			expect(result).toEqual([]);
		});
	});
});
