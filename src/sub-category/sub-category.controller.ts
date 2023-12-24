import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategory } from './sub-category.entity';

@Controller('categories/:categoryId/subcategories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  async getAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoryService.getAllSubCategories();
  }

  @Get(':id')
  async getSubCategoryById(@Param('id') id: number): Promise<SubCategory> {
    const subCategory = await this.subCategoryService.getSubCategoryById(id);
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }
    return subCategory;
  }

  @Post('create')
  async createSubCategory(
    @Body('name') name: string,
    @Body('categoryId') categoryId: number,
  ): Promise<SubCategory> {
    return this.subCategoryService.createSubCategory(name, categoryId);
  }

  @Put(':id')
  async updateSubCategory(@Param('id') id: number, @Body('name') newName: string): Promise<SubCategory> {
    return this.subCategoryService.updateSubCategory(id, newName);
  }

  @Delete(':id')
  async deleteSubCategory(@Param('id') id: number): Promise<boolean> {
    return this.subCategoryService.deleteSubCategory(id);
  }
}