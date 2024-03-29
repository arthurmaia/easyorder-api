import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('category')
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
	async deleteCategory(@Param('id') id: number) {
		return await this.categoryService.deleteCategory(id);
	}
}
