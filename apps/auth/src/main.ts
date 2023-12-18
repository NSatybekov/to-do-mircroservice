import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { TransportService } from '@app/transport';

import { AuthModule } from './auth.module';
import { ErrorsInterceptor } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalInterceptors(new ErrorsInterceptor());
  const configService = app.get(ConfigService);
  const transportService = app.get(TransportService);

  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(transportService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
