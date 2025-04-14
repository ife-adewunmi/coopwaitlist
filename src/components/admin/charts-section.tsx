'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import { motion } from 'framer-motion'
import { Registration } from '@/lib/types/registration'

interface ChartsSectionProps {
  registrations: Registration[]
}

export function ChartsSection({ registrations }: ChartsSectionProps) {
  // Prepare data for age distribution chart
  const ageDistribution = [
    { name: '18-24', count: 0 },
    { name: '25-34', count: 0 },
    { name: '35-44', count: 0 },
    { name: '45-54', count: 0 },
    { name: '55+', count: 0 },
  ]

  // Prepare data for gender distribution
  const genderDistribution = [
    { name: 'Male', count: 0 },
    { name: 'Female', count: 0 },
    { name: 'Other', count: 0 },
  ]

  // Prepare data for state distribution
  const stateDistribution: Record<string, number> = {}

  // Prepare data for financial goals
  const financialGoalDistribution = [
    { name: 'Business', value: 0 },
    { name: 'Savings', value: 0 },
    { name: 'Education', value: 0 },
  ]

  // Prepare data for current focus
  const currentFocusDistribution = [
    { name: 'Savings & Investments', value: 0 },
    { name: 'Mentorship & Support', value: 0 },
    { name: 'Strategic Opportunities', value: 0 },
  ]

  // Prepare data for decision values
  const decisionValueDistribution = [
    { name: 'Speed', value: 0 },
    { name: 'Quality', value: 0 },
    { name: 'Cost', value: 0 },
  ]

  registrations.forEach((reg) => {
    // Count age brackets
    const ageGroup = ageDistribution.find((group) => group.name === reg.ageBracket)
    if (ageGroup) {
      ageGroup.count += 1
    }

    // Count genders
    if (reg.gender === 'male') {
      genderDistribution[0].count += 1
    } else if (reg.gender === 'female') {
      genderDistribution[1].count += 1
    } else if (reg.gender === 'other') {
      genderDistribution[2].count += 1
    }

    // Count states
    if (reg.state) {
      stateDistribution[reg.state] = (stateDistribution[reg.state] || 0) + 1
    }

    // Count financial goals
    if (reg.financialGoal === 'business') {
      financialGoalDistribution[0].value += 1
    } else if (reg.financialGoal === 'savings') {
      financialGoalDistribution[1].value += 1
    } else if (reg.financialGoal === 'education') {
      financialGoalDistribution[2].value += 1
    }

    // Count current focus
    if (reg.currentFocus === 'savings') {
      currentFocusDistribution[0].value += 1
    } else if (reg.currentFocus === 'support') {
      currentFocusDistribution[1].value += 1
    } else if (reg.currentFocus === 'opportunities') {
      currentFocusDistribution[2].value += 1
    }

    // Count decision values
    if (reg.decisionValue === 'speed') {
      decisionValueDistribution[0].value += 1
    } else if (reg.decisionValue === 'quality') {
      decisionValueDistribution[1].value += 1
    } else if (reg.decisionValue === 'cost') {
      decisionValueDistribution[2].value += 1
    }
  })

  // Convert state distribution to array and sort by count
  const stateData = Object.entries(stateDistribution)
    .map(([name, count]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 states

  // Prepare data for registration timeline
  const registrationsByDate: Record<string, number> = {}
  registrations.forEach((reg) => {
    const date = new Date(reg.registrationDate).toLocaleDateString()
    registrationsByDate[date] = (registrationsByDate[date] || 0) + 1
  })

  const timelineData = Object.keys(registrationsByDate)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date) => ({
      date,
      count: registrationsByDate[date],
    }))

  // Colors for charts
  const COLORS = [
    '#00875A',
    '#0A6EBD',
    '#F59E0B',
    '#EF4444',
    '#8884D8',
    '#10B981',
    '#3B82F6',
    '#B45309',
  ]

  // Format the pie chart data for better display
  const formattedAgeData = ageDistribution.filter((item) => item.count > 0)
  const formattedGenderData = genderDistribution.filter((item) => item.count > 0)
  const formattedGoalData = financialGoalDistribution.filter((item) => item.value > 0)
  const formattedFocusData = currentFocusDistribution.filter((item) => item.value > 0)

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border bg-background p-3 shadow-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-primary">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Breakdown of registrations by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedAgeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {formattedAgeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Breakdown of registrations by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedGenderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {formattedGenderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Financial Goals</CardTitle>
            <CardDescription>Primary financial goals of registrants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedGoalData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {formattedGoalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Focus</CardTitle>
            <CardDescription>Current focus areas of registrants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedFocusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {formattedFocusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Registration Timeline</CardTitle>
            <CardDescription>Number of registrations per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="count" stroke="#00875A" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Top states by registration count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stateData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#0A6EBD" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
