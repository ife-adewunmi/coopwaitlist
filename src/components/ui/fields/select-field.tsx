import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/store'
import { WaitlistFormState } from '@/states/slices/waitlist/waitlistState'

interface SelectFieldProps {
  name: keyof WaitlistFormState
  label: string
  form: any
  placeholder: string
  options: string[]
  capitalizeOptions?: boolean
}

export const SelectField = ({
  name,
  label,
  form,
  placeholder,
  options,
  capitalizeOptions = false,
}: SelectFieldProps) => {
  const dispatch = useDispatch()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {capitalizeOptions ? option.charAt(0).toUpperCase() + option.slice(1) : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
