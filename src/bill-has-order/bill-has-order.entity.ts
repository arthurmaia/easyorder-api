import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/order/order.entity';
import { Bill } from 'src/bill/bill.entity';

@Entity()
export class BillHasOrder {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(_type => Order, order => order.id)
	order: Order;

	@ManyToOne(_type => Bill, bill => bill.id)
	bill: Bill;
}
