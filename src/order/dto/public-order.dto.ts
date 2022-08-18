import { PublicProductDto } from './public-product.dto';

export class PublicOrderDto {
	id: string;
	deviceId: string;
	status: string;
	products: PublicProductDto[] = [];
}
