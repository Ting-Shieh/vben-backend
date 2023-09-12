import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from './public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const { username, password } = dto;
    const user = await this.authService.login(username, password);
    return 'login~';
  }
}
