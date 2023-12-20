import { UpdatePasswordDto } from './Dtos/updatePassword.dto';
import { UpdateUserDto } from './Dtos/update.user.dto';
import { CreateUserDto } from './Dtos/create.user.dto';
import { User } from './user.entity';
import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { InvalidPasswordException } from "../filters/invalid-password.exception";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)private readonly userRepository: Repository<User>) {}

 
    //@create new user
    //@route user/createUser
    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const {username, email, password} = createUserDto;

        
    // Check if the email already exists in the database
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        })
        return this.userRepository.save(user);
    }


   //@getAllUsers
   //@route user/getAllUsers
    async findAllUsers(): Promise<User[]>{
        return await this.userRepository.find();
    }


    //@find one user by id
   //@route user/:id
   async findUser(where: FindOneOptions<User>): Promise<User>{
    const user = await this.userRepository.findOne(where)

    if(!user){
        throw new NotFoundException(`There isn't any user with identifier: ${where}`,)
    }
    return user;
   }
   


 
    //@remove user by id
    //@route user/:id
   async removeUser(id: number): Promise<void>{
  
    const user = await this.userRepository.findOneBy({id})

    if(!user){
         throw new NotFoundException(`NO User with this id: ${id} `)
    }

     await  this.userRepository.delete(id);
   }


    //@update user by id
    //@route user/:id
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>{
    const user = await this.userRepository.findOneBy({id});

    if(!user){
        throw new NotFoundException(`no user with this id: ${id}`)
    }
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;

    await this.userRepository.save(user);

    return user;
  }

  async updateUserPassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
     throw new NotFoundException(`No User with this id: ${id}`)
    }

    const isPasswordValid = await bcrypt.compare(updatePasswordDto.oldPassword, user.password);
    if (!isPasswordValid) {
      throw new InvalidPasswordException();
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
    return user;
  }

}

