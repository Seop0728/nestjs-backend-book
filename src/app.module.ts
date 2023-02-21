import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from '../orm.config';
import { LoggerMiddleware } from './logger/logger.middleware';
import { Logger2Middleware } from './logger/logger2.middleware';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import authConfig from './config/authConfig';
import { ExceptionModule } from './exception/exception.module';
import { BatchModule } from './batch/batch.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check/health-check.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [authConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
    }),
    UsersModule,
    EmailModule,
    AuthModule,
    ExceptionModule,
    BatchModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(authConfig, Logger2Middleware).forRoutes(UsersController);
    // .exclude({ path: 'users', method: RequestMethod.GET },)
    // .forRoutes(UsersController);
  }
}
