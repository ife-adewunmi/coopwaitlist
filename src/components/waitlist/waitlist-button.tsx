import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, ButtonProps } from '@/components/ui/button'
import { ButtonLabel } from '@/components/ui/button-label'
import Link from 'next/link'
import { showModal, ModalType } from '@/states/slices/modal/modalSlice'

interface WaitlistButtonProps extends ButtonProps {
  label?: string
  asLink?: boolean
  className?: string
  icon?: React.ReactNode
  modalData?: Record<string, unknown>
}

export const WaitlistButton = ({
  label = 'Join Waitlist',
  asLink = false,
  className,
  icon,
  modalData = {},
  ...props
}: WaitlistButtonProps) => {
  const dispatch = useDispatch()

  const handleWaitlistClick = (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (asLink && event) {
      event.preventDefault()
      const waitlistSection = document.getElementById('waitlist')
      if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      dispatch(
        showModal({
          type: ModalType.WAITLIST_FORM,
          data: modalData,
        }),
      )
    }

    if (props.onClick && event && event.target instanceof HTMLButtonElement) {
      props.onClick(event as React.MouseEvent<HTMLButtonElement>)
    }
  }

  if (asLink) {
    return (
      <Button asChild className={className} {...props}>
        <Link href="#waitlist" onClick={handleWaitlistClick}>
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
