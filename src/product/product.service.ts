import { HttpException, Injectable } from '@nestjs/common';

import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { PublicProductDto } from './dto/public-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly categoryService: CategoryService
	) {}

	async getProductById(id: string): Promise<PublicProductDto> {
		const product = await this.productRepository.findOne({
			where: { id },
			relations: ['category'],
		});

		const publicProduct = new PublicProductDto();

		publicProduct.id = product.id;
		publicProduct.name = product.name;
		publicProduct.value = product.value;
		publicProduct.category = product.category.name;
		publicProduct.imageUrl = product.imageUrl;
		publicProduct.hasStock = product.hasStock;
		publicProduct.blocked = product.blocked;
		publicProduct.description = product.description;

		return publicProduct;
	}

	async getAllProducts(): Promise<PublicProductDto[]> {
		const products = await this.productRepository.find({
			relations: ['category'],
		});

		return products.map(
			product =>
				({
					...product,
					category: product.category.name,
				} as PublicProductDto)
		);
	}

	async createProduct(product: CreateProductDto): Promise<Product> {
		const { categoryId } = product;

		if (product.value <= 0) {
			throw new HttpException(`O valor do produto deve ser maior que 0!`, 400);
		}

		const category = await this.categoryService.getCategoryById(categoryId);

		if (!category) {
			throw new HttpException(`Categoria ${categoryId} inexistente!`, 400);
		}

		const newProduct = new Product();

		newProduct.name = product.name;
		newProduct.value = product.value;
		newProduct.description = product.description;
		newProduct.category = category;

		return await this.productRepository.save(newProduct);
	}

	async getProductsByCategory(categoryId: number): Promise<Product[]> {
		const category = await this.categoryService.getCategoryById(categoryId);

		if (!category) {
			throw new HttpException(`Categoria ${categoryId} inexistente!`, 400);
		}

		const products = await this.productRepository.find({
			where: { category },
			relations: ['category'],
		});

		return products;
	}
}
