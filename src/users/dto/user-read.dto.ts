import { ApiProperty } from '@nestjs/swagger';

export default class UserReadDto {
  @ApiProperty({
    description: 'The id of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'valid@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Teixeira',
  })
  lastName: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '0400000000',
  })
  telephone: string;
}
