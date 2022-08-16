import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('create')
	async createCategory(@Body() body: CreateCategoryDto) {
		return await this.categoryService.createCategory(body);
	}

	@Get('all')
	async findAll() {
		return await this.categoryService.findAll();
	}

	@Delete('delete/:id')
	async deleteCategory(@Param('id') id: string) {
		return await this.categoryService.deleteCategory(id);
	}
}
