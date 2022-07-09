import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../users/entity/users.entity';
import { UsersService } from '../users/users.service';
import HashPassword from '../Util/HashPassword';
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
      user && (await HashPassword.comparePassword(password, user.password));

    if (isValid) return user;

    return null;
  }
}
