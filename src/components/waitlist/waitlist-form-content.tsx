'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { useToastRedux } from '@/hooks/use-toast-redux'
import {
  selectIsSubmitting,
  selectSubmissionError,
  selectWaitlistForm,
} from '@/states/slices/waitlist/waitlistSelectors'
import { InputField, RadioGroupField, SelectField } from '@/components/ui/fields'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AppDispatch } from '@/states/store'
import { nigerianPhoneNumber } from '@/src/lib/validators/zod-validators'
import { showModal, ModalType } from '@/states/slices/modal/modalSlice'
import { updateFormField, completeForm } from '@/states/slices/waitlist/waitlistSlice'

// Nigerian states for dropdown
const NIGERIAN_STATES = [
  'abia',
  'adamawa',
  'akwa ibom',
  'anambra',
  'bauchi',
  'bayelsa',
  'benue',
  'borno',
  'cross river',
  'delta',
  'ebonyi',
  'edo',
  'ekiti',
  'enugu',
  'fct',
  'gombe',
  'imo',
  'jigawa',
  'kaduna',
  'kano',
  'katsina',
  'kebbi',
  'kogi',
  'kwara',
  'lagos',
  'nassarawa',
  'niger',
  'ogun',
  'ondo',
  'osun',
  'oyo',
  'plateau',
  'rivers',
  'sokoto',
  'taraba',
  'yobe',
  'zamfara',
]

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  whatsapp: nigerianPhoneNumber(),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender.',
  }),
  ageBracket: z.string({ required_error: 'Please select your age bracket.' }),
  state: z.string({ required_error: 'Please select your state.' }),
  city: z.string().min(2, { message: 'Please enter your city.' }),
  occupation: z.string().min(2, { message: 'Please enter your occupation.' }),
})

type FormValues = z.infer<typeof formSchema>

// Main Form Component
export const WaitlistFormContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showSuccess, showError } = useToastRedux()
  const isSubmitting = useSelector(selectIsSubmitting)
  const submissionError = useSelector(selectSubmissionError)
  const savedFormData = useSelector(selectWaitlistForm)

  // Initialize form with persisted values if available
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: savedFormData.name || '',
      email: savedFormData.email || '',
      whatsapp: savedFormData.whatsapp || '',
      gender: savedFormData.gender || undefined,
      ageBracket: savedFormData.ageBracket || '',
      state: savedFormData.state || '',
      city: savedFormData.city || '',
      occupation: savedFormData.occupation || '',
    },
  })

  // Listen for form changes and update Redux store
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && value[name as keyof FormValues] !== undefined) {
        dispatch(
          updateFormField({
            field: name as keyof FormValues,
            value: value[name as keyof FormValues],
          }),
        )
      }
    })

    return () => subscription.unsubscribe()
  }, [form, dispatch])

  const onSubmit = async (values: FormValues) => {
    // Update all form fields to ensure everything is saved
    Object.entries(values).forEach(([field, value]) => {
      dispatch(
        updateFormField({
          field: field as keyof FormValues,
          value,
        }),
      )
    })

    // Mark form as completed
    dispatch(completeForm())

    // Show questionnaire modal
    dispatch(showModal({ type: ModalType.QUESTIONNAIRE }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {submissionError && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {submissionError}
          </div>
        )}

        <InputField name="name" label="Full Name" placeholder="Xample Tessy" form={form} />
        <InputField
          name="email"
          label="Email Address"
          placeholder="test@example.com"
          type="email"
          form={form}
        />
        <InputField name="whatsapp" label="WhatsApp Number" placeholder="08012345678" form={form} />
        <RadioGroupField name="gender" label="Gender" form={form} />
        <SelectField
          name="ageBracket"
          label="Age Bracket"
          placeholder="Select your age bracket"
          options={['18-24', '25-34', '35-44', '45-54', '55+']}
          form={form}
        />
        <SelectField
          name="state"
          label="State"
          placeholder="Select your state"
          options={NIGERIAN_STATES}
          capitalizeOptions
          form={form}
        />
        <InputField name="city" label="City/Town" placeholder="Your city or town" form={form} />
        <InputField
          name="occupation"
          label="Occupation"
          placeholder="Your occupation"
          form={form}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Continue to Questionnaire'
          )}
        </Button>
      </form>
    </Form>
  )
}
