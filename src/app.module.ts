import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
