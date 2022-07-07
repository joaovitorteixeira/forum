import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNumber } from 'class-validator';
import { REPORT_ERRORS } from '../../Util/Constants/errors-reports.util';

export default class CreateTagDto {
  @ApiProperty({
    description: 'Post id witch the tag belongs to',
    example: 1,
  })
  @IsNumber()
  postId: number;

  @ApiProperty({
    description: 'Array of tags',
    example: ['tag1', 'tag2'],
  })
  @ArrayNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  tags: string[];
}
