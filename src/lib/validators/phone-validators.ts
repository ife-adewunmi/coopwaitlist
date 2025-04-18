/**
 * Validates a Nigerian phone number
 *
 * Valid formats:
 * - Starting with +234 followed by 10 digits (e.g., +2347012345678)
 * - Starting with 234 followed by 10 digits (e.g., 2347012345678)
 * - Starting with 0 followed by 10 digits (e.g., 07012345678)
 *
 * Nigerian network codes include:
 * - MTN: 703, 706, 803, 806, 810, 813, 814, 816, 903, 906, etc.
 * - Airtel: 701, 708, 802, 808, 812, 902, etc.
 * - Glo: 705, 805, 807, 811, 815, 905, etc.
 * - 9mobile: 809, 817, 818, 909, etc.
 */
export function isValidNigerianPhoneNumber(phone: string): boolean {
  // Remove any whitespace, dashes, or parentheses
  const cleanedPhone = phone.replace(/\s|-|\(|\)/g, '');

  // Check if it's a valid Nigerian number format
  const nigerianPhoneRegex = /^(?:\+?234|0)[7-9][0-1][0-9]{8}$/;

  return nigerianPhoneRegex.test(cleanedPhone);
}
