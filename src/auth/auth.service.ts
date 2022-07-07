import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor() {}

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
}
