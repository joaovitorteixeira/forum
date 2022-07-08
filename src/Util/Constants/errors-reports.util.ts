import { ValidationArguments } from 'class-validator';

const PASSWORD_MISMATCH = 'Passwords do not match.';

const FIELD_MAX_VALUE = (
  maxValue: number,
): ((value: ValidationArguments) => string) => {
  return (value: ValidationArguments): string => {
    return `${value.value} must be less than ${maxValue}`;
  };
};

const FIELD_MIN_VALUE = (
  minValue: number,
): ((value: ValidationArguments) => string) => {
  return (value: ValidationArguments): string => {
    return `${value.value} must be greater than ${minValue}`;
  };
};

const FIELD_REQUIRED = (value: ValidationArguments) => {
  return `${value.property} is required.`;
};

const FIELD_LENGTH = (
  minValue: number,
  maxValue: number,
): ((value: ValidationArguments) => string) => {
  return (value): string => {
    if (value.value.length < minValue)
      return `${value.property} must be at least ${minValue} characters long.`;

    return `${value.property} must be at most ${maxValue} characters long.`;
  };
};

export const REPORT_ERRORS = {
  PASSWORD_MISMATCH,
  FIELD_LENGTH,
  FIELD_REQUIRED,
  FIELD_MAX_VALUE,
  FIELD_MIN_VALUE,
};
