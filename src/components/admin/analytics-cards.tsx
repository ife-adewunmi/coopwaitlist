'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, MapPin, User, Calendar, TrendingUp, Target } from 'lucide-react'
import { motion } from 'framer-motion'

interface Registration {
  name: string
  email: string
  whatsapp: string
  gender: string
  ageBracket: string
  state: string
  city: string
  occupation: string
  registrationDate: string
  financialGoal?: string
  currentFocus?: string
  decisionValue?: string
}

interface AnalyticsCardsProps {
  registrations: Registration[]
}

export function AnalyticsCards({ registrations }: AnalyticsCardsProps) {
  // Prepare data for age distribution
  const ageDistribution = [
    { name: '18-24', count: 0 },
    { name: '25-34', count: 0 },
    { name: '35-44', count: 0 },
    { name: '45-54', count: 0 },
    { name: '55+', count: 0 },
  ]

  // Gender distribution
  const genderCounts = {
    male: 0,
    female: 0,
    other: 0,
  }

  // State distribution
  const stateCounts: Record<string, number> = {}

  // Financial goals
  const financialGoalCounts = {
    business: 0,
    savings: 0,
    education: 0,
  }

  // Current focus
  const currentFocusCounts = {
    savings: 0,
    support: 0,
    opportunities: 0,
  }

  // Decision values
  const decisionValueCounts = {
    speed: 0,
    quality: 0,
    cost: 0,
  }

  registrations.forEach((reg) => {
    // Count age brackets
    const ageGroup = ageDistribution.find((group) => group.name === reg.ageBracket)
    if (ageGroup) {
      ageGroup.count += 1
    }

    // Count genders
    if (reg.gender) {
      genderCounts[reg.gender as keyof typeof genderCounts] += 1
    }

    // Count states
    if (reg.state) {
      stateCounts[reg.state] = (stateCounts[reg.state] || 0) + 1
    }

    // Count financial goals
    if (reg.financialGoal) {
      financialGoalCounts[reg.financialGoal as keyof typeof financialGoalCounts] += 1
    }

    // Count current focus
    if (reg.currentFocus) {
      currentFocusCounts[reg.currentFocus as keyof typeof currentFocusCounts] += 1
    }

    // Count decision values
    if (reg.decisionValue) {
      decisionValueCounts[reg.decisionValue as keyof typeof decisionValueCounts] += 1
    }
  })

  // Find most common age group
  const mostCommonAgeGroup = ageDistribution.reduce(
    (prev, current) => (prev.count > current.count ? prev : current),
    {
      name: 'None',
      count: 0,
    },
  )

  // Calculate percentage
  const agePercentage = Math.round((mostCommonAgeGroup.count / (registrations.length || 1)) * 100)

  // Find most common state
  const mostCommonState = Object.entries(stateCounts).reduce(
    (prev, [state, count]) => (count > prev.count ? { state, count } : prev),
    { state: 'None', count: 0 },
  )

  // Calculate gender percentages
  const totalGenderCount = genderCounts.male + genderCounts.female + genderCounts.other
  const malePercentage = Math.round((genderCounts.male / (totalGenderCount || 1)) * 100)
  const femalePercentage = Math.round((genderCounts.female / (totalGenderCount || 1)) * 100)

  // Find most common financial goal
  const mostCommonGoal = Object.entries(financialGoalCounts).reduce(
    (prev, [goal, count]) => (count > prev.count ? { goal, count } : prev),
    { goal: 'None', count: 0 },
  )

  // Find most common current focus
  const mostCommonFocus = Object.entries(currentFocusCounts).reduce(
    (prev, [focus, count]) => (count > prev.count ? { focus, count } : prev),
    { focus: 'None', count: 0 },
  )

  // Get latest registration
  const latestRegistration =
    registrations.length > 0
      ? registrations.sort(
          (a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime(),
        )[0]
      : null

  const cards = [
    {
      title: 'Total Registrations',
      value: registrations.length.toString(),
      icon: <Users className="h-5 w-5 text-primary" />,
      description: 'People on waitlist',
    },
    {
      title: 'Gender Distribution',
      value: `${malePercentage}% / ${femalePercentage}%`,
      icon: <User className="h-5 w-5 text-secondary" />,
      description: 'Male / Female',
    },
    {
      title: 'Most Common Age',
      value: mostCommonAgeGroup.name,
      icon: <Users className="h-5 w-5 text-accent" />,
      description: `${agePercentage}% of registrations`,
    },
    {
      title: 'Top Location',
      value:
        mostCommonState.state !== 'None'
          ? mostCommonState.state.charAt(0).toUpperCase() + mostCommonState.state.slice(1)
          : 'None',
      icon: <MapPin className="h-5 w-5 text-primary" />,
      description: `${mostCommonState.count} registrations`,
    },
    {
      title: 'Latest Registration',
      value: latestRegistration
        ? new Date(latestRegistration.registrationDate).toLocaleDateString()
        : 'No data',
      icon: <Calendar className="h-5 w-5 text-secondary" />,
      description: latestRegistration
        ? new Date(latestRegistration.registrationDate).toLocaleTimeString()
        : '',
    },
    {
      title: 'Top Financial Goal',
      value:
        mostCommonGoal.goal !== 'None'
          ? mostCommonGoal.goal.charAt(0).toUpperCase() + mostCommonGoal.goal.slice(1)
          : 'None',
      icon: <TrendingUp className="h-5 w-5 text-accent" />,
      description: `${mostCommonGoal.count} registrations`,
    },
    {
      title: 'Primary Focus',
      value:
        mostCommonFocus.focus !== 'None'
          ? mostCommonFocus.focus.charAt(0).toUpperCase() + mostCommonFocus.focus.slice(1)
          : 'None',
      icon: <Target className="h-5 w-5 text-primary" />,
      description: `${mostCommonFocus.count} registrations`,
    },
  ]

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
