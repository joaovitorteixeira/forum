import { ApiProperty } from '@nestjs/swagger';
import ResponsePaginationDto from '../../Util/Pagination/dto/response-pagination.dto';
import ReadCommentDto from './read-comment';

export default class PaginationCommentDto extends ResponsePaginationDto {
  @ApiProperty({
    description: 'The comments',
    type: ReadCommentDto,
    isArray: true,
  })
  data: ReadCommentDto[];
}
