import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('all')
	async getAllProducts() {
		return this.productService.getAllProducts();
	}

	@Get(':id')
	async getProductById(@Param('id') id: string) {
		return this.productService.getProductById(id);
	}

	@Post('create')
	async createProduct(@Body() body: CreateProductDto) {
		return this.productService.createProduct(body);
	}

	@Get('getProductsByCategoryId/:id')
	async getProductsByCategory(@Param('id') id: number) {
		return this.productService.getProductsByCategory(id);
	}
}
