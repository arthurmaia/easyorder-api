import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { createdProductPayload, productList } from 'src/tests/product.data';
import { categoryList } from 'src/tests/category.data';

describe('Product Controller', () => {
	let productController: ProductController;
	let productService: ProductService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductController],
			providers: [
				{
					provide: ProductService,
					useValue: {
						getAllProducts: jest.fn().mockResolvedValue(productList),
						getProductById: jest.fn().mockResolvedValue(productList[0].id),
						createProduct: jest.fn().mockResolvedValue(createdProductPayload),
						getProductsByCategory: jest.fn().mockResolvedValue(productList),
					},
				},
			],
		}).compile();

		productController = module.get<ProductController>(ProductController);

		productService = module.get<ProductService>(ProductService);
	});

	it('should be defined', () => {
		expect(productController).toBeDefined();
		expect(productService).toBeDefined();
	});

	describe('getAllProducts', () => {
		it('should return an array of products', async () => {
			const result = await productController.getAllProducts();

			expect(result).toEqual(productList);
		});

		it('should return an empty array', async () => {
			jest.spyOn(productService, 'getAllProducts').mockResolvedValue([]);

			const result = await productController.getAllProducts();

			expect(result).toEqual([]);
		});
	});

	describe('getProductById', () => {
		it('should return a product', async () => {
			const result = await productController.getProductById(productList[0].id);

			expect(result).toEqual(productList[0].id);
		});
	});

	describe('createProduct', () => {
		it('should create a product', async () => {
			const expectedValue = new Product({
				...createdProductPayload,
				id: uuid(),
				blocked: false,
				hasStock: true,
				category: categoryList[0],
			});

			jest
				.spyOn(productService, 'createProduct')
				.mockResolvedValue(expectedValue);

			const request = await productController.createProduct(
				createdProductPayload
			);

			expect(request).toEqual(expectedValue);
		});
	});

	describe('getProductsByCategory', () => {
		it('should return an array of products', async () => {
			const result = await productController.getProductsByCategory(
				categoryList[0].id
			);

			expect(result).toEqual(productList);
		});
	});
});
