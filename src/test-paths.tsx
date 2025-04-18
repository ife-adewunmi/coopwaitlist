'use client'

import { useWaitlistModal } from '@/contexts/waitlist-modal-context'
import { store } from '@/states/store'
import { addRegistration } from '@/states/slices/registrations/registrationsSlice'

export default function TestPaths() {
  const { openModal } = useWaitlistModal()
  
  return (
    <div>
      <h1>Test Paths</h1>
      <button onClick={openModal}>Open Modal</button>
    </div>
  )
}
