import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Get()
  getAllUsers() {
    return this.userService.findAll();
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
