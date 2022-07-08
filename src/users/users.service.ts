import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import UserRegisterDto from './dto/user-register.dto';
import User from './entity/users.entity';

/**
 * All possible user identifiers types (id, email)
 */
type UserIdentificationType = string | number;
@Injectable()
export class UsersService {
  constructor(private eventEmitter: EventEmitter2) {}

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

    const userCreated = await newUser.save();

    this.eventEmitter.emit('user.created', {
      user: userCreated,
      address: user.address,
    });

    return userCreated;
  }

  /**
   * Try to find a user by id or email
   * @param identifier The user identifier: id or email
   * @returns The user if found, null otherwise
   */
  async findOne(identifier: UserIdentificationType): Promise<User> {
    if (isNaN(Number(identifier))) {
      return await User.findOne({
        where: { email: identifier as string },
        relations: ['address'],
      });
    }

    return await User.findOne({
      where: { id: identifier as number },
      relations: ['address'],
    });
  }
}
