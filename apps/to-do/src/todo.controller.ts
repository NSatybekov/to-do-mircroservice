import { TransportService } from '@app/transport';
import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ToDoService } from './todo.service';
import { UpdateToDoDto, CreateToDoDto, DeleteToDoDto } from '@app/common';

@Controller()
export class ToDoController {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly toDoService: ToDoService,
    private readonly transportService: TransportService,
  ) {}

  @MessagePattern({ cmd: 'get-to-do' })
  async getAllToDos(
    @Ctx() context: RmqContext,
    @Payload() { userGuid }: { userGuid: string },
  ) {
    this.transportService.acknowledgeMessage(context);
    return this.toDoService.getAllUserToDos(userGuid);
  }

  @MessagePattern({ cmd: 'create-to-do' })
  async createToDo(@Ctx() context: RmqContext, @Payload() dto: CreateToDoDto) {
    this.transportService.acknowledgeMessage(context);
    return this.toDoService.create(dto);
  }

  @MessagePattern({ cmd: 'update-to-do' })
  async updateToDo(@Ctx() context: RmqContext, @Payload() dto: UpdateToDoDto) {
    this.transportService.acknowledgeMessage(context);
    return this.toDoService.update(dto.user_guid, dto.todo_guid, dto);
  }

  @MessagePattern({ cmd: 'delete-to-do' })
  async deleteToDo(@Ctx() context: RmqContext, @Payload() dto: DeleteToDoDto) {
    this.transportService.acknowledgeMessage(context);
    return this.toDoService.delete(dto.user_guid, dto.todo_guid);
  }
}
