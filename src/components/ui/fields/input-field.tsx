import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { WaitlistFormState } from '@/states/slices/waitlist/waitlistState'

interface InputFieldProps {
  name: keyof WaitlistFormState
  label: string
  placeholder: string
  form: any // Replace with the actual type of your form
  type?: string
}

export const InputField = ({ name, label, placeholder, form, type = 'text' }: InputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
