import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { CONSTANTS } from 'src/Util/Constants/constants.util';
import { REPORT_ERRORS } from 'src/Util/Constants/errors-reports.util';
import { Match } from 'src/Util/Decorator/match.decorator';

export default class UserRegisterDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber('AU')
  telephone: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(CONSTANTS.MIN_PASSWORD_LENGTH, CONSTANTS.MAX_PASSWORD_LENGTH, {
    message: REPORT_ERRORS.FIELD_LENGTH(
      CONSTANTS.MIN_PASSWORD_LENGTH,
      CONSTANTS.MAX_PASSWORD_LENGTH,
    ),
  })
  password: string;

  @IsString()
  @Match('password', { message: REPORT_ERRORS.PASSWORD_MISMATCH })
  confirmPassword: string;
}
