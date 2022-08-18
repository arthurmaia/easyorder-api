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

	async getProduct(id: string): Promise<PublicProductDto> {
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

	async getProducts(): Promise<PublicProductDto[]> {
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

	async createProduct(product: CreateProductDto): Promise<PublicProductDto> {
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

		const includedProduct = await this.productRepository.save(newProduct);

		const publicProduct = new PublicProductDto();

		publicProduct.id = includedProduct.id;
		publicProduct.name = includedProduct.name;
		publicProduct.value = includedProduct.value;
		publicProduct.category = includedProduct.category.name;
		publicProduct.imageUrl = includedProduct.imageUrl;
		publicProduct.hasStock = includedProduct.hasStock;
		publicProduct.blocked = includedProduct.blocked;
		publicProduct.description = includedProduct.description;

		return publicProduct;
	}

	async getProductsByCategory(categoryId: number): Promise<PublicProductDto[]> {
		const category = await this.categoryService.getCategoryById(categoryId);

		if (!category) {
			throw new HttpException(`Categoria ${categoryId} inexistente!`, 400);
		}

		const products = await this.productRepository.find({
			where: { category },
			relations: ['category'],
		});

		return products.map(
			product =>
				({
					id: product.id,
					name: product.name,
					value: product.value,
					category: product.category.name,
					imageUrl: product.imageUrl,
					hasStock: product.hasStock,
					blocked: product.blocked,
					description: product.description,
				} as PublicProductDto)
		);
	}
}
