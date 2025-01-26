import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Env } from '#config/env';
import { CustomValidationPipe } from '#shared/pipes/custom-validation.pipe';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new CustomValidationPipe());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(configService.get(Env.PORT) || 4000);
}

bootstrap();
