import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {
  Registration,
  RegistrationBase,
  RegistrationQuestions,
} from '@/lib/types/registration'
import { showModal, ModalType } from '@/states/slices/modal/modalSlice'
import { getCsrfToken, getRegistrationId } from '@/lib/utils'
import { validateQuestionnaireAnswers } from '@/lib/validators/waitlist/form-validators'
import { WAITLIST_STORAGE_KEY, WaitlistState } from './waitlistState'
import { isServer } from '@/src/lib/is-server'

// Helper function to load saved progress from localStorage
const loadSavedProgress = (): Partial<WaitlistState> => {
  if (typeof window === 'undefined') return {}

  const result: Partial<WaitlistState> = {}

  try {
    const savedProgress = localStorage.getItem(WAITLIST_STORAGE_KEY)
    if (savedProgress) {
      const parsedData = JSON.parse(savedProgress)
      // Restore all relevant state from localStorage
      result.form = parsedData.form || {}
      result.step = parsedData.step
      result.answers = parsedData.answers
      result.formCompleted = parsedData.formCompleted || false
    }
  } catch (e) {
    console.error('Error loading saved waitlist progress:', e)
  }
  return result
}

const initialState: WaitlistState = {
  form: {
    id: getRegistrationId(),
    name: '',
    email: '',
    whatsapp: '',
    gender: undefined,
    ageBracket: undefined,
    state: '',
    city: '',
    occupation: '',
  },
  formCompleted: false,
  step: 1,
  totalSteps: 3,
  isComplete: false,
  answers: {},
  progress: 0,
  isSubmitting: false,
  submissionError: null,
  isRegistered: false,
  ...loadSavedProgress(), // Load any saved state
}

// Combined thunk that submits the entire registration with questionnaire answers
export const submitCompleteRegistration = createAsyncThunk(
  'waitlist/submitCompleteRegistration',
  async (_, { getState, dispatch }) => {
    try {
      const state = getState() as { waitlist: WaitlistState }
      const { form, answers } = state.waitlist

      // Validate questionnaire answers
      if (Object.keys(answers).length > 0) {
        validateQuestionnaireAnswers(
          answers as Record<string, string | string[]>,
          Object.keys(answers),
        )
      }

      // Combine form data with questionnaire answers
      const completeRegistration = {
        ...form,
        ...answers,
      }

      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken(),
        },
        body: JSON.stringify(completeRegistration),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration failed')
      }

      const registration = await response.json()
      // dispatch(showModal({ type: ModalType.REGISTRATION_SUCCESS }))

      // Clear local storage after successful submission
      if (!isServer) {
        localStorage.removeItem(WAITLIST_STORAGE_KEY)
      }

      return registration
    } catch (error) {
      throw error
    }
  },
)

const waitlistSlice = createSlice({
  name: 'waitlist',
  initialState,
  reducers: {
    // Update form fields
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof WaitlistState['form']; value: any }>,
    ) => {
      const { field, value } = action.payload
      state.form = {
        ...state.form,
        [field]: value,
      }
      saveWaitlistProgress(state)
    },

    // Complete the form section
    completeForm: (state) => {
      state.formCompleted = true
      saveWaitlistProgress(state)
    },

    // Questionnaire navigation
    setStep: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= state.totalSteps) {
        state.step = action.payload
        saveWaitlistProgress(state)
      }
    },
    nextStep: (state) => {
      if (state.step < state.totalSteps) {
        state.step += 1
        saveWaitlistProgress(state)
      }
    },
    prevStep: (state) => {
      if (state.step > 1) {
        state.step -= 1
        saveWaitlistProgress(state)
      }
    },

    // Questionnaire answers
    updateAnswer: (
      state,
      action: PayloadAction<{ questionId: string; value: string | string[] }>,
    ) => {
      const { questionId, value } = action.payload
      state.answers = {
        ...state.answers,
        [questionId]: value,
      }
      // Update progress percentage
      const answeredQuestions = Object.keys(state.answers).length
      // Assume questionnaire has the same number of questions as total steps
      state.progress = Math.max(
        0,
        Math.min(100, Math.round((answeredQuestions / state.totalSteps) * 100)),
      )
      saveWaitlistProgress(state)
    },

    // Questionnaire completion
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload
      saveWaitlistProgress(state)
    },

    // Reset questionnaire
    resetQuestionnaire: (state) => {
      state.step = 1
      state.answers = {}
      state.isComplete = false
      state.progress = 0
      saveWaitlistProgress(state)
    },

    // Reset everything
    resetWaitlistState: () => {
      if (!isServer) {
        localStorage.removeItem(WAITLIST_STORAGE_KEY)
      }
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCompleteRegistration.pending, (state) => {
        state.isSubmitting = true
        state.submissionError = null
      })
      .addCase(submitCompleteRegistration.fulfilled, (state, action) => {
        state.isSubmitting = false
        state.isRegistered = true
        // Update with any returned data from the server
        if (action.payload.id) {
          state.form.id = action.payload.id
        }
      })
      .addCase(submitCompleteRegistration.rejected, (state, action) => {
        state.isSubmitting = false
        state.submissionError = action.error.message || 'Registration failed'
      })
  },
})

// Helper function to save the entire waitlist state to localStorage
function saveWaitlistProgress(state: WaitlistState) {
  if (!isServer) {
    localStorage.setItem(
      WAITLIST_STORAGE_KEY,
      JSON.stringify({
        form: state.form,
        step: state.step,
        answers: state.answers,
        formCompleted: state.formCompleted,
      }),
    )
  }
}

export const {
  updateFormField,
  completeForm,
  setStep,
  nextStep,
  prevStep,
  updateAnswer,
  setComplete,
  resetQuestionnaire,
  resetWaitlistState,
} = waitlistSlice.actions

export const waitlistReducer = waitlistSlice.reducer
