import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BarTableModule } from './bar-table/bar-table.module';
import { BillModule } from './bill/bill.module';
import { CategoryModule } from './category/category.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { OrderHasProductModule } from './order-has-product/order-has-product.module';
import { BillHasOrderModule } from './bill-has-order/bill-has-order.module';
import { BillHasPaymentModule } from './bill-has-payment/bill-has-payment.module';
import { PaymentModule } from './payment/payment.module';

import { BarTable } from './bar-table/bar-table.entity';
import { Bill } from './bill/bill.entity';
import { Category } from './category/category.entity';
import { OrderStatus } from './order-status/order-status.entity';
import { Order } from './order/order.entity';
import { Product } from './product/product.entity';
import { User } from './user/user.entity';
import { OrderHasProduct } from './order-has-product/order-has-product.entity';
import { BillHasOrder } from './bill-has-order/bill-has-order.entity';
import { BillHasPayment } from './bill-has-payment/bill-has-payment.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: 'postgres://postgres:postgres@postgresdb:5432/easyorder-db',
			entities: [
				User,
				Category,
				OrderStatus,
				Order,
				Product,
				BarTable,
				Bill,
				OrderHasProduct,
				BillHasOrder,
				BillHasPayment,
			],
			synchronize: true,
		}),
		UserModule,
		AuthModule,
		CategoryModule,
		OrderStatusModule,
		OrderModule,
		ProductModule,
		BarTableModule,
		BillModule,
		OrderHasProductModule,
		BillHasOrderModule,
		BillHasPaymentModule,
		PaymentModule,
	],
})
export class AppModule {}
