import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BarTable } from './bar-table.entity';
import { BarTableRepository } from './bar-table.repository';
import { BarTableService } from './bar-table.service';
import { BarTableController } from './bar-table.controller';

@Module({
	imports: [TypeOrmModule.forFeature([BarTable])],
	controllers: [BarTableController],
	providers: [BarTableService, BarTableRepository],
	exports: [BarTableService],
})
export class BarTableModule {}
