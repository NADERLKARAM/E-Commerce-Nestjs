import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Coupon } from './coupon.entity';
import { CouponDto } from './dtos/coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  async findAll(): Promise<Coupon[]> {
    return this.couponService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Coupon> {
    return this.couponService.findById(id);
  }

  @Post()
  async create(@Body() couponDto: CouponDto): Promise<Coupon> {
    return this.couponService.create(couponDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() couponDto: CouponDto): Promise<Coupon> {
    return this.couponService.update(id, couponDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.couponService.delete(id);
  }
}
