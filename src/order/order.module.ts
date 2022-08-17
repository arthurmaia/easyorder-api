import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
	imports: [TypeOrmModule.forFeature([Order])],
	providers: [OrderService, OrderRepository],
	controllers: [OrderController],
	exports: [OrderService, OrderRepository],
})
export class OrderModule {}
