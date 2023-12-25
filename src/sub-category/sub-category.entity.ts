// subCategory.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, category => category.subCategories)
  category: Category;


  @OneToMany(() => Product, product => product.subCategory)
  products: Product[];
}