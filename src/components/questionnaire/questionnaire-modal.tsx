'use client'

import { useDispatch } from 'react-redux'
import { FullScreenModal, FullScreenModalContent } from '@/components/ui/full-screen-modal'
import { Questionnaire } from './questionnaire'
import { closeModal } from '@/states/slices/modal/modalSlice'
import { setComplete } from '@/states/slices/waitlist/waitlistSlice'
import type { RegistrationQuestions } from '@/lib/types/registration'
import { closeModalWithDelay } from '@/states/slices/modal/modalUtils'

interface QuestionnaireModalProps {
  isOpen: boolean
  onClose: () => void
  data: Record<string, unknown>
}

export function QuestionnaireModal({ isOpen, onClose, data }: QuestionnaireModalProps) {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleQuestionnaireComplete = (answers: RegistrationQuestions) => {
    dispatch(setComplete(true))
    closeModalWithDelay(dispatch, 1000)
  }

  return (
    <FullScreenModal open={isOpen} onOpenChange={handleClose}>
      <FullScreenModalContent className="flex items-center justify-center">
        <div className="w-full max-w-4xl p-6">
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        </div>
      </FullScreenModalContent>
    </FullScreenModal>
  )
}
