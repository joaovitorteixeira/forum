import { NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BaseEntity } from 'typeorm';

type ExistElementOptions = {
  entity: typeof BaseEntity;
  columnName: string;
};

/**
 * Validate if the entity has an element with the given id.
 * @param property Class extends BaseEntity
 * @param validationOptions
 * @returns
 */
export function ExistElement(
  entity: ExistElementOptions,
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
    const [{ entity: Class, columnName }] =
      args.constraints as ExistElementOptions[];
    const key = args.property;
    const element = await Class.findOneBy({ [columnName]: value });

    if (!element)
      throw new NotFoundException(
        `${Class.name} with ${key} ${value} not found`,
      );

    return true;
  }
}
