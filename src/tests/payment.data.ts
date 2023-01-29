import { v4 as uuid } from 'uuid';

import { BillHasPayment } from 'src/bill-has-payment/bill-has-payment.entity';
import { billList } from './bill.data';
import { CreateBillHasPaymentDto } from 'src/bill-has-payment/dto/create-bill-has-payment.dto';

export const paymentList: BillHasPayment[] = [
	new BillHasPayment({
		id: uuid(),
		bill: billList[0],
		payedValue: 10,
	}),
	new BillHasPayment({
		id: uuid(),
		bill: billList[0],
		payedValue: 10,
	}),
];

export const createdPaymentPayload: CreateBillHasPaymentDto = {
	billId: billList[0].id,
	payedValue: 20,
};
