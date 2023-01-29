import { v4 as uuid } from 'uuid';

import { BarTable } from 'src/bar-table/bar-table.entity';
import { CreateBarTableDto } from 'src/bar-table/dto/create-bar-table.dto';

export const barTableList: BarTable[] = [
	new BarTable({
		id: uuid(),
		externalId: 1,
	}),
	new BarTable({
		id: uuid(),
		externalId: 2,
	}),
];

export const createdBarTable: CreateBarTableDto = {
	externalId: 3,
};
