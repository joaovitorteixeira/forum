import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [ConfigService],
})
export class AuthModule {}
