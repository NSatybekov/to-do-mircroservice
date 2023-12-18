import { Controller, UseGuards, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { TransportService } from '@app/transport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '@app/common';
import { JwtGuard } from './jwt/jwt.guard';

@Controller()
export class AuthController {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly authService: AuthService,
    private readonly transportService: TransportService,
  ) {}

  @MessagePattern({ cmd: 'get-user' })
  async getUserById(
    @Ctx() context: RmqContext,
    @Payload() user: { guid: string },
  ) {
    this.transportService.acknowledgeMessage(context);

    return this.authService.getUserById(user.guid);
  }

  @MessagePattern({ cmd: 'register' })
  async register(
    @Ctx() context: RmqContext,
    @Payload() newUser: CreateUserDto,
  ) {
    try {
      this.transportService.acknowledgeMessage(context);
      return this.authService.register(newUser);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @MessagePattern({ cmd: 'login' })
  async login(
    @Ctx() context: RmqContext,
    @Payload() existingUser: LoginUserDto,
  ) {
    this.transportService.acknowledgeMessage(context);

    return this.authService.login(existingUser);
  }

  @MessagePattern({ cmd: 'verify-jwt' })
  @UseGuards(JwtGuard)
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.transportService.acknowledgeMessage(context);

    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern({ cmd: 'decode-jwt' })
  async decodeJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.transportService.acknowledgeMessage(context);
    return this.authService.getUserFromHeader(payload.jwt);
  }
}
