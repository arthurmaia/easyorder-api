import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { InsertedProductDto } from './inserted-product.dto';

export class InsertProductsOrderDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	orderId: string;

	@ApiProperty({ type: InsertedProductDto, isArray: true })
	@IsNotEmpty()
	@IsArray()
	products: InsertedProductDto[];
}
