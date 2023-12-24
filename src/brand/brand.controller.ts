import { BrandService } from './brand.service';
import { Brand } from './brand.entity';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BrandDto } from './dtos/brand.dto';

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
  async create(@Body() brandDto: BrandDto): Promise<Brand> {
    return this.brandService.create(brandDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() brandDto: BrandDto): Promise<Brand> {
    return this.brandService.update(id, brandDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.brandService.delete(id);
  }
}
