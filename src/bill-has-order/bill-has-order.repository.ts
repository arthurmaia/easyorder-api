import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BillHasOrder } from './bill-has-order.entity';

@Injectable()
export class BillHasOrderRepository extends Repository<BillHasOrder> {
	constructor(
		@InjectRepository(BillHasOrder) repository: Repository<BillHasOrder>
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
