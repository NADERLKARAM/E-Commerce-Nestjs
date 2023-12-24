import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module'; // Import the CategoryModule
import { SubCategory } from './sub-category.entity';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubCategory]),
    CategoryModule, // Include the CategoryModule to use its services in this module
  ],
  providers: [SubCategoryService],
  controllers: [SubCategoryController],
})
export class SubCategoryModule {}
