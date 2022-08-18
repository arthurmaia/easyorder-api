import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBillHasPaymentDto {
	@IsNotEmpty()
	@IsUUID()
	billId: string;

	@IsNotEmpty()
	payedValue: number;
}
