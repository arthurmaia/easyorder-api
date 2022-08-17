import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class OrderHasProduct {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(_type => Product, product => product.id)
	product: Product;

	@ManyToOne(_type => Order, order => order.id)
	order: Order;

	@Column()
	quantity: number;
}
