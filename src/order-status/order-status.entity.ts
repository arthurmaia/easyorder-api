import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/order/order.entity';

@Entity()
export class OrderStatus {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	description: string;

	@Column({ unique: true })
	externalId: number;

	@OneToMany(_type => Order, order => order.status)
	orders: Order[];

	constructor(orderStatus?: Partial<OrderStatus>) {
		Object.assign(this, orderStatus);
	}
}
