import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findUser({where:{email}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException(`Incorrect email or password`)
         }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload), data: user
    };
  }



  //desc forgotPassword 
  //@rout auth/forgotPassword
  async forgotPassword(email: string) {
    const user = await this.usersService.findUser({where:{email}});
    if (!user) {
      throw new NotFoundException();
    }

        // Generate a 6-digit code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();


        // Hash the reset code using crypto
        const hashedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
        user.resetCode = hashedResetCode;
      const verify =  user.passwordResetVerified = false;


        // Update the user in the database with the hashed reset code
              const expirationDurationInDays = 1; // Expiration duration in days
              const resetCodeExpiration = new Date();
              resetCodeExpiration.setDate(resetCodeExpiration.getDate() + expirationDurationInDays);
          
              await this.usersService.updateResetCode(
                email,
                hashedResetCode,
                resetCodeExpiration,
                verify
             
      )
       
}
}