import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { TransportModule } from '@app/transport';

@Module({
  imports: [
    TransportModule.registerRmq(
      'AUTH_SERVICE',
      process.env.RABBITMQ_AUTH_QUEUE,
    ),
    TransportModule.registerRmq(
      'TODO_SERVICE',
      process.env.RABBITMQ_TODO_QUEUE,
    ),
  ],
  controllers: [ApiController],
})
export class ApiModule {}
