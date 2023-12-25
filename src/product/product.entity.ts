import { Brand } from 'src/brand/brand.entity';
import { Category } from 'src/category/category.entity';
import { Review } from 'src/review/review.entity';
import { SubCategory } from 'src/sub-category/sub-category.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class Product {
   @PrimaryGeneratedColumn()
    productId: number;  

 @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({type: Number,default: 0})
  sold: number;

  @Column()
  price: number;

  @Column()
  priceAfterDiscount: number;

  @Column('simple-array')
  colors: string[];

  @Column()
  ratingsAverage: number;

  @Column()
  ratingsQuantity: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @ManyToOne(() => SubCategory, subcategory => subcategory.products)
  subCategory: SubCategory;

  @ManyToOne(() => Brand, brand => brand.products)
  brand: Brand;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}