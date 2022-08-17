import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBarTableDto {
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	externalId: number;
}
