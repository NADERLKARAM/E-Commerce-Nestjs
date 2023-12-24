import { CategoryService } from './category.service';
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Post('create')
  async createCategory(@Body('name') name: string): Promise<Category> {
    return this.categoryService.createCategory(name);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body('name') newName: string): Promise<Category> {
    return this.categoryService.updateCategory(id, newName);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }
}