import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { createdPaymentPayload, paymentList } from 'src/tests/payment.data';
import { billList } from 'src/tests/bill.data';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

describe('Payment Controller', () => {
	let paymentController: PaymentController;
	let paymentService: PaymentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PaymentController],
			providers: [
				{
					provide: PaymentService,
					useValue: {
						getPaymentsByBillId: jest.fn().mockResolvedValue(paymentList),
						createPayment: jest.fn().mockResolvedValue(createdPaymentPayload),
					},
				},
			],
		}).compile();

		paymentController = module.get<PaymentController>(PaymentController);

		paymentService = module.get<PaymentService>(PaymentService);
	});

	it('should be defined', () => {
		expect(paymentController).toBeDefined();
		expect(paymentService).toBeDefined();
	});

	describe('getPaymentsByBillId', () => {
		it('should return an array of payments', async () => {
			const result = await paymentController.getPaymentsByBillId(
				billList[0].id
			);

			expect(result).toEqual(paymentList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(paymentService, 'getPaymentsByBillId').mockResolvedValue([]);

			const result = await paymentController.getPaymentsByBillId(
				billList[0].id
			);

			expect(result).toEqual([]);
		});
	});

	describe('createPayment', () => {
		it('should return a payment', async () => {
			const createdPaymentId = uuid();

			jest
				.spyOn(paymentService, 'createPayment')
				.mockResolvedValue(createdPaymentId);

			const request = await paymentController.createPayment(
				createdPaymentPayload
			);

			expect(request).toEqual(createdPaymentId);
		});
	});
});
