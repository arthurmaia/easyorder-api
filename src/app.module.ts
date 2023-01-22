import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
import { getEnvPath } from './common/helper/env.helper';

const envFilePath = getEnvPath(`${__dirname}/common/envs`);

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath, isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DATABASE_URL,
			entities: ['dist/**/*.entity{.ts,.js}'],
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
