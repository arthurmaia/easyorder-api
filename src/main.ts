import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({ origin: '*' });

	// if (process.env.NODE_ENV !== 'production') {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Easy Order API')
		.setDescription('Easy Order API Documentation')
		.setVersion('1.0')
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('swagger', app, swaggerDocument);
	// }

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(new ResponseInterceptor());

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
