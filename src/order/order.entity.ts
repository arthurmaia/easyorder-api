import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { OrderStatus } from 'src/order-status/order-status.entity';
import { OrderHasProduct } from 'src/order-has-product/order-has-product.entity';

@Entity()
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	deviceId: string;

	@ManyToOne(_type => OrderStatus, orderStatus => orderStatus.orders)
	status: OrderStatus;

	@Exclude()
	@OneToMany(_type => OrderHasProduct, orderHasProduct => orderHasProduct.order)
	orderHasProducts: OrderHasProduct[];
}
