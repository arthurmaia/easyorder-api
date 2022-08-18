import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicOrderDto } from 'src/order/dto/public-order.dto';

import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { PublicBillDto } from './dto/public-bill.dto';

@ApiTags('bill')
@Controller('bill')
export class BillController {
	constructor(private readonly billService: BillService) {}

	@Post('create')
	async createBill(
		@Body() { barTableId }: CreateBillDto
	): Promise<PublicBillDto> {
		return await this.billService.createBill(barTableId);
	}

	@Get('all')
	async getAllBills(): Promise<PublicBillDto[]> {
		return await this.billService.getAllBills();
	}

	@Get('getOrdersByBillId/:id')
	async getOrderByBillId(@Param('id') id: string): Promise<PublicOrderDto[]> {
		return await this.billService.getOrderByBillId(id);
	}
}
