import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEventsHandler } from './event/user-events.handler';
import { CreateUserHandler } from './command/create-user.handler';
import { VerifyEmailHandler } from './command/verify-email.handler';
import { LoginHandler } from './command/login.handler';
import { VerifyAccessTokenHandler } from './command/verify-access-token.handler';
import { GetUserInfoQueryHandler } from './query/get-user-info.handler';

const commandHandlers = [
  CreateUserHandler,
  VerifyEmailHandler,
  LoginHandler,
  VerifyAccessTokenHandler,
];

const queryHandlers = [GetUserInfoQueryHandler];

const eventHandlers = [UserEventsHandler];

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, Logger],
})
export class UsersModule {}
