import { IsDateWithTimezoneConstraint } from '#shared/utils/validators';

describe('IsDateWithTimezoneConstraint', () => {
  let validator: IsDateWithTimezoneConstraint;

  beforeEach(() => {
    validator = new IsDateWithTimezoneConstraint();
  });

  it('should return true for valid ISO 8601 date with timezone', () => {
    const validDate = '2025-01-26T12:00:00Z';
    const result = validator.validate(validDate);
    expect(result).toBe(true);
  });

  it('should return true for valid ISO 8601 date with custom timezone', () => {
    const validDateWithOffset = '2025-01-26T12:00:00+01:00';
    const result = validator.validate(validDateWithOffset);
    expect(result).toBe(true);
  });

  it('should return false for invalid ISO 8601 date without timezone', () => {
    const invalidDateWithoutTimezone = '2025-01-26T12:00:00';
    const result = validator.validate(invalidDateWithoutTimezone);
    expect(result).toBe(false);
  });

  it('should return false for invalid date format', () => {
    const invalidDate = '2025-01-26T12:00:00ZZ';
    const result = validator.validate(invalidDate);
    expect(result).toBe(false);
  });

  it('should return false for non-string input', () => {
    const nonStringInput = 20250126;
    const result = validator.validate(nonStringInput);
    expect(result).toBe(false);
  });

  it('should return false for invalid date string', () => {
    const invalidDateString = 'invalid-date';
    const result = validator.validate(invalidDateString);
    expect(result).toBe(false);
  });
});
