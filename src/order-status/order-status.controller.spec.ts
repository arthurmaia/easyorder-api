import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { OrderStatusController } from './order-status.controller';
import { OrderStatus } from './order-status.entity';
import { OrderStatusService } from './order-status.service';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';

const orderStatusList: OrderStatus[] = [
	new OrderStatus({
		id: uuid(),
		description: 'Status 1',
		externalId: 1,
	}),
	new OrderStatus({
		id: uuid(),
		description: 'Status 2',
		externalId: 2,
	}),
];

const createOrderStatusPayload: CreateOrderStatusDto = {
	description: 'Status 3',
};

const deletedOrderStatusId = uuid();

describe('OrderStatus Controller', () => {
	let orderStatusController: OrderStatusController;
	let orderStatusService: OrderStatusService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrderStatusController],
			providers: [
				{
					provide: OrderStatusService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(orderStatusList),
						createOrderStatus: jest
							.fn()
							.mockResolvedValue(createOrderStatusPayload),
						deleteOrderStatus: jest.fn().mockResolvedValue(undefined),
					},
				},
			],
		}).compile();

		orderStatusController = module.get<OrderStatusController>(
			OrderStatusController
		);

		orderStatusService = module.get<OrderStatusService>(OrderStatusService);
	});

	it('should be defined', () => {
		expect(orderStatusController).toBeDefined();
		expect(orderStatusService).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of order status', async () => {
			const result = await orderStatusController.findAll();

			expect(result).toEqual(orderStatusList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(orderStatusService, 'findAll').mockResolvedValue([]);

			const result = await orderStatusController.findAll();

			expect(result).toEqual([]);
		});
	});

	describe('createOrderStatus', () => {
		it('should create a new order status', async () => {
			const expectedValue = new OrderStatus({
				...createOrderStatusPayload,
				id: uuid(),
				externalId: 10,
			});

			jest
				.spyOn(orderStatusService, 'createOrderStatus')
				.mockResolvedValue(expectedValue);

			const request = await orderStatusController.createOrderStatus(
				createOrderStatusPayload
			);

			expect(createOrderStatusPayload.description).not.toBeFalsy();
			expect(request).toEqual(expectedValue);
		});
	});

	describe('deleteOrderStatus', () => {
		it('should delete a order status by id', async () => {
			const request = await orderStatusController.deleteOrderStatus(
				deletedOrderStatusId
			);

			expect(deletedOrderStatusId).not.toBeFalsy();
			expect(request).toBeUndefined();
		});
	});
});
