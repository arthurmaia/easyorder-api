import { HttpException, Injectable } from '@nestjs/common';

import { BillRepository } from './bill.repository';
import { PublicBillDto } from './dto/public-bill.dto';
import { BarTableRepository } from 'src/bar-table/bar-table.repository';

@Injectable()
export class BillService {
	constructor(
		private billRepository: BillRepository,
		private barTableRepository: BarTableRepository
	) {}

	async createBill(barTableId: string): Promise<PublicBillDto> {
		const barTable = await this.barTableRepository.findOne({
			where: { id: barTableId },
		});

		if (!barTable) {
			throw new HttpException('Mesa não encontrada!', 400);
		}

		const createdBill = await this.billRepository.save({ barTable });

		return {
			id: createdBill.id,
			isPayed: createdBill.isPayed,
			barTableId: createdBill.barTable.id,
		} as PublicBillDto;
	}

	async getAllBills(): Promise<PublicBillDto[]> {
		const bills = await this.billRepository.find({
			relations: ['barTable'],
		});

		return bills.map(
			bill =>
				({
					id: bill.id,
					isPayed: bill.isPayed,
					barTableId: bill.barTable.id,
				} as PublicBillDto)
		);
	}
}
