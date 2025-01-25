import { ApiProperty } from '@nestjs/swagger';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsDateWithTimezoneConstraint
  implements ValidatorConstraintInterface
{
  validate(dateString: string) {
    if (typeof dateString !== 'string') return false;

    const isoDateWithTimezoneRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

    // Check if it matches the ISO 8601 format with timezone
    if (!isoDateWithTimezoneRegex.test(dateString)) {
      return false;
    }

    // Parse the date to ensure it's valid
    const parsedDate = new Date(dateString);

    return !isNaN(parsedDate.getTime());
  }
}

function IsDateWithTimezone(options?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string) => {
    const validationOptions: ValidationOptions = {
      ...options,
      message: `${propertyKey} must be a valid ISO 8601 date with timezone`,
    };
    registerDecorator({
      name: 'IsDateWithTimezone',
      target: target.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [],
      validator: IsDateWithTimezoneConstraint,
    });
  };
}

export class RentItemDto {
  @ApiProperty({
    example: '2025-03-25T13:00:00.000Z',
    description:
      'The start date of the rental in ISO 8601 format with a timezone.',
  })
  @IsDateWithTimezone()
  startDate: string;

  @ApiProperty({
    example: '2025-04-25T13:00:00.000Z',
    description:
      'The end date of the rental in ISO 8601 format with a timezone.',
  })
  @IsDateWithTimezone()
  endDate: string;
}
