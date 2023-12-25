import { Brand } from 'src/brand/brand.entity';
import { Category } from 'src/category/category.entity';
import { SubCategory } from 'src/sub-category/sub-category.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;  

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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}