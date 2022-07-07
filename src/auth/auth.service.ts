import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor() {}

  static async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(
      +new ConfigService().get('BCRYPT_SALT_ROUNDS'),
    );

    return bcrypt.hash(password, salt);
  }
}
