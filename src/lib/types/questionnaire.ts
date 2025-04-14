export interface QuestionOption {
  value: string
  label: string
  icon: string
  description?: string
}

export interface Question {
  id: string
  title: string
  options: QuestionOption[]
}

export interface QuestionnaireContent {
  title: string
  description: string
  questions: Question[]
  successTitle: string
  successMessage: string
  bonusTitle: string
  bonusDescription: string
  bonusButtonText: string
}

