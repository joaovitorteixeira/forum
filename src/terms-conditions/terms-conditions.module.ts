import { Module } from '@nestjs/common';
import { TermsConditionsController } from './terms-conditions.controller';
import { TermsConditionsService } from './terms-conditions.service';

@Module({
  providers: [TermsConditionsService],
  controllers: [TermsConditionsController],
})
export class TermsConditionsModule {}
