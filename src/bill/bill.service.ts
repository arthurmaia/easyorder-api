import { HttpException, Injectable } from '@nestjs/common';

import { BillRepository } from './bill.repository';
import { PublicBillDto } from './dto/public-bill.dto';
import { BillHasOrderService } from 'src/bill-has-order/bill-has-order.service';
import { BarTableService } from 'src/bar-table/bar-table.service';
import { PublicOrderDto } from 'src/order/dto/public-order.dto';

@Injectable()
export class BillService {
	constructor(
		private billRepository: BillRepository,
		private barTableService: BarTableService,
		private billHasOrderService: BillHasOrderService
	) {}

	async getBillById(billId: string): Promise<PublicBillDto> {
		const bill = await this.billRepository.findOne({
			where: { id: billId },
			relations: ['barTable'],
		});

		if (!bill) {
			return null;
		}

		return {
			id: bill.id,
			isPayed: bill.isPayed,
			barTableId: bill.barTable.id,
		} as PublicBillDto;
	}

	async createBill(barTableId: string): Promise<string> {
		const barTable = await this.barTableService.getBarTableById(barTableId);

		if (!barTable) {
			throw new HttpException('Mesa não encontrada!', 400);
		}

		const createdBill = await this.billRepository.save({ barTable });

		return createdBill.id;
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

	async getOrderByBillId(billId: string): Promise<PublicOrderDto[]> {
		return await this.billHasOrderService.getOrderByBillId(billId);
	}
}
