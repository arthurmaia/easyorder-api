import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { BarTableController } from './bar-table.controller';
import { BarTable } from './bar-table.entity';
import { BarTableService } from './bar-table.service';
import { CreateBarTableDto } from './dto/create-bar-table.dto';

const barTableList: BarTable[] = [
	new BarTable({
		id: uuid(),
		externalId: 1,
	}),
	new BarTable({
		id: uuid(),
		externalId: 2,
	}),
];

const createdBarTable: CreateBarTableDto = {
	externalId: 3,
};

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
