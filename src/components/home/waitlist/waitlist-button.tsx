import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { ButtonLabel } from '@/components/ui/button-label'
import Link from 'next/link'

interface WaitlistButtonProps extends ButtonProps {
  label?: string
  asLink?: boolean
  className?: string
  icon?: React.ReactNode
  onClick?: () => void
}

export const WaitlistButton = ({
  label = 'Join Waitlist',
  asLink = false,
  className,
  icon,
  ...props
}: WaitlistButtonProps) => {
  const handleWaitlistClick = (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (asLink && event) {
      event.preventDefault()
      const waitlistSection = document.getElementById('waitlist')
      if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
    if (props.onClick) {
      props.onClick()
    }
  }

  if (asLink) {
    return (
      <Button asChild className={className} {...props}>
        <Link href="#waitlist">
          <ButtonLabel label={label} buttonIcon={{ icon: icon }} />
        </Link>
      </Button>
    )
  }

  return (
    <Button className={className} onClick={handleWaitlistClick} {...props}>
      <ButtonLabel label={label} buttonIcon={{ icon: icon }} />
    </Button>
  )
}
