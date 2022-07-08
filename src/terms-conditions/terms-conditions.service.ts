import { Injectable } from '@nestjs/common';
import CreateTermsConditionsDto from './dto/create-terms-conditions.dto';
import ReadTermsConditionsDto from './dto/read-terms-conditions.dto';
import { TermsConditions } from './entity/terms-conditions.entity';

@Injectable()
export class TermsConditionsService {
  constructor() {}

  async create(
    termsConditions: CreateTermsConditionsDto,
  ): Promise<ReadTermsConditionsDto> {
    const createdTermsConditions = await new TermsConditions();

    createdTermsConditions.description = termsConditions.description;

    return createdTermsConditions.save();
  }
}
