import { v4 as uuid } from 'uuid';

import { Product } from 'src/product/product.entity';
import { categoryList } from './category.data';
import { defaultProductImageUrl } from 'src/utils/constants';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export const productList: Product[] = [
	new Product({
		id: uuid(),
		description: 'Description 1',
		name: 'Product 1',
		category: categoryList[0],
		blocked: false,
		hasStock: true,
		value: 10,
		imageUrl: defaultProductImageUrl,
	}),
	new Product({
		id: uuid(),
		description: 'Description 2',
		name: 'Product 2',
		category: categoryList[0],
		blocked: false,
		hasStock: true,
		value: 20,
		imageUrl: defaultProductImageUrl,
	}),
];

export const createdProductPayload: CreateProductDto = {
	name: 'Product 3',
	description: 'Description 3',
	categoryId: categoryList[0].id,
	value: 40,
};
