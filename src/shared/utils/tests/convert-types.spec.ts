import {
  toIntOrFallback,
  toNumberOrFallback,
} from '#shared/utils/convert-types';

describe('toNumberOrFallback', () => {
  describe('The value is a valid number', () => {
    it('should return the number when the value is a valid string number', () => {
      expect(toNumberOrFallback('123')).toBe(123);
    });

    it('should return the number when the value is a valid number', () => {
      expect(toNumberOrFallback(123)).toBe(123);
    });

    it('should return the number when the value is a valid float number', () => {
      expect(toNumberOrFallback('123.45')).toBe(123.45);
    });
  });

  describe('The value is not a valid number', () => {
    it('should return fallback when the value is not a valid string number', () => {
      expect(toNumberOrFallback('abc', 0)).toBe(0);
    });

    it('should return fallback when the value is not a valid number', () => {
      expect(toNumberOrFallback(null, -1)).toBe(-1);
    });
  });

  it('should return undefined when no fallback is provided and the value is invalid', () => {
    expect(toNumberOrFallback('abc')).toBeUndefined();
  });
});

describe('toIntOrFallback', () => {
  describe('The value is a valid integer', () => {
    it('should return the integer when the value is a valid string number', () => {
      expect(toIntOrFallback('123')).toBe(123);
    });

    it('should return the integer when the value is a valid number', () => {
      expect(toIntOrFallback(123)).toBe(123);
    });
  });

  describe('The value is not a valid integer', () => {
    it('should return fallback when the value is a float number', () => {
      expect(toIntOrFallback('123.45', 0)).toBe(0);
    });

    it('should return fallback when the value is a non-numeric string', () => {
      expect(toIntOrFallback('abc', 0)).toBe(0);
    });

    it('should return fallback when the value is null', () => {
      expect(toIntOrFallback(null, -1)).toBe(-1);
    });

    it('should return fallback when the value is undefined', () => {
      expect(toIntOrFallback(undefined, 100)).toBe(100);
    });
  });

  it('should return undefined when no fallback is provided and the value is invalid', () => {
    expect(toIntOrFallback('abc')).toBeUndefined();
  });
});
