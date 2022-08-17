import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Deve ser informado o nome do produto!' })
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Deve ser informado uma descrição para o produto!' })
	description: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty({
		message: 'Deve ser informado um valor unitário para o produto!',
	})
	value: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty({
		message: 'Deve ser informado o ID da categoria deste produto!',
	})
	categoryId: number;
}
