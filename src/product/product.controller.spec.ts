import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('Product Controller', () => {
	let productController: ProductController;
	let productService: ProductService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductController],
			providers: [
				{
					provide: ProductService,
					useValue: {},
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
});
