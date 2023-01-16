import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from 'src/product/product.entity';

@Entity()
export class Category {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@OneToMany(_type => Product, product => product.category)
	products: Product[];
}
