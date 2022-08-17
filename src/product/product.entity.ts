import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Category } from 'src/category/category.entity';
import { defaultProductImageUrl } from 'src/utils/constants';

@Entity()
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	value: number;

	@Column({ default: true })
	hasStock: boolean;

	@Column({ default: false })
	blocked: boolean;

	@Exclude()
	@ManyToOne(_type => Category, category => category.products)
	category: Category;

	@Column({ default: defaultProductImageUrl })
	imageUrl: string;

	categoryId?: string;
}
