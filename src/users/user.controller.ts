import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import UserRegisterDto from './dto/user-register.dto';
import User from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export default class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: UserRegisterDto): Promise<User> {
    return this.usersService.register(user);
  }
}
