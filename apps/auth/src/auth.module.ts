import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TransportModule, TransportService } from '@app/transport';
import { PostgresDBModule, ToDoEntity, UserEntity } from '@app/common';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtGuard } from './jwt/jwt.guard';

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

    TypeOrmModule.forFeature([UserEntity, ToDoEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TransportService, JwtStrategy, JwtGuard],
})
export class AuthModule {}
// TypeOrmModule.forRootAsync({
//   imports: [ConfigModule],
//   useFactory: (configService: ConfigService) => {
//     const { url, port, database, password, username } =
//       configService.getOrThrow('db.postgres');
//     return {
//       type: 'postgres',
//       host: url,
//       port,
//       username,
//       password,
//       database,
//       autoLoadEntities: true,
//       synchronize: true,
//     };
//   },
//   inject: [ConfigService],
// }),
