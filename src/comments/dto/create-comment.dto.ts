import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import Post from '../../posts/entity/posts.entity';
import { REPORT_ERRORS } from '../../Util/Constants/errors-reports.util';
import { ExistElement } from '../../Util/Decorator/exist-element.decorator';
import Comment from '../entity/comments.entity';

export default class CreateCommentDto {
  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  @ApiProperty({
    description: 'Comment text',
    example: 'This is a comment',
  })
  text: string;

  @ExistElement({ columnName: 'id', entity: Post })
  @ApiProperty({
    description: 'Post id',
    example: 1,
  })
  postId: number;

  @ExistElement({ columnName: 'id', entity: Comment })
  @IsOptional()
  @ApiProperty({
    description:
      'Comment id. If not provided, the comment will be created as a root comment',
    example: 1,
  })
  commentId: number;
}
