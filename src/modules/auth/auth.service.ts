import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
  }
}
