import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bill } from './bill.entity';

@Injectable()
export class BillRepository extends Repository<Bill> {
	constructor(@InjectRepository(Bill) repository: Repository<Bill>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
