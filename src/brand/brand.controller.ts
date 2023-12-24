import { BrandService } from './brand.service';
import { Brand } from './brand.entity';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Brand> {
    return this.brandService.findById(id);
  }

  @Post('create')
  async create(@Body() brandData: Partial<Brand>): Promise<Brand> {
    return this.brandService.create(brandData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() brandData: Partial<Brand>): Promise<Brand> {
    return this.brandService.update(id, brandData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.brandService.delete(id);
  }
}
