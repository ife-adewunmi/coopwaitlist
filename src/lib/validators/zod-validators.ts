import { z } from 'zod'
import { isValidNigerianPhoneNumber } from './phone-validators'

export const nigerianPhoneNumber = () =>
  z
    .string()
    .min(11, { message: 'Phone number must be at least 11 digits.' })
    .max(14, { message: 'Phone number must not exceed 14 characters.' })
    .refine((value) => isValidNigerianPhoneNumber(value), {
      message: 'Please enter a valid Nigerian phone number.',
    })
