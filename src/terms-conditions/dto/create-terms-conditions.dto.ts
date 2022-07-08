import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { REPORT_ERRORS } from '../../Util/Constants/errors-reports.util';

export default class CreateTermsConditionsDto {
  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  @ApiProperty({
    description: 'Terms and conditions description',
    example: 'Terms and conditions description',
  })
  description: string;
}
