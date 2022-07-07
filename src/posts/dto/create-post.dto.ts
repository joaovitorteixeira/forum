import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { REPORT_ERRORS } from 'src/Util/Constants/errors-reports.util';

export default class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My first post',
  })
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is my first post',
  })
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  content: string;

  @ApiProperty({
    description:
      'The tags of the post. If tags not exist, they will be created',
    example: ['tag1', 'tag2'],
  })
  @ArrayNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  tags: string[];
}
