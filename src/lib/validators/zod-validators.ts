import { z } from 'zod';
import { isValidNigerianPhoneNumber } from './phone-validators';

/**
 * Zod validator for Nigerian phone numbers
 * 
 * Usage:
 * ```
 * const schema = z.object({
 *   phone: nigerianPhoneNumber()
 * });
 * ```
 */
export const nigerianPhoneNumber = () => 
  z.string()
    .min(11, { message: 'Phone number must be at least 11 digits.' })
    .max(14, { message: 'Phone number must not exceed 14 characters.' })
    .refine(
      (value) => isValidNigerianPhoneNumber(value),
      { message: 'Please enter a valid Nigerian phone number.' }
    );
