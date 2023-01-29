import { v4 as uuid } from 'uuid';

import { CreateOrderStatusDto } from 'src/order-status/dto/create-order-status.dto';
import { OrderStatus } from 'src/order-status/order-status.entity';

export const orderStatusList: OrderStatus[] = [
	new OrderStatus({
		id: uuid(),
		description: 'Status 1',
		externalId: 1,
	}),
	new OrderStatus({
		id: uuid(),
		description: 'Status 2',
		externalId: 2,
	}),
];

export const createOrderStatusPayload: CreateOrderStatusDto = {
	description: 'Status 3',
};

export const deletedOrderStatusId = orderStatusList[0].id;
