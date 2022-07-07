import { ApiProperty } from '@nestjs/swagger';

export default class LikePostDto {
  @ApiProperty({
    description: 'The id of the post to be liked',
    example: 1,
  })
  id: number;
}
