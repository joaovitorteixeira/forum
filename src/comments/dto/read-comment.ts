import { ApiProperty } from '@nestjs/swagger';
import ReadPostDto from '../../posts/dto/read-post.dto';
import UserReadDto from '../../users/dto/user-read.dto';

export default class ReadCommentDto {
  @ApiProperty({
    description: 'The id of the comment',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The text of the comment',
    example: 'This is a comment',
  })
  text: string;

  @ApiProperty({
    description: 'The  user who created the comment',
    type: UserReadDto,
  })
  user: UserReadDto;

  @ApiProperty({
    description: 'The post to which the comment belongs',
    type: ReadPostDto,
  })
  post: ReadPostDto;

  @ApiProperty({
    description: 'Parent comment',
    type: ReadCommentDto,
  })
  parent: ReadCommentDto;

  @ApiProperty({
    description: 'The date when the comment was created',
    example: '2020-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}
