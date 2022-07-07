import { Injectable } from '@nestjs/common';
import UserRegisterDto from './dto/user-register.dto';
import User from './users.entity';

@Injectable()
export class UsersService {
  constructor() {}

  async register(user: UserRegisterDto): Promise<User> {
    const newUser = new User();

    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.telephone = user.telephone;
    newUser.password = user.password;

    return newUser.save();
  }
}
