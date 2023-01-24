import { Test, TestingModule } from '@nestjs/testing';

import { BarTableController } from './bar-table.controller';
import { BarTableService } from './bar-table.service';

describe('BarTable Controller', () => {
	let barTableController: BarTableController;
	let barTableService: BarTableService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BarTableController],
			providers: [
				{
					provide: BarTableService,
					useValue: {},
				},
			],
		}).compile();

		barTableController = module.get<BarTableController>(BarTableController);

		barTableService = module.get<BarTableService>(BarTableService);
	});

	it('should be defined', () => {
		expect(barTableController).toBeDefined();
		expect(barTableService).toBeDefined();
	});
});
