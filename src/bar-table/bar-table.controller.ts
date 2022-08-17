import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BarTableService } from './bar-table.service';
import { BarTable } from './bar-table.entity';
import { CreateBarTableDto } from './dto/create-bar-table.dto';

@ApiTags('bar-table')
@Controller('bar-table')
export class BarTableController {
	constructor(private readonly barTableService: BarTableService) {}

	@Get('all')
	async getAllBarTables(): Promise<BarTable[]> {
		return await this.barTableService.getAllBarTables();
	}

	@Post('create')
	async createBarTable(@Body() body: CreateBarTableDto): Promise<BarTable> {
		return await this.barTableService.createBarTable(body);
	}
}
