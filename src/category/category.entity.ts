import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Product } from 'src/product/product.entity';

@Entity()
export class Category {
	@PrimaryColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(_type => Product, product => product.category)
	products: Product[];
}
