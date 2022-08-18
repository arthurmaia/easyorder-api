import { Injectable, OnModuleInit } from '@nestjs/common';
import { In } from 'typeorm';

import { BarTableRepository } from './bar-table.repository';
import { BarTable } from './bar-table.entity';
import { CreateBarTableDto } from './dto/create-bar-table.dto';

@Injectable()
export class BarTableService implements OnModuleInit {
	constructor(private barTableRepository: BarTableRepository) {}

	async getAllBarTables(): Promise<BarTable[]> {
		return await this.barTableRepository.find();
	}

	async createBarTable(body: CreateBarTableDto): Promise<BarTable> {
		return await this.barTableRepository.save(body);
	}

	async getBarTableById(id: string): Promise<BarTable> {
		return await this.barTableRepository.findOne({
			where: { id },
		});
	}

	private async populateBarTable(): Promise<void> {
		const expectedBarTablesExternalIds = [1, 2, 3];

		const barTables = await this.barTableRepository.find({
			where: {
				externalId: In(expectedBarTablesExternalIds),
			},
		});

		const nonExistentBarTables = expectedBarTablesExternalIds.filter(
			num => !barTables.find(barTable => barTable.externalId === num)
		);

		if (nonExistentBarTables.length) {
			await this.barTableRepository.save(
				nonExistentBarTables.map(num => ({
					externalId: num,
				}))
			);
		}
	}

	async onModuleInit() {
		await this.populateBarTable();
	}
}
