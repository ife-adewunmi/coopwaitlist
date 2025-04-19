'use client'

import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { useWaitlistModal } from '@/contexts/waitlist-modal-context'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface WaitlistButtonProps extends ButtonProps {
  showArrow?: boolean
  text?: string
  asLink?: boolean
}

export function WaitlistButton({
  showArrow = false,
  text = 'Join Waitlist',
  asLink = false,
  className,
  ...props
}: WaitlistButtonProps) {
  const { openModal } = useWaitlistModal()

  // If asLink is true, render as a Link that scrolls to the waitlist section
  // but also opens the modal when clicked
  if (asLink) {
    return (
      <Button asChild className={className} {...props}>
        <Link
          href="#waitlist"
          onClick={() => {
            // Open the modal when clicked
            openModal()
          }}
        >
          {text}
          {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
        </Link>
      </Button>
    )
  }

  // Otherwise render as a regular button that opens the modal
  return (
    <Button
      onClick={openModal}
      className={className}
      {...props}
    >
      {text}
      {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </Button>
  )
}
