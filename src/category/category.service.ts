import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['subCategories'] });
  }

  async getCategoryById(id: number): Promise<Category> {

    const category = await this.categoryRepository.findOneBy({id});
    if (!category) {
      throw new NotFoundException('Category not found');
    }
  return category;
  }

  async createCategory(name: string): Promise<Category> {
    const newCategory = this.categoryRepository.create({ name });
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(id: number, newName: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = newName;
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new Error('Category not found');
    }

    await this.categoryRepository.remove(category);
    return true;
  }
}
