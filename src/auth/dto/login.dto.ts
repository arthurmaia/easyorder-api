import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	@IsEmail({}, { message: 'O email deve ser válido.' })
	login: string;

	@IsNotEmpty()
	@Length(8, 24, { message: 'A senha deve conter mais de 8 caracteres.' })
	password: string;
}
