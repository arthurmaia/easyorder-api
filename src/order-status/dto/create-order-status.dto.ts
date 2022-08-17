import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderStatusDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({
		message: 'Deve ser informado a descrição do status do pedido!',
	})
	description: string;
}
