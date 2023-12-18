import { ErrorsInterceptor } from '@app/common';
import { TransportService } from '@app/transport';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ToDoModule } from './todo.module';

async function bootstrap() {
  const app = await NestFactory.create(ToDoModule);
  app.useGlobalInterceptors(new ErrorsInterceptor());
  const configService = app.get(ConfigService);
  const transportService = app.get(TransportService);

  const queue = configService.get('RABBITMQ_TODO_QUEUE');

  app.connectMicroservice(transportService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
