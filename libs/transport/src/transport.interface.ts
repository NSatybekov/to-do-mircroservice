import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface TransportServiceInterface {
  getRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}
