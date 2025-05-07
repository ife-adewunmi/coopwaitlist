'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/states/store'
import { closeModal, ModalType } from '@/states/slices/modal/modalSlice'
import { WaitlistFormModal } from '@/components/waitlist/waitlist-form-modal'
import { QuestionnaireModal } from '@/components/questionnaire/questionnaire-modal'

/**
 * ModalManager is responsible for rendering the appropriate modal based on Redux state
 * It centralizes all modal rendering logic in one place
 */
export function ModalManager() {
  const { modalType, isOpen, data } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  // Render the appropriate modal based on modalType
  const renderModal = () => {
    if (!isOpen) return null

    switch (modalType) {
      case ModalType.WAITLIST_FORM:
        return <WaitlistFormModal isOpen={isOpen} onClose={handleClose} data={data} />
      case ModalType.QUESTIONNAIRE:
        return <QuestionnaireModal isOpen={isOpen} onClose={handleClose} data={data} />
      default:
        return null
    }
  }

  return <>{renderModal()}</>
}
