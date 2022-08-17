import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BarTable } from './bar-table.entity';

@Injectable()
export class BarTableRepository extends Repository<BarTable> {
	constructor(@InjectRepository(BarTable) repository: Repository<BarTable>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
