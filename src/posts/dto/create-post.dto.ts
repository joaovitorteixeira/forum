import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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
}
