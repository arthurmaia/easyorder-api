import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
	constructor(@InjectRepository(Category) repository: Repository<Category>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
