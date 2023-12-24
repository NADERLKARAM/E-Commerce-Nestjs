import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from './sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async getAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find();
  }

  async getSubCategoryById(id: number): Promise<SubCategory> {
    return this.subCategoryRepository.findOneBy({id});
  }

  async createSubCategory(name: string, categoryId: number): Promise<SubCategory> {
    const newSubCategory = this.subCategoryRepository.create({ name, category: { id: categoryId } });
    return this.subCategoryRepository.save(newSubCategory);
  }

  async updateSubCategory(id: number, newName: string): Promise<SubCategory> {
    const subCategory = await this.getSubCategoryById(id);
    if (!subCategory) {
      // Handle not found error
      throw new Error('SubCategory not found');
    }

    subCategory.name = newName;
    return this.subCategoryRepository.save(subCategory);
  }

  async deleteSubCategory(id: number): Promise<boolean> {
    const subCategory = await this.getSubCategoryById(id);
    if (!subCategory) {
      // Handle not found error
      throw new Error('SubCategory not found');
    }

    await this.subCategoryRepository.remove(subCategory);
    return true;
  }
}
