import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from './base-response.type';

export function BaseResponseFactory<T>(
	dataResult: T = null,
	isArray?: boolean
) {
	const className = new (dataResult as any)().constructor.name;
	if (!dataResult) {
		return BaseResponse;
	}

	class Response extends BaseResponse {
		@ApiProperty({
			type: dataResult,
		})
		dataResult: T;
	}

	Object.defineProperty(Response, 'name', {
		value: `BaseResponse<${className}>`,
	});

	class ArrayResponse extends BaseResponse {
		@ApiProperty({
			type: [dataResult],
		})
		dataResult: T;
	}

	Object.defineProperty(ArrayResponse, 'name', {
		value: `BaseResponse<${className}[]>`,
	});

	return isArray ? ArrayResponse : Response;
}
