import { v4 as uuid } from 'uuid';

import { Bill } from 'src/bill/bill.entity';
import { barTableList } from './bar-table.data';
import { CreateBillDto } from 'src/bill/dto/create-bill.dto';

export const billList: Bill[] = [
	new Bill({
		id: uuid(),
		isPayed: false,
		barTable: barTableList[0],
	}),
	new Bill({
		id: uuid(),
		isPayed: false,
		barTable: barTableList[0],
	}),
];

export const createdBillPayload: CreateBillDto = {
	barTableId: barTableList[0].id,
};
