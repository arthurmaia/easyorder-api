import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderStatusController } from './order-status.controller';
import { OrderStatus } from './order-status.entity';
import { OrderStatusRepository } from './order-status.repository';
import { OrderStatusService } from './order-status.service';

@Module({
	imports: [TypeOrmModule.forFeature([OrderStatus])],
	providers: [OrderStatusService, OrderStatusRepository],
	controllers: [OrderStatusController],
	exports: [OrderStatusService, OrderStatusRepository],
})
export class OrderStatusModule {}
