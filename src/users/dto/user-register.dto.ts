import { Match } from '@joaovitorteixeira/decorator-library';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import CreateAddressDto from '../../address/dto/create-address.dto';
import { CONSTANTS } from '../../Util/Constants/constants.util';
import { REPORT_ERRORS } from '../../Util/Constants/errors-reports.util';
import { CheckUnique } from '../../Util/Decorator/check-unique.decorator';
import { ValidAddress } from '../../Util/Decorator/valid-address.decorator';
import User from '../entity/users.entity';

export default class UserRegisterDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'valid@email.com',
  })
  @CheckUnique(User)
  email: string;

  @IsPhoneNumber('AU')
  @ApiProperty({
    description: 'The phone number of the user',
    example: '0400000000',
  })
  @CheckUnique(User)
  telephone: string;

  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: REPORT_ERRORS.FIELD_REQUIRED })
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Teixeira',
  })
  lastName: string;

  @ApiProperty({
    description: 'User address',
    type: CreateAddressDto,
  })
  @ValidAddress()
  address: CreateAddressDto;

  @IsString()
  @IsNotEmpty({ message: REPORT_ERRORS.FIELD_REQUIRED })
  @Length(CONSTANTS.MIN_PASSWORD_LENGTH, CONSTANTS.MAX_PASSWORD_LENGTH, {
    message: REPORT_ERRORS.FIELD_LENGTH(
      CONSTANTS.MIN_PASSWORD_LENGTH,
      CONSTANTS.MAX_PASSWORD_LENGTH,
    ),
  })
  @ApiProperty({
    description: `The password of the user. Must be between ${CONSTANTS.MIN_PASSWORD_LENGTH} and ${CONSTANTS.MAX_PASSWORD_LENGTH} characters`,
    example: '12345678',
  })
  password: string;

  @Match('password', { message: REPORT_ERRORS.PASSWORD_MISMATCH })
  @ApiProperty({
    description: 'The password confirmation of the user',
    example: '12345678',
  })
  confirmPassword: string;
}
