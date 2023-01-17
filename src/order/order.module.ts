import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderHasProductModule } from 'src/order-has-product/order-has-product.module';
import { BillHasOrderModule } from 'src/bill-has-order/bill-has-order.module';
import { OrderStatusModule } from 'src/order-status/order-status.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Order]),
		forwardRef(() => OrderHasProductModule),
		forwardRef(() => BillHasOrderModule),
		forwardRef(() => OrderStatusModule),
	],
	providers: [OrderService, OrderRepository],
	controllers: [OrderController],
	exports: [OrderService],
})
export class OrderModule {}
