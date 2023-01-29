import { Test, TestingModule } from '@nestjs/testing';

import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

const categoryList: Category[] = [
	new Category({
		id: 1,
		name: 'Category 1',
	}),
	new Category({
		id: 2,
		name: 'Category 2',
	}),
];

const createdCategoryPayload: CreateCategoryDto = {
	name: 'Category 3',
};

const deletedCategoryId = 2;

describe('Category Controller', () => {
	let categoryController: CategoryController;
	let categoryService: CategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [
				{
					provide: CategoryService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(categoryList),
						createCategory: jest.fn().mockResolvedValue(createdCategoryPayload),
						deleteCategory: jest.fn().mockResolvedValue(undefined),
					},
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

	describe('findAll', () => {
		it('should return an array of category', async () => {
			const result = await categoryController.findAll();

			expect(result).toEqual(categoryList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(categoryService, 'findAll').mockResolvedValue([]);

			const result = await categoryController.findAll();

			expect(result).toEqual([]);
		});
	});

	describe('createCategory', () => {
		it('should create a category', async () => {
			const expectedValue = new Category({
				...createdCategoryPayload,
				id: 3,
			});

			jest
				.spyOn(categoryService, 'createCategory')
				.mockResolvedValue(expectedValue);

			const request = await categoryController.createCategory(
				createdCategoryPayload
			);

			expect(createdCategoryPayload.name).not.toBeFalsy();
			expect(request).toEqual(expectedValue);
		});
	});

	describe('deleteCategory', () => {
		it('should delete a category by id', async () => {
			const request = await categoryController.deleteCategory(
				deletedCategoryId
			);

			expect(deletedCategoryId).not.toBeFalsy();
			expect(request).toBeUndefined();
		});
	});
});
