import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { billList, createdBillPayload } from 'src/tests/bill.data';
import { orderList } from 'src/tests/order.data';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

describe('Bill Controller', () => {
	let billController: BillController;
	let billService: BillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BillController],
			providers: [
				{
					provide: BillService,
					useValue: {
						createBill: jest.fn().mockResolvedValue(createdBillPayload),
						getAllBills: jest.fn().mockResolvedValue(billList),
						getOrderByBillId: jest.fn().mockResolvedValue(orderList),
					},
				},
			],
		}).compile();

		billController = module.get<BillController>(BillController);

		billService = module.get<BillService>(BillService);
	});

	it('should be defined', () => {
		expect(billController).toBeDefined();
		expect(billService).toBeDefined();
	});

	describe('createBill', () => {
		it('should return a bill', async () => {
			const createdId = uuid();

			jest.spyOn(billService, 'createBill').mockResolvedValue(createdId);

			const request = await billController.createBill(createdBillPayload);

			expect(request).toEqual(createdId);
		});
	});

	describe('getAllBills', () => {
		it('should return an array of bills', async () => {
			const result = await billController.getAllBills();

			expect(result).toEqual(billList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(billService, 'getAllBills').mockResolvedValue([]);

			const result = await billController.getAllBills();

			expect(result).toEqual([]);
		});
	});

	describe('getOrderByBillId', () => {
		it('should return an array of orders', async () => {
			const result = await billController.getOrderByBillId(billList[0].id);

			expect(result).toEqual(orderList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(billService, 'getOrderByBillId').mockResolvedValue([]);

			const result = await billController.getOrderByBillId(billList[0].id);

			expect(result).toEqual([]);
		});
	});
});
