import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BillHasPayment } from './bill-has-payment.entity';

@Injectable()
export class BillHasPaymentRepository extends Repository<BillHasPayment> {
	constructor(
		@InjectRepository(BillHasPayment) repository: Repository<BillHasPayment>
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
