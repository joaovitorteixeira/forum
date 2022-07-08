import { ApiProperty } from '@nestjs/swagger';
import { ExistElement } from '../../Util/Decorator/exist-element.decorator';
import { TermsConditions } from '../entity/terms-conditions.entity';

export default class AgreeTermsConditionsDto {
  @ApiProperty({
    description: 'Terms and conditions id',
    example: 1,
  })
  @ExistElement({
    columnName: 'id',
    entity: TermsConditions,
  })
  id: number;
}
