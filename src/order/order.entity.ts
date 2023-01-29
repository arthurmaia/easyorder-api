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
import { BillHasOrder } from 'src/bill-has-order/bill-has-order.entity';

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

	@Exclude()
	@OneToMany(_type => BillHasOrder, billHasOrder => billHasOrder.order)
	billHasOrders: BillHasOrder[];

	constructor(order?: Partial<Order>) {
		Object.assign(this, order);
	}
}
