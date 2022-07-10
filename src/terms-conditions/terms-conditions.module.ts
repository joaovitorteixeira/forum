import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsConditions } from './entity/terms-conditions.entity';
import { TermsConditionsController } from './terms-conditions.controller';
import { TermsConditionsService } from './terms-conditions.service';

@Module({
  imports: [TypeOrmModule.forFeature([TermsConditions])],
  providers: [TermsConditionsService],
  controllers: [TermsConditionsController],
})
export class TermsConditionsModule {}
