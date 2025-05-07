import { WaitlistFormState } from '@/states/slices/waitlist/waitlistState'

// Validation helpers
export const isNonEmptyString = (value: unknown): boolean =>
  typeof value === 'string' && value.trim().length > 0

/**
 * Validates the waitlist registration form data
 * @param form The form data to validate
 * @returns An object containing validation errors (if any)
 */
export const validateWaitlistForm = (form: WaitlistFormState): Record<string, string> => {
  const errors: Record<string, string> = {}

  // Name validation
  if (!isNonEmptyString(form.name) || form.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!isNonEmptyString(form.email) || !emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Phone validation (for Nigerian numbers)
  const phoneRegex = /^(0|\+?234)[789][01]\d{8}$/
  if (!isNonEmptyString(form.whatsapp) || !phoneRegex.test(form.whatsapp)) {
    errors.whatsapp = 'Please enter a valid Nigerian phone number'
  }

  // Gender validation
  if (!form.gender) {
    errors.gender = 'Please select your gender'
  }

  // Age bracket validation
  if (!form.ageBracket) {
    errors.ageBracket = 'Please select your age bracket'
  }

  // State validation
  if (!isNonEmptyString(form.state)) {
    errors.state = 'Please select your state'
  }

  // City validation
  if (!isNonEmptyString(form.city) || form.city.length < 2) {
    errors.city = 'City name must be at least 2 characters'
  }

  // Occupation validation
  if (!isNonEmptyString(form.occupation) || form.occupation.length < 2) {
    errors.occupation = 'Occupation must be at least 2 characters'
  }

  return errors
}

export const validateQuestionnaireAnswers = (
  answers: Record<string, string | string[]>,
  validKeys: string[],
) => {
  if (Object.keys(answers).length === 0) {
    throw new Error('No answers provided')
  }

  const checkKeys = ['financialGoal', 'currentFocus', 'decisionValue']
  const invalidKeys = Object.keys(answers).filter((key) => !checkKeys.includes(key))
  if (invalidKeys.length > 0) {
    throw new Error(`Invalid answer keys: ${invalidKeys.join(', ')}`)
  }

  const invalidValues = Object.entries(answers).filter(([_, value]) => {
    return (
      typeof value !== 'string' &&
      (!Array.isArray(value) || value.some((v) => typeof v !== 'string'))
    )
  })
  if (invalidValues.length > 0) {
    throw new Error(`Invalid answer values: ${invalidValues.map(([key]) => key).join(', ')}`)
  }
}
