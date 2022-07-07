import { ConflictException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BaseEntity } from 'typeorm';

/**
 * Validate if the entity has an element with the given id.
 * @param property Class extends BaseEntity
 * @param validationOptions
 * @returns
 */
export function CheckUnique(
  entity: typeof BaseEntity,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: CheckUniqueConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'CheckUnique' })
export class CheckUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [Class] = args.constraints;
    const key = args.property;
    const element = await Class.findOneBy({ [key]: value });

    if (element)
      throw new ConflictException(
        `${Class.name} with ${key} ${value} already exists`,
      );

    return true;
  }
}
