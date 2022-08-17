import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
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
