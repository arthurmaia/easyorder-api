import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BarTable } from 'src/bar-table/bar-table.entity';

@Entity()
export class Bill {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: false })
	isPayed: boolean;

	@ManyToOne(_type => BarTable, barTable => barTable.bills)
	barTable: BarTable;
}
