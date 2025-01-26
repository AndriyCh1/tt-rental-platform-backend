import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsDateWithTimezoneConstraint
  implements ValidatorConstraintInterface
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(dateString: any) {
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
