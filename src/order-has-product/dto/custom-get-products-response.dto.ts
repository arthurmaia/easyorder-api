import { Product } from 'src/product/product.entity';

export interface CustomGetProductsResponseDto extends Product {
	quantity: number;
}
