import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;



  @OneToMany(() => Product, product => product.brand)
  products: Product[];

}