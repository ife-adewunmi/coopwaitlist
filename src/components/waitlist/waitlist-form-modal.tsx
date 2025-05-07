'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal'
import { homeContent } from '@/data/home-content'
import { WaitlistFormContent } from './waitlist-form-content'

interface WaitlistFormModalProps {
  isOpen: boolean
  onClose: () => void
  data?: Record<string, unknown>
}

export function WaitlistFormModal({ isOpen, onClose, data = {} }: WaitlistFormModalProps) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle className="text-center text-2xl font-bold">
            {homeContent.waitlistTitle}
          </ModalTitle>
          <ModalDescription className="text-center">
            {homeContent.waitlistDescription}
          </ModalDescription>
        </ModalHeader>
        <div className="p-6 pt-2">
          <WaitlistFormContent />
        </div>
      </ModalContent>
    </Modal>
  )
}
