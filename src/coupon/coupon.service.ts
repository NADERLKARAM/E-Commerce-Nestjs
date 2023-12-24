import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { CouponDto } from './dtos/coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async findAll(): Promise<Coupon[]> {
    return this.couponRepository.find();
  }

  async findById(id: number): Promise<Coupon> {
    return this.couponRepository.findOneBy({id});
  }

  async create(couponDto: CouponDto): Promise<Coupon> {
    const newCoupon = this.couponRepository.create(couponDto);
    return this.couponRepository.save(newCoupon);
  }

  async update(id: number, couponDto: CouponDto): Promise<Coupon> {
    await this.couponRepository.update(id, couponDto);
    return this.couponRepository.findOneBy({id});
  }

  async delete(id: number): Promise<void> {
    await this.couponRepository.delete(id);
  }
}
