import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { CategoryModule } from 'src/category/category.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository],
	exports: [ProductService],
})
export class ProductModule {}
