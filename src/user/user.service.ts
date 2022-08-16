import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { PublicUserDto } from './dto/public-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async createUser(body: CreateUserDto): Promise<PublicUserDto> {
		const entity = this.userRepository.create(body);

		await this.userRepository.save(entity);

		const publicUser: PublicUserDto = {
			id: entity.id,
			name: entity.name,
		};

		return publicUser;
	}

	async findAll(): Promise<PublicUserDto[]> {
		const allUsers = await this.userRepository.find();

		return allUsers.map(
			({ id, name }) =>
				({
					id,
					name,
				} as PublicUserDto)
		);
	}
}
