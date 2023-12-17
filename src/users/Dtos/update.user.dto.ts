import { IsEmail, IsString, Length } from "class-validator";

export class UpdateUserDto{
    
    @Length(5, 50)
    @IsString()
    username ?: string;

    @IsEmail({}, { message: 'incorrect email' })
    email ?: string;
    
}