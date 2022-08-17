import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderHasProduct } from './order-has-product.entity';
import { OrderHasProductRepository } from './order-has-product.repository';
import { OrderHasProductService } from './order-has-product.service';
import { OrderModule } from 'src/order/order.module';

@Module({
	imports: [TypeOrmModule.forFeature([OrderHasProduct]), OrderModule],
	providers: [OrderHasProductService, OrderHasProductRepository],
	exports: [OrderHasProductService, OrderHasProductRepository],
})
export class OrderHasProductModule {}
