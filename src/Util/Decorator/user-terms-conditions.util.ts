import {
  ForbiddenException,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { TermsConditions } from '../../terms-conditions/entity/terms-conditions.entity';
import User from '../../users/entity/users.entity';

/**
 * Pipe to validate if user already agreed to terms and conditions.
 * @note: This only work together with GetUser decorator.
 */
@Injectable({ scope: Scope.REQUEST })
export default class UserTermsConditionsUtil implements PipeTransform {
  async transform(value: User) {
    const termsCondition = await TermsConditions.createQueryBuilder(
      'termsCondition',
    )
      .orderBy('createdAt', 'DESC')
      .leftJoinAndSelect('termsCondition.users', 'users')
      .getOne();

    if (termsCondition && !termsCondition.users.length) {
      throw new ForbiddenException(
        'You must agree to the latest terms and conditions',
      );
    }

    return value;
  }
}
