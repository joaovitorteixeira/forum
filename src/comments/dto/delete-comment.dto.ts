import { ApiProperty } from '@nestjs/swagger';
import { ExistElement } from '../../Util/Decorator/exist-element.decorator';
import Comment from '../entity/comments.entity';

export default class DeleteCommentDto {
  @ApiProperty({
    description: 'The id of the comment to be deleted',
    example: 1,
  })
  @ExistElement({ columnName: 'id', entity: Comment })
  id: number;
}
