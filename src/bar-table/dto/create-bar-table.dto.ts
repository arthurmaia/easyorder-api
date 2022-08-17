import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBarTableDto {
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty({ message: 'Deve ser informado um ID externo para a mesa!' })
	externalId: number;
}
