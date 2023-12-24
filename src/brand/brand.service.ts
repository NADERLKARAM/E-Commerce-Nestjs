import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
   constructor( @InjectRepository(Brand)
   private readonly brandRepository: Repository<Brand>){}


   async findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async findById(id: number): Promise<Brand> {
    return this.brandRepository.findOneBy({id});
  }

  async create(data: Partial<Brand>): Promise<Brand> {
    const newBrand = this.brandRepository.create(data);
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, data: Partial<Brand>): Promise<Brand> {
    await this.brandRepository.update(id, data);
    return this.brandRepository.findOneBy({id});
  }

  async delete(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }

}
