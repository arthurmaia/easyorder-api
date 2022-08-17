import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Bill } from 'src/bill/bill.entity';

@Entity()
export class BarTable {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	externalId: number;

	@OneToMany(_type => Bill, bill => bill.barTable)
	bills: Bill[];
}
