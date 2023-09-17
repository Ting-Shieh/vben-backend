import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from './public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { error, success, wrapperResponse } from 'src/utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const { username, password } = dto;
    // const data = await this.authService.login(username, password);
    // return data;
    return wrapperResponse(
      this.authService.login(username, password),
      '登入成功',
    );
    // this.authService
    //   .login(username, password)
    //   .then((data) => success(data, '登入成功'))
    //   .catch((err) => error('Login Fail'));
  }
}
