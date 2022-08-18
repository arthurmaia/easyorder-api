import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BillHasPayment } from 'src/bill-has-payment/bill-has-payment.entity';
import { CreateBillHasPaymentDto } from 'src/bill-has-payment/dto/create-bill-has-payment.dto';

import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Get('getPaymentsByBillId/:id')
	async getPaymentsByBillId(
		@Param('id') id: string
	): Promise<BillHasPayment[]> {
		return await this.paymentService.getPaymentsByBillId(id);
	}

	@Post('create')
	async createPayment(@Body() body: CreateBillHasPaymentDto): Promise<string> {
		return await this.paymentService.createPayment(body);
	}
}
