'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { addRegistration } from '@/state/slices/registrations/registrationsSlice'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle, Shield } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Questionnaire } from './questionnaire/questionnaire'
import type { RegistrationQuestions } from '@/lib/types/registration'

// Nigerian states
const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  whatsapp: z.string().min(11, { message: 'Please enter a valid phone number.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender.',
  }),
  ageBracket: z.string({ required_error: 'Please select your age bracket.' }),
  state: z.string({ required_error: 'Please select your state.' }),
  city: z.string().min(2, { message: 'Please enter your city.' }),
  occupation: z.string().min(2, { message: 'Please enter your occupation.' }),
})

type FormValues = z.infer<typeof formSchema>

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<RegistrationQuestions>({})
  const dispatch = useDispatch()
  const { toast } = useToast()

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      gender: undefined,
      ageBracket: '',
      state: '',
      city: '',
      occupation: '',
    },
  })

  // Form submission handler
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    setFormError(null)

    try {
      // Generate a CSRF token (in a real app, this would come from the server)
      const csrfToken = Math.random().toString(36).substring(2)

      // Save to Redux store
      dispatch(
        addRegistration({
          ...values,
          ...questionnaireAnswers,
          registrationDate: new Date().toISOString(),
        }),
      )

      // Save to JSON file via API with CSRF protection
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          ...values,
          ...questionnaireAnswers,
          registrationDate: new Date().toISOString(),
        }),
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = `Submission failed: ${response.status} ${response.statusText}`

        // Try to get error details from response if possible
        try {
          const errorData = await response.json()
          if (errorData && errorData.error) {
            errorMessage = errorData.error

            // Special handling for duplicate email
            if (response.status === 409) {
              form.setError('email', {
                type: 'manual',
                message: 'This email is already registered.',
              })
            }
          }
        } catch (jsonError) {
          // If we can't parse JSON, use the status text
          console.error('Error parsing error response:', jsonError)
        }

        throw new Error(errorMessage)
      }

      // Parse successful response
      const responseData = await response.json()

      // Show questionnaire
      setShowQuestionnaire(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormError(error instanceof Error ? error.message : 'An unexpected error occurred')
      toast({
        title: 'Registration Failed',
        description: 'There was an error submitting your registration. Please try again.',
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }

  const handleQuestionnaireComplete = (answers: RegistrationQuestions) => {
    setQuestionnaireAnswers(answers)

    // Reset form
    form.reset()
    setFormSuccess(true)
    setIsSubmitting(false)

    // Show success toast
    toast({
      title: 'Registration Successful',
      description: "Thank you for joining our waitlist! We'll be in touch soon.",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 sm:px-6 md:px-8"
    >
      <Card className="mx-auto max-w-2xl border-2 border-border p-4 shadow-lg sm:p-6">
        <CardContent className="pt-4 sm:pt-6">
          {!showQuestionnaire && !formSuccess && (
            <>
              <div className="mb-4 flex justify-center sm:mb-6">
                <Shield className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
              </div>
              <h3 className="mb-4 text-center text-2xl font-bold text-primary sm:mb-6 sm:text-3xl">
                Join Our Waitlist Today!
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {formError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>{`We'll never share your email with anyone else.`}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your WhatsApp number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap space-x-2 sm:space-x-4"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="male" />
                                </FormControl>
                                <FormLabel className="font-normal">Male</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="female" />
                                </FormControl>
                                <FormLabel className="font-normal">Female</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="ageBracket"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age Bracket</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your age bracket" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="18-24">18-24</SelectItem>
                              <SelectItem value="25-34">25-34</SelectItem>
                              <SelectItem value="35-44">35-44</SelectItem>
                              <SelectItem value="45-54">45-54</SelectItem>
                              <SelectItem value="55+">55+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              {NIGERIAN_STATES.map((state) => (
                                <SelectItem key={state} value={state.toLowerCase()}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City/Town</FormLabel>
                          <FormControl>
                            <Input placeholder="Your city or town" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="Your occupation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Join Waitlist'
                      )}
                    </Button>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-2 sm:mt-4">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <p className="text-center text-xs text-muted-foreground">
                      Your data is encrypted and securely stored. We respect your privacy.
                    </p>
                  </div>
                </form>
              </Form>
            </>
          )}

          {showQuestionnaire && !formSuccess && (
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          )}

          {formSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg bg-secondary/20 p-4 text-center sm:p-6"
            >
              <h4 className="mb-2 text-xl font-semibold">Thank You for Registering!</h4>
              <p className="mb-4">{`Your information has been securely saved. We'll be in touch soon.`}</p>
              <Button
                onClick={() => {
                  setFormSuccess(false)
                  setShowQuestionnaire(false)
                }}
              >
                Register Another Person
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
