import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import PaginationDto from '../../Util/Pagination/dto/pagination.dto';

export default class ReadAllPostDto extends PaginationDto {
  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'Filter posts by tag',
    example: ['tag1', 'tag2'],
  })
  tags: string[];
}
