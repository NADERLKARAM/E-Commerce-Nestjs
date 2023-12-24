import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './auth/common/common.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, AuthModule , CommonModule, CategoryModule, SubCategoryModule],
})
export class AppModule {}
