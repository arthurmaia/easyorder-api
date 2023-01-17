import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';

import { OrderStatusController } from './order-status.controller';
import { OrderStatus } from './order-status.entity';
import { OrderStatusRepository } from './order-status.repository';
import { OrderStatusService } from './order-status.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([OrderStatus]),
		forwardRef(() => OrderModule),
	],
	providers: [OrderStatusService, OrderStatusRepository],
	controllers: [OrderStatusController],
	exports: [OrderStatusService],
})
export class OrderStatusModule {}
