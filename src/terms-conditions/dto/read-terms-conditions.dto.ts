import { ApiProperty } from '@nestjs/swagger';

export default class ReadTermsConditionsDto {
  @ApiProperty({
    description: 'Terms and conditions id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Terms and conditions description',
    example: 'Terms and conditions description',
  })
  description: string;

  @ApiProperty({
    description: 'Date when terms and conditions was created',
    example: '2020-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}
