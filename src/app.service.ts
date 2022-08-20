import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Por favorzin Miani passa nois, eu amo o SP.';
	}
}
