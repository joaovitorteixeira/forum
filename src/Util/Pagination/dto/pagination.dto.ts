import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';
import { REPORT_ERRORS } from '../../Constants/errors-reports.util';

export default class PaginationDto {
  @ApiProperty({
    description: 'The page number',
    example: 1,
  })
  @Min(1, {
    message: REPORT_ERRORS.FIELD_MIN_VALUE(1),
  })
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: 'The number of elements per page',
    example: 10,
  })
  @Max(100, {
    message: REPORT_ERRORS.FIELD_MAX_VALUE(100),
  })
  @Min(1, {
    message: REPORT_ERRORS.FIELD_MIN_VALUE(1),
  })
  @Type(() => Number)
  limit: number;
}
