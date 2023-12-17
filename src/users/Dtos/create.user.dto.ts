
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{
    
    @Length(5, 50)
    @IsString()
    username: string;

    @IsEmail({}, { message: 'incorrect email' })
    email: string;
 
    @Length(6)
  @IsString()
    password: string;
    
}