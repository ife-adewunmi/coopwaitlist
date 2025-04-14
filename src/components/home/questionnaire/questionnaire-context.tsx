"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import { RegistrationQuestions } from "@/lib/types/registration"
import { questionnaireContent } from "@/data/questionnaire-content"

interface QuestionnaireContextType {
  step: number
  totalSteps: number
  answers: RegistrationQuestions
  setAnswers: React.Dispatch<React.SetStateAction<RegistrationQuestions>>
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
  progress: number
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined)

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [answers, setAnswers] = useState<RegistrationQuestions>({})

  const totalSteps = questionnaireContent.questions.length

  // Calculate progress based on how many questions have been answered
  const answeredQuestions = Object.keys(answers).length
  const progress = Math.max(0, Math.min(100, Math.round((answeredQuestions / totalSteps) * 100)))

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const goToStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep)
    }
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        step,
        totalSteps,
        answers,
        setAnswers,
        nextStep,
        prevStep,
        goToStep,
        isComplete,
        setIsComplete,
        progress,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  )
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext)
  if (context === undefined) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider")
  }
  return context
}
