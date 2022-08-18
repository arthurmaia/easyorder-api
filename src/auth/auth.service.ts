import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async login(body: LoginDto): Promise<string> {
		const { login, password } = body;

		const user = await this.userService.findUserByEmail(login);

		if (!user) {
			return 'Usuário não encontrado.';
		}

		if (user.password !== password) {
			return 'Senha inválida.';
		}

		return 'Usuário autenticado.';
	}
}
