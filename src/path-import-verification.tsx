'use client'

import { useWaitlistModal } from '@/contexts/waitlist-modal-context'
import { store } from '@/states/store'
import { addRegistration } from '@/states/slices/registrations/registrationsSlice'

/**
 * PathImportVerification
 * 
 * This component verifies that path aliases are correctly configured
 * by importing from various paths and using their exports.
 * It serves as a simple test to ensure our tsconfig.json path mappings work.
 */
export default function PathImportVerification() {
  const { openModal } = useWaitlistModal()
  
  return (
    <div className="p-6 border rounded-lg m-4 bg-card">
      <h1 className="text-xl font-bold mb-4">Path Import Verification</h1>
      <p className="mb-4 text-muted-foreground">
        This component verifies that the following imports work correctly:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><code>@/contexts/waitlist-modal-context</code></li>
          <li><code>@/states/store</code></li>
          <li><code>@/states/slices/registrations/registrationsSlice</code></li>
        </ul>
      </p>
      <button 
        onClick={openModal}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
      >
        Test Modal Context
      </button>
    </div>
  )
}
