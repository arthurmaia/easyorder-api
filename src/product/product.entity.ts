import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Category } from 'src/category/category.entity';
import { defaultProductImageUrl } from 'src/utils/constants';
import { OrderHasProduct } from 'src/order-has-product/order-has-product.entity';

@Entity()
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	value: number;

	@Column({ default: true })
	hasStock: boolean;

	@Column({ default: false })
	blocked: boolean;

	@Exclude()
	@ManyToOne(_type => Category, category => category.products)
	category: Category;

	@Exclude()
	@OneToMany(
		_type => OrderHasProduct,
		orderHasProduct => orderHasProduct.product
	)
	orderHasProducts: OrderHasProduct[];

	@Column({ default: defaultProductImageUrl })
	imageUrl: string;
}
