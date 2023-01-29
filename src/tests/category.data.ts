import { Category } from 'src/category/category.entity';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

export const categoryList: Category[] = [
	new Category({
		id: 1,
		name: 'Category 1',
	}),
	new Category({
		id: 2,
		name: 'Category 2',
	}),
];

export const createdCategoryPayload: CreateCategoryDto = {
	name: 'Category 3',
};

export const deletedCategoryId = 2;
