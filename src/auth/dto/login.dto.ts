import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail({}, { message: 'O email deve ser válido.' })
	login: string;

	@ApiProperty()
	@IsNotEmpty()
	@Length(8, 24, { message: 'A senha deve conter mais de 8 caracteres.' })
	password: string;
}
