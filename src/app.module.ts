import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { OrderStatus } from './order-status/order-status.entity';
import { OrderStatusModule } from './order-status/order-status.module';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: 'postgres://postgres:postgres@postgresdb:5432/easyorder-db',
			entities: [User, Category, OrderStatus, Order],
			synchronize: true,
		}),
		UserModule,
		AuthModule,
		CategoryModule,
		OrderStatusModule,
		OrderModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
