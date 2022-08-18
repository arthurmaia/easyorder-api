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
}
