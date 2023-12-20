
import { IsEmail, IsString, Length } from "class-validator";

export class SignInDto{

    @IsEmail({}, { message: 'incorrect email' })
    email: string;
 
    @Length(6)
  @IsString()
    password: string;
    
}