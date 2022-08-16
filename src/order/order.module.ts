import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderStatusModule } from 'src/order-status/order-status.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
	imports: [TypeOrmModule.forFeature([Order]), OrderStatusModule],
	providers: [OrderService, OrderRepository],
	controllers: [OrderController],
	exports: [OrderService],
})
export class OrderModule {}
