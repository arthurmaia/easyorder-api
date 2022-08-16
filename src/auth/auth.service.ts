import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) {}

	async login(body: LoginDto): Promise<string> {
		const { login, password } = body;

		const user = await this.userRepository.findOne({
			where: {
				email: login,
			},
		});

		if (!user) {
			return 'Usuário não encontrado.';
		}

		if (user.password !== password) {
			return 'Senha inválida.';
		}

		return 'Usuário autenticado.';
	}
}
