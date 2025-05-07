import { RootState } from '@/states/store'

// State selectors
export const selectWaitlist = (state: RootState) => state.waitlist
export const selectWaitlistForm = (state: RootState) => state.waitlist.form

// Submission state selectors
export const selectIsSubmitting = (state: RootState) => state.waitlist.isSubmitting
export const selectSubmissionError = (state: RootState) => state.waitlist.submissionError
export const selectIsRegistered = (state: RootState) => state.waitlist.isRegistered

// Questionnaire selectors
export const selectCurrentStep = (state: RootState) => state.waitlist.step
export const selectTotalSteps = (state: RootState) => state.waitlist.totalSteps
export const selectQuestionnaireProgress = (state: RootState) => state.waitlist.progress
export const selectQuestionnaireAnswers = (state: RootState) => state.waitlist.answers
export const selectQuestionnaireAnswer = (
  state: RootState,
  questionId: keyof typeof state.waitlist.answers,
) => state.waitlist.answers[questionId]
export const selectIsQuestionnaireComplete = (state: RootState) => state.waitlist.isComplete
