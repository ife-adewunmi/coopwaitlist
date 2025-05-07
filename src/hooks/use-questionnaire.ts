// src/hooks/use-questionnaire.ts
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/states/store'
import {
  nextStep,
  prevStep,
  updateAnswer,
  setComplete,
  resetQuestionnaire,
} from '@/states/slices/waitlist/waitlistSlice'

export function useQuestionnaire() {
  const dispatch = useDispatch<AppDispatch>()
  const { step, totalSteps, answers, isComplete } = useSelector(
    (state: RootState) => state.waitlist,
  )

  const goToNextStep = () => {
    dispatch(nextStep())
  }

  const goToPrevStep = () => {
    dispatch(prevStep())
  }

  const updateQuestionAnswer = (questionId: string, value: string | string[]) => {
    dispatch(updateAnswer({ questionId, value }))
  }

  const completeQuestionnaire = () => {
    dispatch(setComplete(true))
  }

  const reset = () => {
    dispatch(resetQuestionnaire())
  }

  return {
    step,
    totalSteps,
    answers,
    isComplete,
    goToNextStep,
    goToPrevStep,
    updateQuestionAnswer,
    completeQuestionnaire,
    reset,
  }
}
