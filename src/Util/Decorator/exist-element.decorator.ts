import { NotFoundException } from '@nestjs/common';
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
export function ExistElement(
  entity: typeof BaseEntity,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: ExistElementConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'ExistElement' })
export class ExistElementConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [Class] = args.constraints;
    const key = args.property;
    const element = await Class.findOneBy({ [key]: value });

    if (!element)
      throw new NotFoundException(
        `${Class.name} with ${key} ${value} not found`,
      );

    return true;
  }
}
