import { v4 as uuid } from 'uuid';

import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { Order } from 'src/order/order.entity';
import { orderStatusList } from './order-status.data';
import { billList } from './bill.data';
import { InsertProductsOrderDto } from 'src/order/dto/insert-products-order.dto';
import { productList } from './product.data';

export const orderList: Order[] = [
	new Order({
		id: uuid(),
		deviceId: uuid(),
		status: orderStatusList[0],
	}),
	new Order({
		id: uuid(),
		deviceId: uuid(),
		status: orderStatusList[0],
	}),
];

export const createdOrderPayload: CreateOrderDto = {
	billId: billList[0].id,
	deviceId: uuid(),
};

export const insertProductsIntoOrderPayload: InsertProductsOrderDto = {
	orderId: orderList[0].id,
	products: [
		{
			productId: productList[0].id,
			quantity: 1,
		},
	],
};
