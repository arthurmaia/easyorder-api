import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';

import { BillHasOrder } from './bill-has-order.entity';
import { BillHasOrderRepository } from './bill-has-order.repository';
import { BillHasOrderService } from './bill-has-order.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([BillHasOrder]),
		forwardRef(() => OrderModule),
	],
	providers: [BillHasOrderRepository, BillHasOrderService],
	exports: [BillHasOrderService],
})
export class BillHasOrderModule {}
