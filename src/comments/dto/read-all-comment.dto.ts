import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import PaginationDto from '../../Util/Pagination/dto/pagination.dto';

export default class ReadAllCommentDto extends PaginationDto {
  @IsEnum(['postId', 'commentId'])
  @ApiProperty({
    description: 'Comments from a post or a comment',
    enum: ['postId', 'commentId'],
    example: 'postId',
  })
  field: string;

  @Type(() => Number)
  @ApiProperty({
    description: 'The id of the post or comment',
    example: 1,
  })
  value: number;
}
