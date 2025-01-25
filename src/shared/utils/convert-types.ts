/* eslint-disable @typescript-eslint/no-explicit-any */
import { isInt, isNumber } from 'class-validator';

/**
 * Allows to convert a value to a number, if it is not a number, it returns the fallback.
 * Fallback is optional and can be any value is needed.
 *
 * Useful for converting unknown value types to number.
 */
export const toNumberOrFallback = (value: unknown, fallback?: any) => {
  const number = Number(value);

  return isNumber(number) ? number : fallback;
};

/**
 * Allows to convert a value to an integer, if it is not an integer, it returns the fallback value.
 *
 * Useful for converting unknown value types to integer.
 */
export const toIntOrFallback = (value: unknown, fallback?: any) => {
  const number = Number(value);

  return isInt(number) ? number : fallback;
};
