import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      data: user ,access_token: await this.jwtService.signAsync(payload)
    };
  }
}