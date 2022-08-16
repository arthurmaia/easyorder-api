export enum OrderStatusEnum {
	APPROVED = 1,
	PENDING = 2,
	CANCELED = 3,
}

export const OrderStatusDescriptions = {
	[OrderStatusEnum.APPROVED]: 'Aprovado',
	[OrderStatusEnum.PENDING]: 'Em Andamento',
	[OrderStatusEnum.CANCELED]: 'Cancelado',
};
