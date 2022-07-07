import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [ConfigService, UsersModule],
})
export class AuthModule {}
