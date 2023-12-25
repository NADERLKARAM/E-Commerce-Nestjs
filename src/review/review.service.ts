import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/users/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';



@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async createReview(id: number, productId: number, title: string, rating: number): Promise<Review> {
    const user = await this.userService.findById(id);
    const product = await this.productService.findOne(productId);

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const review = this.reviewRepository.create({
      title,
      rating,
      user,
      product,
    });
    
    return this.reviewRepository.save(review);
  }

  async getReviewById(reviewId: number): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({reviewId});
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async updateReview(reviewId: number, updatedData: Partial<Review>): Promise<Review> {
    const review = await this.getReviewById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    Object.assign(review, updatedData);
    return this.reviewRepository.save(review);
  }

  async deleteReview(reviewId: number): Promise<void> {
    const review = await this.getReviewById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    await this.reviewRepository.delete(reviewId);
  }
}