import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBillDto {
	@IsUUID(null, { message: 'Código da mesa inválido!' })
	@IsNotEmpty()
	barTableId: string;
}
