import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import User from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  /**
   * Check if the password is correct given an email
   * @param email The email of the user
   * @param password The password of the user
   * @returns The user if found, exception otherwise
   */
  async login(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);
    const isValid =
      user && (await AuthService.comparePassword(password, user.password));

    if (isValid) return user;

    throw new UnauthorizedException();
  }

  /**
   * Hash the password
   * @param password The password to hash
   * @returns String The hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(
      +new ConfigService().get('BCRYPT_SALT_ROUNDS'),
    );

    return bcrypt.hash(password, salt);
  }

  /**
   * Check if the password is correct
   * @param password The password to compare
   * @param hash The hash to compare with
   * @returns Boolean True if the password is correct, false otherwise
   */
  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
