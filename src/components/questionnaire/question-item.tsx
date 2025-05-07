'use client'

import { motion } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Award,
  BookOpen,
  Building,
  Coins,
  DollarSign,
  Layers,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// Define possible question types
type QuestionType = 'single-choice' | 'multiple-choice' | 'text' | 'textarea'

// Question option interface
interface QuestionOption {
  id: string
  label: string
  value: string
  icon?: string
  description?: string
}

// Question interface
export interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  options?: QuestionOption[]
  required?: boolean
}

interface QuestionItemProps {
  question: Question
  value: string | string[] | undefined
  onChange: (value: string | string[]) => void
}

export function QuestionItem({ question, value, onChange }: QuestionItemProps) {
  // Render appropriate icon based on icon name
  const renderIcon = (iconName: string) => {
    const iconProps = { className: 'h-5 w-5 text-primary' }

    switch (iconName) {
      case 'building':
        return <Building {...iconProps} />
      case 'coins':
        return <Coins {...iconProps} />
      case 'book-open':
        return <BookOpen {...iconProps} />
      case 'trending-up':
        return <TrendingUp {...iconProps} />
      case 'users':
        return <Users {...iconProps} />
      case 'target':
        return <Target {...iconProps} />
      case 'zap':
        return <Zap {...iconProps} />
      case 'award':
        return <Award {...iconProps} />
      case 'dollar-sign':
        return <DollarSign {...iconProps} />
      default:
        return <Layers {...iconProps} />
    }
  }

  // Handle single choice selection
  const handleSingleChoiceChange = (value: string) => {
    onChange(value)
  }

  // Handle multiple choice selection
  const handleMultipleChoiceChange = (optionValue: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : []

    if (checked) {
      // Add the value if it's checked and not already in the array
      onChange([...currentValues, optionValue])
    } else {
      // Remove the value if it's unchecked
      onChange(currentValues.filter((v) => v !== optionValue))
    }
  }

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Render different input types based on question type
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'single-choice':
        return (
          <RadioGroup
            value={value as string}
            onValueChange={handleSingleChoiceChange}
            className="space-y-4"
          >
            {question.options?.map((option) => (
              <motion.div
                key={option.id}
                variants={itemVariants}
                className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent/10"
              >
                <div className="flex h-6 items-center">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.id}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {option.icon && renderIcon(option.icon)}
                    <Label
                      htmlFor={`${question.id}-${option.id}`}
                      className="cursor-pointer font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                  {option.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        )

      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {question.options?.map((option) => {
              const isChecked = Array.isArray(value) && value.includes(option.value)

              return (
                <motion.div
                  key={option.id}
                  variants={itemVariants}
                  className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/10"
                >
                  <Checkbox
                    id={`${question.id}-${option.id}`}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleMultipleChoiceChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`${question.id}-${option.id}`}
                    className="w-full cursor-pointer font-medium"
                  >
                    {option.label}
                  </Label>
                </motion.div>
              )
            })}
          </div>
        )

      case 'text':
        return (
          <motion.div variants={itemVariants}>
            <Input
              id={question.id}
              value={(value as string) || ''}
              onChange={handleTextChange}
              placeholder="Type your answer here..."
              className="mt-2"
            />
          </motion.div>
        )

      case 'textarea':
        return (
          <motion.div variants={itemVariants}>
            <Textarea
              id={question.id}
              value={(value as string) || ''}
              onChange={handleTextChange}
              placeholder="Type your answer here..."
              className="mt-2 min-h-[150px]"
            />
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="text-xl font-medium">{question.title}</h3>
        {question.description && <p className="text-muted-foreground">{question.description}</p>}
      </motion.div>

      <motion.div variants={containerVariants} className="mt-6">
        {renderQuestionInput()}
      </motion.div>
    </motion.div>
  )
}
