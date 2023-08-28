import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    return 'Get Users';
  }
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return 'Get Users';
  }
}
