import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Deve ser informado o ID do dispositivo!' })
	deviceId: string;
}
