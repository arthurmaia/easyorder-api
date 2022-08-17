import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderHasProduct } from './order-has-product.entity';

@Injectable()
export class OrderHasProductRepository extends Repository<OrderHasProduct> {
	constructor(
		@InjectRepository(OrderHasProduct) repository: Repository<OrderHasProduct>
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
