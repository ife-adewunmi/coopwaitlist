import type { Question } from '@/components/questionnaire/question-item'

interface EnhancedQuestion extends Question {
  options?: Array<{
    id: string
    label: string
    value: string
    icon?: string
    description?: string
  }>
}

interface QuestionnaireContent {
  title: string
  description: string
  questions: EnhancedQuestion[]
  successTitle: string
  successMessage: string
  bonusTitle?: string
  bonusDescription?: string
  bonusButtonText?: string
}

export const questionnaireContent: QuestionnaireContent = {
  title: 'Help Us Understand Your Goals',
  description: 'Answer a few quick questions so we can tailor our offerings to your needs.',
  questions: [
    {
      id: 'financialGoal',
      type: 'single-choice',
      title: 'What is your primary financial goal?',
      required: true,
      options: [
        {
          id: 'financialGoal-1',
          value: 'business',
          label: 'Starting or Scaling a Business',
          icon: 'building',
          description: 'Access capital and mentorship for your venture',
        },
        {
          id: 'financialGoal-2',
          value: 'savings',
          label: 'Building Long-term Wealth',
          icon: 'coins',
          description: 'Create sustainable financial security',
        },
        {
          id: 'financialGoal-3',
          value: 'education',
          label: 'Financial Education & Skills',
          icon: 'book-open',
          description: 'Learn investment strategies and financial literacy',
        },
      ],
    },
    {
      id: 'currentFocus',
      type: 'single-choice',
      title: 'Which best describes your current focus?',
      required: true,
      options: [
        {
          id: 'currentFocus-1',
          value: 'savings',
          label: 'Growing Investments',
          icon: 'trending-up',
          description: 'Focused on savings, investments, and financial growth',
        },
        {
          id: 'currentFocus-2',
          value: 'support',
          label: 'Seeking Guidance',
          icon: 'users',
          description: 'Looking for support, mentorship, and resources',
        },
        {
          id: 'currentFocus-3',
          value: 'opportunities',
          label: 'Finding Opportunities',
          icon: 'target',
          description: 'Searching for strategic opportunities to grow wealth',
        },
      ],
    },
    {
      id: 'decisionValue',
      type: 'single-choice',
      title: 'What do you value most when making financial decisions?',
      required: true,
      options: [
        {
          id: 'decisionValue-1',
          value: 'speed',
          label: 'Speed & Efficiency',
          icon: 'zap',
          description: 'Quick implementation and results',
        },
        {
          id: 'decisionValue-2',
          value: 'quality',
          label: 'Quality & Reliability',
          icon: 'award',
          description: 'Trustworthy, high-quality outcomes',
        },
        {
          id: 'decisionValue-3',
          value: 'cost',
          label: 'Value & Affordability',
          icon: 'dollar-sign',
          description: 'Cost-effective solutions',
        },
      ],
    },
  ],
  successTitle: "You're All Set!",
  successMessage:
    "Thank you for joining our waitlist. We'll be in touch soon with exclusive updates and opportunities.",
  bonusTitle: 'Your Free Financial Guide',
  bonusDescription:
    'Download our Wealth Building Starter Guide to begin your journey toward financial freedom.',
  bonusButtonText: 'Download Guide',
}
