import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BillHasPayment } from './bill-has-payment.entity';
import { BillHasPaymentRepository } from './bill-has-payment.repository';
import { BillHasPaymentService } from './bill-has-payment.service';

@Module({
	imports: [TypeOrmModule.forFeature([BillHasPayment])],
	providers: [BillHasPaymentRepository, BillHasPaymentService],
	exports: [BillHasPaymentService],
})
export class BillHasPaymentModule {}
