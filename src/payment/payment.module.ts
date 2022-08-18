import { Module } from '@nestjs/common';

import { BillHasPaymentModule } from 'src/bill-has-payment/bill-has-payment.module';
import { BillModule } from 'src/bill/bill.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
	imports: [BillHasPaymentModule, BillModule],
	providers: [PaymentService],
	controllers: [PaymentController],
	exports: [PaymentService],
})
export class PaymentModule {}
