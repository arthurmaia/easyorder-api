import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderStatus } from './order-status.entity';

@Injectable()
export class OrderStatusRepository extends Repository<OrderStatus> {
	constructor(
		@InjectRepository(OrderStatus) repository: Repository<OrderStatus>
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
