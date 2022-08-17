import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { BaseResponse } from '../types/base-response.type';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const exceptionResponse = exception.getResponse() as any;

		const responseBody: BaseResponse = {
			dataResult: null,
			error: true,
			message:
				typeof exceptionResponse === 'object'
					? exceptionResponse.message
					: exceptionResponse,
		};

		response.status(status).json(responseBody);
	}
}
