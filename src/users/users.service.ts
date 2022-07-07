import { Injectable } from '@nestjs/common';
import UserRegisterDto from './dto/user-register.dto';
import User from './users.entity';

/**
 * All possible user identifiers types (id, email)
 */
type UserIdentificationType = string | number;
@Injectable()
export class UsersService {
  /**
   * Register a new user
   * @param user The user to create in the database
   * @returns The created user
   */
  async register(user: UserRegisterDto): Promise<User> {
    const newUser = new User();

    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.telephone = user.telephone;
    newUser.password = user.password;

    return newUser.save();
  }

  /**
   * Try to find a user by id or email
   * @param identifier The user identifier: id or email
   * @returns The user if found, null otherwise
   */
  async findOne(identifier: UserIdentificationType): Promise<User> {
    if (isNaN(Number(identifier))) {
      return await User.findOneBy({ email: identifier as string });
    }

    return await User.findOneBy({ id: identifier as number });
  }
}
