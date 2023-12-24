import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  discount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expire: Date;

  // Add other properties as needed
}