import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BarTableModule } from 'src/bar-table/bar-table.module';
import { BarTableService } from 'src/bar-table/bar-table.service';
import { BillHasOrderModule } from 'src/bill-has-order/bill-has-order.module';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';
import { BillRepository } from './bill.repository';
import { BillService } from './bill.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Bill]),
		BarTableModule,
		BillHasOrderModule,
	],
	controllers: [BillController],
	providers: [BillRepository, BillService],
	exports: [BillService],
})
export class BillModule {}
