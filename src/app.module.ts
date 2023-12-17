import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/user.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
