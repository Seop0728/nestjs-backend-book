import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger3Middleware } from './logger/logger3.middleware';
import { AuthGuard } from './auth.guard';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('MyApp', { prettyPrint: true }),
          ),
        }),
      ],
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(Logger3Middleware);
  await app.listen(3000);
}
bootstrap();
