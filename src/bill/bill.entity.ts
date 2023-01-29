import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { BarTable } from 'src/bar-table/bar-table.entity';
import { BillHasOrder } from 'src/bill-has-order/bill-has-order.entity';
import { BillHasPayment } from 'src/bill-has-payment/bill-has-payment.entity';

@Entity()
export class Bill {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: false })
	isPayed: boolean;

	@ManyToOne(_type => BarTable, barTable => barTable.bills)
	barTable: BarTable;

	@Exclude()
	@OneToMany(_type => BillHasOrder, billHasOrder => billHasOrder.bill)
	billHasOrders: BillHasOrder[];

	@Exclude()
	@OneToMany(_type => BillHasPayment, billHasPayment => billHasPayment.id)
	billHasPayments: BillHasPayment[];

	constructor(bill?: Partial<Bill>) {
		Object.assign(this, bill);
	}
}
