import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class HashPassword {
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
