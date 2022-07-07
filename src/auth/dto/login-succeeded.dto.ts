import { ApiProperty } from '@nestjs/swagger';
import UserReadDto from 'src/users/dto/user-read.dto';

export default class LoginSucceededDto {
  @ApiProperty({
    description: 'Bearer token',
  })
  accessToken: string;

  @ApiProperty({
    type: UserReadDto,
  })
  user: UserReadDto;
}
