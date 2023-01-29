import { Test, TestingModule } from '@nestjs/testing';

import { BarTableController } from './bar-table.controller';
import { BarTable } from './bar-table.entity';
import { BarTableService } from './bar-table.service';
import { barTableList, createdBarTable } from 'src/tests/bar-table.data';

describe('BarTable Controller', () => {
	let barTableController: BarTableController;
	let barTableService: BarTableService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BarTableController],
			providers: [
				{
					provide: BarTableService,
					useValue: {
						getAllBarTables: jest.fn().mockResolvedValue(barTableList),
						createBarTable: jest.fn().mockResolvedValue(createdBarTable),
					},
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

	describe('getAllBarTables', () => {
		it('should return an array of bar table', async () => {
			const result = await barTableController.getAllBarTables();

			expect(result).toEqual(barTableList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(barTableService, 'getAllBarTables').mockResolvedValue([]);

			const result = await barTableController.getAllBarTables();

			expect(result).toEqual([]);
		});
	});

	describe('createBarTable', () => {
		it('should create a category', async () => {
			const expectedValue = new BarTable({
				...createdBarTable,
				externalId: 3,
			});

			jest
				.spyOn(barTableService, 'createBarTable')
				.mockResolvedValue(expectedValue);

			const request = await barTableController.createBarTable(createdBarTable);

			expect(createdBarTable.externalId).not.toBeFalsy();
			expect(request).toEqual(expectedValue);
		});
	});
});
