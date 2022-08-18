import { HttpException, Injectable } from '@nestjs/common';

import { BillHasPayment } from 'src/bill-has-payment/bill-has-payment.entity';
import { BillHasPaymentService } from 'src/bill-has-payment/bill-has-payment.service';
import { CreateBillHasPaymentDto } from 'src/bill-has-payment/dto/create-bill-has-payment.dto';
import { BillService } from 'src/bill/bill.service';

@Injectable()
export class PaymentService {
	constructor(
		private readonly billHasPaymentService: BillHasPaymentService,
		private readonly billService: BillService
	) {}

	async getPaymentsByBillId(id: string): Promise<BillHasPayment[]> {
		return await this.billHasPaymentService.getPaymentsByBillId(id);
	}

	async createPayment(body: CreateBillHasPaymentDto): Promise<string> {
		if (body.payedValue <= 0) {
			throw new HttpException(
				'O valor do pagamento deve ser maior que 0!',
				400
			);
		}

		const bill = await this.billService.getBillById(body.billId);

		if (!bill) {
			throw new HttpException('Comanda não encontrada!', 400);
		}

		if (bill.isPayed) {
			throw new HttpException('Comanda já foi paga!', 400);
		}

		// Criar um service pra retornar o valor total da comanda em produtos
		// Obter pagamentos da comanda (calcular o valor total pago)

		await this.billHasPaymentService.create(body);

		// o valor que ja foi pago + o valor que pagou agora = o valor total de produto
		// isPayed = true

		return 'Pagamento criado com sucesso!';
	}
}
