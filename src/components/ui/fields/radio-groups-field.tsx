import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { WaitlistFormState } from '@/states/slices/waitlist/waitlistState'

interface RadioGroupFieldProps {
  name: keyof WaitlistFormState
  label: string
  form: any
}

export const RadioGroupField = ({ name, label, form }: RadioGroupFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={String(name)}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="male" />
                </FormControl>
                <FormLabel className="font-normal">Male</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
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
  )
}
