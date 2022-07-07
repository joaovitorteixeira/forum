import { ApiProperty } from '@nestjs/swagger';
import { ExistElement } from '../../Util/Decorator/exist-element.decorator';
import Post from '../entity/posts.entity';

export default class LikePostDto {
  @ApiProperty({
    description: 'The id of the post to be liked',
    example: 1,
  })
  @ExistElement(
    { columnName: 'id', entity: Post },
    {
      message: 'The post does not exist',
    },
  )
  id: number;
}
