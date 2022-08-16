import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('create')
	async createUser(@Body() body: CreateUserDto) {
		return await this.userService.createUser(body);
	}

	@Get('all')
	async findAll() {
		return await this.userService.findAll();
	}
}
