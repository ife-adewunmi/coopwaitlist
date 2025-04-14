'use client'

import type React from 'react'

import { motion } from 'framer-motion'
import { useQuestionnaire } from './questionnaire-context'
import { TrendingUp, Users, Target } from 'lucide-react'
import { questionnaireContent } from '@/data/questionnaire-content'

export function CurrentFocusQuestion() {
  const { answers, setAnswers } = useQuestionnaire()
  const question = questionnaireContent.questions[1]

  const iconMap: Record<string, React.ReactNode> = {
    'trending-up': <TrendingUp className="mb-2 h-6 w-6" />,
    users: <Users className="mb-2 h-6 w-6" />,
    target: <Target className="mb-2 h-6 w-6" />,
  }

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, currentFocus: value })
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
        {question.options.map((option: any, index: number) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-6 transition-all ${
              answers.currentFocus === option.value
                ? 'scale-105 transform bg-primary text-white shadow-lg'
                : 'bg-muted hover:bg-muted/80'
            } `}
            onClick={() => handleSelect(option.value)}
          >
            {iconMap[option.icon]}
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
