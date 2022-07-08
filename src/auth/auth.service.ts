import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import LoginSucceededDto from './dto/login-succeeded.dto';
import JwtPayload from './Types/JwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Generate a JWT token
   * @param user The user to generate a token for
   * @returns The token and user information
   */
  async createToken(user: User): Promise<LoginSucceededDto> {
    const payload: JwtPayload = { email: user.email, id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  /**
   * Check if the password is correct given an email
   * @param email The email of the user
   * @param password The password of the user
   * @returns The user if found, null otherwise
   */
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);
    const isValid =
      user && (await AuthService.comparePassword(password, user.password));

    if (isValid) return user;

    return null;
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
