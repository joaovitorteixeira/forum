import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginSucceededDto from './dto/login-succeeded.dto';
import LoginDto from './dto/login.dto';
import LocalAuthGuard from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @ApiCreatedResponse({
    description: 'Bearer token created',
    type: LoginSucceededDto,
  })
  async login(@Req() req): Promise<LoginSucceededDto> {
    return this.authService.createToken(req.user);
  }
}
