import { Injectable } from '@nestjs/common';

import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
	constructor(private categoryRepository: CategoryRepository) {}

	async createCategory(body: CreateCategoryDto): Promise<Category> {
		return await this.categoryRepository.save(body);
	}

	async findAll(): Promise<Category[]> {
		return await this.categoryRepository.find();
	}

	async deleteCategory(id: string): Promise<void> {
		await this.categoryRepository.delete(id);
	}

	async getCategoryById(id: number): Promise<Category> {
		return await this.categoryRepository.findOne({
			where: { id },
		});
	}
}
