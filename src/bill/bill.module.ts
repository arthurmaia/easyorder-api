import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BarTableModule } from 'src/bar-table/bar-table.module';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';
import { BillRepository } from './bill.repository';
import { BillService } from './bill.service';

@Module({
	imports: [TypeOrmModule.forFeature([Bill]), BarTableModule],
	controllers: [BillController],
	providers: [BillRepository, BillService],
	exports: [BillRepository, BillService],
})
export class BillModule {}
