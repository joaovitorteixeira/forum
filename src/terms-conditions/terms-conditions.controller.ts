import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateTermsConditionsDto from './dto/create-terms-conditions.dto';
import ReadTermsConditionsDto from './dto/read-terms-conditions.dto';
import { TermsConditionsService } from './terms-conditions.service';

@Controller('terms-conditions')
@ApiTags('TermsConditions')
@UseGuards(JwtAuthGuard)
export class TermsConditionsController {
  constructor(private termsConditionsService: TermsConditionsService) {}

  @Post('create')
  @ApiCreatedResponse({
    description: 'Terms and conditions created',
    type: ReadTermsConditionsDto,
  })
  @ApiBasicAuth('Authorization')
  async create(@Body() terms: CreateTermsConditionsDto): Promise<any> {
    return await this.termsConditionsService.create(terms);
  }
}
