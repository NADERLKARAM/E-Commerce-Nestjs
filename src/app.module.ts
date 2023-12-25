import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './auth/common/common.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { CouponModule } from './coupon/coupon.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ConfigModule.forRoot({}), DatabaseModule, UsersModule, AuthModule , CommonModule, CategoryModule, SubCategoryModule, BrandModule, CouponModule, ProductModule, ReviewModule],
})
export class AppModule {}
