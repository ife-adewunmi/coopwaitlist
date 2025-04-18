'use client'

import React, { createContext, useContext, useState } from 'react'
import { WaitlistFormModal } from '@/components/home/waitlist-form-modal'

interface WaitlistModalContextType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const WaitlistModalContext = createContext<WaitlistModalContextType | undefined>(undefined)

export function WaitlistModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <WaitlistModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <WaitlistFormModal isOpen={isModalOpen} onClose={closeModal} />
    </WaitlistModalContext.Provider>
  )
}

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext)
  if (context === undefined) {
    throw new Error('useWaitlistModal must be used within a WaitlistModalProvider')
  }
  return context
}
