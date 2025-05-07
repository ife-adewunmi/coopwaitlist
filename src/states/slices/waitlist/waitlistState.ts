import { RegistrationQuestions } from '@/lib/types/registration'

export const WAITLIST_STORAGE_KEY = 'waitlist-data'

export interface WaitlistState {
  // Form state
  form: WaitlistFormState
  formCompleted: boolean

  // Questionnaire state
  step: number
  totalSteps: number
  isComplete: boolean
  answers: RegistrationQuestions
  progress: number

  // Submission state
  isSubmitting: boolean
  submissionError: string | null
  isRegistered: boolean
}

// Form state interface
export interface WaitlistFormState {
  id: string
  name: string
  email: string
  whatsapp: string
  gender: 'male' | 'female' | undefined
  ageBracket: '18-24' | '25-34' | '35-44' | '45-54' | '55+' | undefined
  state: string
  city: string
  occupation: string
}
