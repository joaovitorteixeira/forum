import { ApiProperty } from '@nestjs/swagger';
import ResponsePaginationDto from '../../Util/Pagination/dto/response-pagination.dto';
import ReadPostDto from './read-post.dto';

export default class PaginationPostDto extends ResponsePaginationDto {
  @ApiProperty({
    description: 'The posts',
    type: ReadPostDto,
    isArray: true,
  })
  data: ReadPostDto[];
}
