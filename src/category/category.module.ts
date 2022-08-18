import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	providers: [CategoryService, CategoryRepository],
	controllers: [CategoryController],
	exports: [CategoryService],
})
export class CategoryModule {}
