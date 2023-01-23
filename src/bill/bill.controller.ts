import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';

@ApiTags('bill')
@Controller('bill')
export class BillController {
	constructor(private readonly billService: BillService) {}

	@Post('create')
	async createBill(@Body() { barTableId }: CreateBillDto) {
		return await this.billService.createBill(barTableId);
	}

	@Get('all')
	async getAllBills() {
		return await this.billService.getAllBills();
	}

	@Get('getOrdersByBillId/:id')
	async getOrderByBillId(@Param('id') id: string) {
		return await this.billService.getOrderByBillId(id);
	}
}
