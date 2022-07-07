import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'valid@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  password: string;
}
