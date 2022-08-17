import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBarTableDto {
	@IsNumber()
	@IsNotEmpty()
	externalId: number;
}
