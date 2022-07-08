import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { REPORT_ERRORS } from '../../Util/Constants/errors-reports.util';

export default class CreateAddressDto {
  @ApiProperty({
    description: 'Street of the address',
    example: 'Street 1',
  })
  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  street: string;

  @ApiProperty({
    description: 'Number of the address',
    example: '1',
  })
  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  @IsOptional()
  number: string;

  @ApiProperty({
    description: 'City of the address',
    example: 'City 1',
  })
  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  city: string;

  @ApiProperty({
    description: 'State of the address',
    example: 'State 1',
  })
  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  state: string;

  @ApiProperty({
    description: 'Postal code of the address',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty({
    message: REPORT_ERRORS.FIELD_REQUIRED,
  })
  postalCode: string;
}
