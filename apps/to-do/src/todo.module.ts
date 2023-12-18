import { PostgresDBModule, ToDoEntity, UserEntity } from '@app/common';
import { TransportModule } from '@app/transport';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoController } from './todo.controller';
import { ToDoService } from './todo.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),

    TransportModule,
    PostgresDBModule,

    TypeOrmModule.forFeature([ToDoEntity, UserEntity]),
  ],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
