import { Injectable } from '@nestjs/common';

import { BillHasPayment } from './bill-has-payment.entity';
import { BillHasPaymentRepository } from './bill-has-payment.repository';
import { CreateBillHasPaymentDto } from './dto/create-bill-has-payment.dto';

@Injectable()
export class BillHasPaymentService {
	constructor(
		private readonly billHasPaymentRepository: BillHasPaymentRepository
	) {}

	async getPaymentsByBillId(id: string): Promise<BillHasPayment[]> {
		return await this.billHasPaymentRepository.find({
			where: { id },
			relations: ['bill'],
		});
	}

	async findAll(): Promise<BillHasPayment[]> {
		return await this.billHasPaymentRepository.find({
			relations: ['bill'],
		});
	}

	async create(body: CreateBillHasPaymentDto): Promise<BillHasPayment> {
		return await this.billHasPaymentRepository.save(body);
	}
}
