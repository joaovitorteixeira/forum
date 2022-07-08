import { ApiProperty } from '@nestjs/swagger';

export default class ResponsePaginationDto {
  @ApiProperty({
    description: 'The total number of items',
    example: 10,
  })
  total: number;

  @ApiProperty({
    description: 'The items of the current page',
    example: [],
  })
  data: any[];
}
