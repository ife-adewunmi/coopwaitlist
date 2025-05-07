'use client'

import type React from 'react'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Building, Coins, BookOpen } from 'lucide-react'
import { questionnaireContent } from '@/data/questionnaire-content'
import { updateAnswer } from '@/states/slices/waitlist/waitlistSlice'
import type { RootState } from '@/states/store'

export function FinancialGoalQuestion() {
  const dispatch = useDispatch()
  const answers = useSelector((state: RootState) => state.waitlist.answers)
  const question = questionnaireContent.questions[0]

  const iconMap: Record<string, React.ReactNode> = {
    building: <Building className="mb-2 h-6 w-6" />,
    coins: <Coins className="mb-2 h-6 w-6" />,
    'book-open': <BookOpen className="mb-2 h-6 w-6" />,
  }

  const handleSelect = (value: string) => {
    dispatch(updateAnswer({ questionId: 'financialGoal', value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 text-center">
        <motion.h3
          className="mb-4 text-xl font-bold text-primary md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {question.title}
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {question.options?.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-6 transition-all ${
              answers.financialGoal === option.value
                ? 'scale-105 transform bg-primary text-white shadow-lg'
                : 'bg-muted hover:bg-muted/80'
            } `}
            onClick={() => handleSelect(option.value)}
          >
            {iconMap[option.icon as keyof typeof iconMap]}
            <h4 className="text-center font-medium">{option.label}</h4>
            {option.description && (
              <p className="mt-2 text-center text-xs opacity-80">{option.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
