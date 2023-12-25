import { Role } from "src/auth/common/guards/role.enum";
import { Review } from "src/review/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    username: string;


    @Column({unique:true})
    email: string;

    @Column()
    password: string;

   @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
    array: true
  })
  roles: [];


  @Column({ nullable: true })
  resetCode: string;

  @Column({ nullable: true })
  resetCodeGeneratedAt: Date;

  @Column({ nullable: true })
  resetCodeExpiration: Date;

  @Column({ nullable: true })
  passwordResetVerified: boolean;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

}