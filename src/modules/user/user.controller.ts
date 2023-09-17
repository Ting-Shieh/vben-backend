import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { request } from 'http';
import { wrapperResponse } from '../../utils/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  getUserByToken(@Req() request) {
    return wrapperResponse(
      this.userService.findByUsername(request.user.username),
      '獲取用戶訊息成功',
    );
  }
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Post()
  addUser(@Body() createUserDto: CreateUserDto): any {
    const userReq = createUserDto as unknown as User;
    return this.userService.create(userReq);
  }
  @Delete(':id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
