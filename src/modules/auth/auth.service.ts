import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    const md5Pwd = md5(password).toUpperCase();
    console.log(md5Pwd);
    if (user.password !== md5Pwd) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, userid: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
