import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntiy } from './entiy/user.entiy';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntiy])],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule {}
