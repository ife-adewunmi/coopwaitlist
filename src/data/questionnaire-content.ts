import { QuestionnaireContent } from '@/lib/types/questionnaire'

export const questionnaireContent: QuestionnaireContent = {
  title: 'Help Us Understand Your Goals',
  description: 'Answer a few quick questions so we can tailor our offerings to your needs.',
  questions: [
    {
      id: 'financialGoal',
      title: 'What is your primary financial goal?',
      options: [
        {
          value: 'business',
          label: 'Starting or Scaling a Business',
          icon: 'building',
          description: 'Access capital and mentorship for your venture',
        },
        {
          value: 'savings',
          label: 'Building Long-term Wealth',
          icon: 'coins',
          description: 'Create sustainable financial security',
        },
        {
          value: 'education',
          label: 'Financial Education & Skills',
          icon: 'book-open',
          description: 'Learn investment strategies and financial literacy',
        },
      ],
    },
    {
      id: 'currentFocus',
      title: 'Which best describes your current focus?',
      options: [
        {
          value: 'savings',
          label: 'Growing Investments',
          icon: 'trending-up',
          description: 'Focused on savings, investments, and financial growth',
        },
        {
          value: 'support',
          label: 'Seeking Guidance',
          icon: 'users',
          description: 'Looking for support, mentorship, and resources',
        },
        {
          value: 'opportunities',
          label: 'Finding Opportunities',
          icon: 'target',
          description: 'Searching for strategic opportunities to grow wealth',
        },
      ],
    },
    {
      id: 'decisionValue',
      title: 'What do you value most when making financial decisions?',
      options: [
        {
          value: 'speed',
          label: 'Speed & Efficiency',
          icon: 'zap',
          description: 'Quick implementation and results',
        },
        {
          value: 'quality',
          label: 'Quality & Reliability',
          icon: 'award',
          description: 'Trustworthy, high-quality outcomes',
        },
        {
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
