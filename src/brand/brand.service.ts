import { BrandDto } from './dtos/brand.dto';
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

  async create(brandDto: BrandDto): Promise<Brand> {
    const newBrand = this.brandRepository.create(brandDto);
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, brandDto: BrandDto): Promise<Brand> {
    await this.brandRepository.update(id, brandDto);
    return this.brandRepository.findOneBy({id});
  }

  async delete(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }

}
