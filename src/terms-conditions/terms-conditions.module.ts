import { Module } from '@nestjs/common';
import { TermsConditionsService } from './terms-conditions.service';

@Module({
  providers: [TermsConditionsService]
})
export class TermsConditionsModule {}
