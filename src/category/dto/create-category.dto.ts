import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Deve ser informado a descrição da categoria!' })
	name: string;
}
