import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';

import { ProductModule } from '../product/product.module';
import { UsersModule } from 'src/users/user.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    UsersModule, // Import UserModule as Review might have relationships with User
    ProductModule, // Import ProductModule as Review might have relationships with Product
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
