'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { questionnaireContent } from '@/data/questionnaire-content'

import { closeModal } from '@/states/slices/modal/modalSlice'
import {
  resetWaitlistState,
  submitCompleteRegistration,
} from '@/states/slices/waitlist/waitlistSlice'
import type { RegistrationQuestions } from '@/lib/types/registration'
import type { AppDispatch, RootState } from '@/states/store'
import { QuestionItem } from './question-item'
import { closeModalWithDelay, updateModalState } from '@/states/slices/modal/modalUtils'
import { useQuestionnaire } from '@/src/hooks/use-questionnaire'

interface QuestionnaireProps {
  onComplete?: (answers: RegistrationQuestions) => void
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const dispatch = useDispatch<AppDispatch>()
  const {
    step,
    totalSteps,
    answers,
    isComplete,
    goToNextStep,
    goToPrevStep,
    updateQuestionAnswer,
    completeQuestionnaire,
  } = useQuestionnaire()

  // const { step, totalSteps, answers, isComplete } = useSelector((state: RootState) => state.waitlist)

  // Update modal data when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      updateModalState(dispatch, { answers })
    }
  }, [answers, dispatch])

  const handleComplete = async () => {
    completeQuestionnaire()
    try {
      await dispatch(submitCompleteRegistration()).unwrap()
      updateModalState(dispatch, { completed: true, answers })
      if (onComplete) {
        onComplete(answers)
      } else {
        dispatch(resetWaitlistState())
        closeModalWithDelay(dispatch, 2000)
      }
    } catch (error) {
      console.error('Error updating registration:', error)
    }
  }

  // Render success screen when questionnaire is complete
  const SuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="mb-6 rounded-full bg-green-100 p-3 dark:bg-green-900">
        <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
      </div>
      <h3 className="mb-2 text-2xl font-bold">Thank You!</h3>
      <p className="mb-6 text-muted-foreground">Your responses have been successfully submitted.</p>
      <Button
        onClick={() => {
          dispatch(resetWaitlistState())
          dispatch(closeModal())
        }}
      >
        Close
      </Button>
    </motion.div>
  )

  // Render questions based on current step
  const renderQuestion = () => {
    const currentQuestion = questionnaireContent.questions[step - 1]
    if (!currentQuestion) return null

    return (
      <QuestionItem
        key={currentQuestion.id}
        question={currentQuestion}
        value={answers[currentQuestion.id as keyof RegistrationQuestions]}
        onChange={(value) => updateQuestionAnswer(currentQuestion.id, value)}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto w-full max-w-3xl"
    >
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardContent className="p-6">
          {isComplete ? (
            <SuccessScreen />
          ) : (
            <>
              <div className="mb-8 text-center">
                <motion.h2
                  className="mb-4 text-2xl font-bold text-primary md:text-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {questionnaireContent.title}
                </motion.h2>
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {questionnaireContent.description}
                </motion.p>
              </div>

              {/* Question Content */}
              <div className="min-h-[300px]">{renderQuestion()}</div>

              {/* Navigation */}
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPrevStep}
                  disabled={step === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={goToNextStep}
                    className="flex items-center gap-2"
                    disabled={
                      !answers[
                        questionnaireContent.questions[step - 1]?.id as keyof RegistrationQuestions
                      ]
                    }
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-700"
                  >
                    Complete
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Step {step} of {totalSteps}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
