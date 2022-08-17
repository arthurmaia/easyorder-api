import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'O usuário deve conter um nome.' })
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail({}, { message: 'O email deve ser válido.' })
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@Length(8, 24, { message: 'A senha deve conter mais de 8 caracteres.' })
	password: string;
}
