import { AuthGuard, UserInterceptor, UserRequest } from '@app/common';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrUpdateToDoApiDto } from './dtos/todo.dto';
import { LoginDto, RegisterDto } from './dtos/user.dto';

@Controller()
export class ApiController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('TODO_SERVICE') private readonly todoService: ClientProxy,
  ) {}

  @Post('auth/register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.send(
      {
        cmd: 'register',
      },
      {
        name: dto.name,
        email: dto.name,
        password: dto.password,
      },
    );
    return result;
  }

  @Post('auth/login')
  async login(@Body() dto: LoginDto) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email: dto.email,
        password: dto.password,
      },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get('get-todos')
  async getTodos(@Req() req: UserRequest) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.todoService.send(
      {
        cmd: 'get-to-do',
      },
      {
        userGuid: req.user.user_guid,
      },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post('create-todo')
  async createToDo(
    @Req() req: UserRequest,
    @Body() dto: CreateOrUpdateToDoApiDto,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.todoService.send(
      {
        cmd: 'create-to-do',
      },
      {
        user_guid: req.user.user_guid,
        title: dto.title,
        text: dto.text,
      },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post('update-todo/:todo_guid')
  async updateToDo(
    @Req() req: UserRequest,
    @Param('todo_guid') todo_guid: string,
    @Body() dto: CreateOrUpdateToDoApiDto,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }
    return this.todoService.send(
      {
        cmd: 'update-to-do',
      },
      {
        user_guid: req.user.user_guid,
        title: dto.title,
        text: dto.text,
        todo_guid: todo_guid,
      },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post('delete-todo/:todo_guid')
  async deleteToDo(
    @Req() req: UserRequest,
    @Param('todo_guid') todo_guid: string,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.todoService.send(
      {
        cmd: 'delete-to-do',
      },
      {
        user_guid: req.user.user_guid,
        todo_guid,
      },
    );
  }
}
