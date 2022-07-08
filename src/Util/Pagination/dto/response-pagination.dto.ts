import { ApiProperty } from '@nestjs/swagger';

export default class ResponsePaginationDto {
  @ApiProperty({
    description: 'The total number of items',
    example: 10,
  })
  total: number;

  @ApiProperty({
    description: 'The current page',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'The total items per page',
    example: 1,
  })
  limit: number;

  @ApiProperty({
    description: 'The items of the current page',
    example: [],
  })
  data: any[];
}
