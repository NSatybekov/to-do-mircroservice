import { ToDoEntity, UpdateToDoDto, CreateToDoDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly repository: Repository<ToDoEntity>, // private readonly jwtService: JwtService,
  ) {}

  async getAllUserToDos(user_guid: string): Promise<ToDoEntity[]> {
    return await this.repository.find({ where: { user: { user_guid } } });
  }

  async create(dto: CreateToDoDto) {
    return await this.repository.save(dto);
  }

  async update(userGuid: string, todoGuid: string, patch: UpdateToDoDto) {
    const isAuthor = await this.isAuthor(userGuid, todoGuid);
    if (isAuthor) {
      await this.repository.update({ todo_guid: todoGuid }, patch);

      const updatedEntity = await this.repository.findOne({
        where: { todo_guid: todoGuid },
      });

      return updatedEntity;
    }
    return 'You are not the author cant update';
  }

  async delete(userGuid: string, todoGuid: string) {
    const isAuthor = await this.isAuthor(userGuid, todoGuid);
    if (isAuthor) {
      return this.repository.delete({ todo_guid: todoGuid });
    }
    return 'You are not the author cant delete';
  }

  private async isAuthor(userGuid, todoGuid): Promise<boolean> {
    const todo = await this.repository.findOne({
      where: { user: { user_guid: userGuid }, todo_guid: todoGuid },
    });
    return !!todo;
  }
}
