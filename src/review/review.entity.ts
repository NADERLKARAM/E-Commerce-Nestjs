import { Product } from 'src/product/product.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @Column()
  title: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;
}