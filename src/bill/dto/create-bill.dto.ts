import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBillDto {
	@ApiProperty()
	@IsUUID(null, { message: 'Código da mesa inválido!' })
	@IsNotEmpty({ message: 'Deve ser informado o ID da mesa!' })
	barTableId: string;
}
