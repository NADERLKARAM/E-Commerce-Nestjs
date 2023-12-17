import { Length } from 'class-validator';


export class UpdatePasswordDto{
    oldPassword: string;

    @Length(6)
    newPassword: string;
}