'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/admin/dashboard-header'
import { AnalyticsCards } from '@/components/admin/analytics-cards'
import { ChartsSection } from '@/components/admin/charts-section'
import { DataTable } from '@/components/admin/data-table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface Registration {
  name: string
  email: string
  emailIv?: string
  whatsapp: string
  whatsappIv?: string
  gender: string
  ageBracket: string
  state: string
  city: string
  occupation: string
  registrationDate: string
  id?: string
  financialGoal?: string
  currentFocus?: string
  decisionValue?: string
}

export default function AdminDashboardClient() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get registrations from Redux store
  const storeRegistrations = useSelector((state: any) => state.registrations.registrations)

  useEffect(() => {
    // Fetch registrations from API
    const fetchRegistrations = async () => {
      try {
        setError(null)
        const response = await fetch('/api/registrations', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch registrations')
        }

        const data = await response.json()

        // In a real app, you would decrypt sensitive data here
        // For now, we'll just use the data as is
        setRegistrations(data)
      } catch (error) {
        console.error('Error fetching registrations:', error)
        setError('Failed to load registration data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRegistrations()
  }, [])

  useEffect(() => {
    // Use data from Redux store if API fetch hasn't completed yet
    if (isLoading && storeRegistrations.length > 0) {
      setRegistrations(storeRegistrations)
    }
  }, [storeRegistrations, isLoading])

  // Function to refresh data
  const refreshData = async () => {
    setIsLoading(true)
    try {
      setError(null)
      const response = await fetch('/api/registrations', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch registrations')
      }

      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      console.error('Error refreshing data:', error)
      setError('Failed to refresh data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to export data as CSV
  const exportToCSV = () => {
    const headers = [
      'Name',
      'Email',
      'WhatsApp',
      'Gender',
      'Age Bracket',
      'State',
      'City',
      'Occupation',
      'Financial Goal',
      'Current Focus',
      'Decision Value',
      'Registration Date',
    ]

    const csvData = registrations.map((reg) =>
      [
        reg.name,
        reg.email, // In a real app, this would be decrypted
        reg.whatsapp, // In a real app, this would be decrypted
        reg.gender || 'N/A',
        reg.ageBracket || 'N/A',
        reg.state || 'N/A',
        reg.city || 'N/A',
        reg.occupation || 'N/A',
        reg.financialGoal || 'N/A',
        reg.currentFocus || 'N/A',
        reg.decisionValue || 'N/A',
        new Date(reg.registrationDate).toLocaleString(),
      ].join(','),
    )

    const csv = [headers.join(','), ...csvData].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `registrations-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader onRefresh={refreshData} onExport={exportToCSV} />

      <main className="container mx-auto flex-1 px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <AnalyticsCards registrations={registrations} />

        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
            <TabsTrigger value="data">Registration Data</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <ChartsSection registrations={registrations} />
          </TabsContent>

          <TabsContent value="data">
            <DataTable registrations={registrations} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
