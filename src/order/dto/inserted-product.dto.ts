import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InsertedProductDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	productId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	quantity: number;
}
