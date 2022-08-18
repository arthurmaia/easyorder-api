import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Bill } from 'src/bill/bill.entity';

@Entity()
export class BillHasPayment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	payedValue: number;

	@ManyToOne(_type => Bill, bill => bill.billHasPayments)
	bill: Bill;
}
