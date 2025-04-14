"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { QuestionnaireProvider, useQuestionnaire } from "./questionnaire-context"
import { FinancialGoalQuestion } from "./financial-goal-question"
import { CurrentFocusQuestion } from "./current-focus-question"
import { DecisionValueQuestion } from "./decision-value-question"
import { SuccessScreen } from "./success-screen"
import { questionnaireContent } from "@/data/questionnaire-content"

interface QuestionnaireProps {
  onComplete: (answers: any) => void
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  return (
    <QuestionnaireProvider>
      <QuestionnaireContent onComplete={onComplete} />
    </QuestionnaireProvider>
  )
}

function QuestionnaireContent({ onComplete }: QuestionnaireProps) {
  const { step, totalSteps, answers, nextStep, prevStep, isComplete, setIsComplete } = useQuestionnaire()

  const handleComplete = () => {
    setIsComplete(true)
    onComplete(answers)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardContent className="p-6">
          {isComplete ? (
            <SuccessScreen />
          ) : (
            <>
              <div className="text-center mb-8">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-primary mb-4"
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
              <div className="min-h-[300px]">
                {step === 1 && <FinancialGoalQuestion />}
                {step === 2 && <CurrentFocusQuestion />}
                {step === 3 && <DecisionValueQuestion />}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} disabled={step === 1} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button onClick={nextStep} className="flex items-center gap-2">
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="flex items-center gap-2 bg-primary hover:bg-primary-700">
                    Complete
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
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
