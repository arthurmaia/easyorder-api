import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Order } from 'src/order/order.entity';

@Entity()
export class OrderStatus {
	@PrimaryColumn()
	id: number;

	@Column()
	description: string;

	@OneToMany(_type => Order, order => order.status)
	orders: Order[];
}
