import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OrderStatus } from 'src/order-status/order-status.entity';

@Entity()
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	deviceId: string;

	@ManyToOne(_type => OrderStatus, orderStatus => orderStatus.orders)
	status: OrderStatus;
}
