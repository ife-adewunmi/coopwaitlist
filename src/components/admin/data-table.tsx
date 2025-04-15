'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Eye } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Registration } from '@/lib/types/registration'

interface DataTableProps {
  registrations: Registration[]
  isLoading: boolean
}

export function DataTable({ registrations, isLoading }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<Registration[]>([])
  const [genderFilter, setGenderFilter] = useState<string>('')
  const [ageFilter, setAgeFilter] = useState<string>('')
  const [stateFilter, setStateFilter] = useState<string>('')
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)

  // Get unique states for filter
  const uniqueStates = Array.from(new Set(registrations.map((reg) => reg.state)))
    .filter(Boolean)
    .sort()

  useEffect(() => {
    // Filter data based on search term and filters
    let filtered = [...registrations]

    // Apply search term filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (reg) =>
          reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.whatsapp.includes(searchTerm) ||
          reg.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.occupation.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply gender filter
    if (genderFilter && genderFilter !== 'all') {
      filtered = filtered.filter((reg) => reg.gender === genderFilter)
    }

    // Apply age filter
    if (ageFilter && ageFilter !== 'all') {
      filtered = filtered.filter((reg) => reg.ageBracket === ageFilter)
    }

    // Apply state filter
    if (stateFilter && stateFilter !== 'all') {
      filtered = filtered.filter((reg) => reg.state === stateFilter)
    }

    setFilteredData(filtered)
  }, [searchTerm, registrations, genderFilter, ageFilter, stateFilter])

  const clearFilters = () => {
    setSearchTerm('')
    setGenderFilter('')
    setAgeFilter('')
    setStateFilter('')
  }

  const viewDetails = (registration: Registration) => {
    setSelectedRegistration(registration)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Registration Data</CardTitle>
          <CardDescription>Complete list of waitlist registrations</CardDescription>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <div className="flex w-full items-center space-x-2 md:w-1/3">
              <Input
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-1 flex-wrap gap-2">
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Age Bracket" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45-54">45-54</SelectItem>
                  <SelectItem value="55+">55+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {uniqueStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state.charAt(0).toUpperCase() + state.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={clearFilters} className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Financial Goal</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-4 text-center">
                      <div className="flex justify-center">
                        <svg
                          className="h-5 w-5 animate-spin text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-4 text-center">
                      No registrations found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((reg, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{reg.name}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.whatsapp}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            reg.gender === 'male'
                              ? 'default'
                              : reg.gender === 'female'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {reg.gender
                            ? reg.gender.charAt(0).toUpperCase() + reg.gender.slice(1)
                            : 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>{reg.ageBracket || 'N/A'}</TableCell>
                      <TableCell>
                        {reg.city && reg.state
                          ? `${reg.city}, ${reg.state.charAt(0).toUpperCase() + reg.state.slice(1)}`
                          : reg.city || reg.state || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {reg.financialGoal ? (
                          <Badge variant="outline">
                            {reg.financialGoal === 'business'
                              ? 'Business'
                              : reg.financialGoal === 'savings'
                                ? 'Savings'
                                : 'Education'}
                          </Badge>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>{new Date(reg.registrationDate).toLocaleString()}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(reg)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:inline-block">View</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Registration Details</DialogTitle>
                              <DialogDescription>
                                Complete information for {reg.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">Name:</span>
                                <span className="col-span-2">{reg.name}</span>
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">Email:</span>
                                <span className="col-span-2">{reg.email}</span>
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">WhatsApp:</span>
                                <span className="col-span-2">{reg.whatsapp}</span>
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">Gender:</span>
                                <span className="col-span-2">{reg.gender}</span>
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">Age Bracket:</span>
                                <span className="col-span-2">{reg.ageBracket}</span>
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">Location:</span>
                                <span className="col-span-2">
                                  {reg.city}, {reg.state}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">Occupation:</span>
                                <span className="col-span-2">{reg.occupation}</span>
                              </div>

                              <div className="mt-2 border-t pt-4">
                                <h4 className="mb-2 font-semibold">Questionnaire Responses</h4>

                                <div className="grid grid-cols-3 items-center gap-4">
                                  <span className="font-medium">Financial Goal:</span>
                                  <span className="col-span-2">
                                    {reg.financialGoal === 'business'
                                      ? 'Starting or Scaling a Business'
                                      : reg.financialGoal === 'savings'
                                        ? 'Building Long-term Savings & Wealth'
                                        : reg.financialGoal === 'education'
                                          ? 'Gaining Financial Education & Investment Knowledge'
                                          : 'N/A'}
                                  </span>
                                </div>

                                <div className="grid grid-cols-3 items-center gap-4">
                                  <span className="font-medium">Current Focus:</span>
                                  <span className="col-span-2">
                                    {reg.currentFocus === 'savings'
                                      ? 'Savings & Investments'
                                      : reg.currentFocus === 'support'
                                        ? 'Mentorship & Support'
                                        : reg.currentFocus === 'opportunities'
                                          ? 'Strategic Opportunities'
                                          : 'N/A'}
                                  </span>
                                </div>

                                <div className="grid grid-cols-3 items-center gap-4">
                                  <span className="font-medium">Decision Value:</span>
                                  <span className="col-span-2">
                                    {reg.decisionValue === 'speed'
                                      ? 'Speed of Implementation'
                                      : reg.decisionValue === 'quality'
                                        ? 'High-quality Results'
                                        : reg.decisionValue === 'cost'
                                          ? 'Cost Effectiveness'
                                          : 'N/A'}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-medium">Registered:</span>
                                <span className="col-span-2">
                                  {new Date(reg.registrationDate).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
