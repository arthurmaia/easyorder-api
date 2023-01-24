import { Test, TestingModule } from '@nestjs/testing';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('Category Controller', () => {
	let categoryController: CategoryController;
	let categoryService: CategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [
				{
					provide: CategoryService,
					useValue: {},
				},
			],
		}).compile();

		categoryController = module.get<CategoryController>(CategoryController);

		categoryService = module.get<CategoryService>(CategoryService);
	});

	it('should be defined', () => {
		expect(categoryController).toBeDefined();
		expect(categoryService).toBeDefined();
	});
});
