import { UpdateProductDto } from './dtos/update.product.dto';
import { CreateProductDto } from './dtos/create.product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['reviews'] });
  }

  async findOne(productId: number): Promise<Product> {
    return this.productRepository.findOneBy({productId});
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(productId: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(productId, updateProductDto);
    return this.productRepository.findOneBy({productId});
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }}
