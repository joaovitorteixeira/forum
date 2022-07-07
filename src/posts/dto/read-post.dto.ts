import { ApiProperty } from '@nestjs/swagger';
import UserReadDto from 'src/users/dto/user-read.dto';

export default class ReadPostDto {
  @ApiProperty({
    description: 'The id of the post',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the post',
    example: 'My first post',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is my first post',
  })
  content: string;

  @ApiProperty({
    description: 'The date of the post',
    example: '2020-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The user of the post',
    type: UserReadDto,
  })
  user: UserReadDto;
}
