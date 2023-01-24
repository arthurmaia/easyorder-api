import { Test, TestingModule } from '@nestjs/testing';

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
					useValue: {},
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
});
