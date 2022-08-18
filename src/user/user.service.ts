import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async createUser(body: CreateUserDto): Promise<User> {
		return await this.userRepository.save(body);
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async findUserByEmail(email: string): Promise<User> {
		return await this.userRepository.findOne({
			where: {
				email,
			},
		});
	}
}
