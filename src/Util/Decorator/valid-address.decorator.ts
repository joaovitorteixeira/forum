import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AddressService } from '../../address/address.service';
import CreateAddressDto from '../../address/dto/create-address.dto';

/**
 * Validate address if it exists.
 * @param address User's address
 * @param validationOptions Validation options
 * @returns If the address exists
 */
export function ValidAddress(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidAddressConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'ValidAddress' })
export class ValidAddressConstraint implements ValidatorConstraintInterface {
  async validate(address: CreateAddressDto) {
    try {
      await new AddressService(new ConfigService()).getCoordinates(address);

      return true;
    } catch (e) {
      throw new NotFoundException(`Address not found`);
    }
  }
}
