import { Test, TestingModule } from '@nestjs/testing';

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
					useValue: {},
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
});
