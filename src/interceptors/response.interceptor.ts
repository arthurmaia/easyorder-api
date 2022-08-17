import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { BaseResponse } from '../types/base-response.type';

export class ResponseInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map(data => {
				const responseBody: BaseResponse = {
					dataResult: data,
					error: false,
					message: null,
				};

				return responseBody;
			})
		);
	}
}
