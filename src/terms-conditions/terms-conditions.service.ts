import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../users/entity/users.entity';
import AgreeTermsConditionsDto from './dto/agree-terms-conditions.dto';
import CreateTermsConditionsDto from './dto/create-terms-conditions.dto';
import ReadTermsConditionsDto from './dto/read-terms-conditions.dto';
import { TermsConditions } from './entity/terms-conditions.entity';

@Injectable()
export class TermsConditionsService {
  constructor(
    @InjectRepository(TermsConditions)
    private termsConditionsRepository: Repository<TermsConditions>,
  ) {}

  /**
   * Create a new terms and conditions
   * @param termsConditions Terms and conditions to create
   * @returns Created terms and conditions
   */
  async create(
    termsConditions: CreateTermsConditionsDto,
  ): Promise<ReadTermsConditionsDto> {
    return this.termsConditionsRepository.create({ ...termsConditions }).save();
  }

  /**
   * Agree to a terms and conditions
   * @param termsConditions Terms and conditions to agree
   * @param user User who agrees the terms and conditions
   * @returns Agreed terms and conditions
   */
  async agree(
    termsConditions: AgreeTermsConditionsDto,
    user: User,
  ): Promise<ReadTermsConditionsDto> {
    const readTermsConditions = await this.termsConditionsRepository
      .createQueryBuilder('termsConditions')
      .leftJoinAndSelect('termsConditions.users', 'users')
      .where('id = :id', {
        id: termsConditions.id,
      })
      .andWhere((qb) => {
        return qb
          .where('users.id = :userId', {
            userId: user.id,
          })
          .orWhere('users.id IS NULL');
      })
      .orderBy('termsConditions.createdAt', 'DESC')
      .getOne();

    if (readTermsConditions.users.length != 0) {
      throw new ConflictException('Terms and conditions already agreed');
    }

    readTermsConditions.users.push(user);

    return readTermsConditions.save();
  }
}
