import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoryDescriptions, CategoryEnum } from 'src/utils/constants';
import { In } from 'typeorm';

import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService implements OnModuleInit {
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

	private async createCategoryTable(): Promise<void> {
		const defaultCategories = Object.values(CategoryEnum).filter(
			Number
		) as number[];

		const categories = await this.categoryRepository.find({
			where: {
				id: In(defaultCategories),
			},
		});

		const nonExistentCategories = defaultCategories.filter(
			num => !categories.find(category => category.id === num)
		);

		if (nonExistentCategories.length) {
			await this.categoryRepository.save(
				nonExistentCategories.map(num => ({
					id: num,
					name: CategoryDescriptions[num],
				}))
			);
		}
	}

	async onModuleInit() {
		await this.createCategoryTable();
	}
}
