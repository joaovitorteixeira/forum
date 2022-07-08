import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CONSTANTS } from 'src/Util/Constants/constants.util';
import { REPORT_ERRORS } from 'src/Util/Constants/errors-reports.util';

export default class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'valid@email.com',
  })
  @IsString()
  @IsNotEmpty({ message: REPORT_ERRORS.FIELD_REQUIRED })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty({ message: REPORT_ERRORS.FIELD_REQUIRED })
  @Length(CONSTANTS.MIN_PASSWORD_LENGTH, CONSTANTS.MAX_PASSWORD_LENGTH, {
    message: REPORT_ERRORS.FIELD_LENGTH(
      CONSTANTS.MIN_PASSWORD_LENGTH,
      CONSTANTS.MAX_PASSWORD_LENGTH,
    ),
  })
  password: string;
}
