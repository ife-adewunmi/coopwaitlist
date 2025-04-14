"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useQuestionnaire } from "./questionnaire-context"
import { TrendingUp, Users, Target } from "lucide-react"
import { questionnaireContent } from "@/data/questionnaire-content"

export function CurrentFocusQuestion() {
  const { answers, setAnswers } = useQuestionnaire()
  const question = questionnaireContent.questions[1]

  const iconMap: Record<string, React.ReactNode> = {
    "trending-up": <TrendingUp className="h-6 w-6 mb-2" />,
    users: <Users className="h-6 w-6 mb-2" />,
    target: <Target className="h-6 w-6 mb-2" />,
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
      <div className="text-center mb-8">
        <motion.h3
          className="text-xl md:text-2xl font-bold text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {question.title}
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {question.options.map((option: any, index: number) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className={`
              flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-all
              ${
                answers.currentFocus === option.value
                  ? "bg-primary text-white shadow-lg transform scale-105"
                  : "bg-muted hover:bg-muted/80"
              }
            `}
            onClick={() => handleSelect(option.value)}
          >
            {iconMap[option.icon]}
            <h4 className="font-medium text-center">{option.label}</h4>
            {option.description && <p className="text-xs mt-2 text-center opacity-80">{option.description}</p>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
