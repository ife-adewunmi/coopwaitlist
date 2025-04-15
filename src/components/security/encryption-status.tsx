'use client'

import { useEffect, useState } from 'react'
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function EncryptionStatus() {
  const [status, setStatus] = useState<'checking' | 'active' | 'inactive'>('checking')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    // Check if encryption is properly configured
    const checkEncryption = async () => {
      try {
        const response = await fetch('/api/check-encryption')

        // Check if response is ok before trying to parse JSON
        if (!response.ok) {
          console.error(`API returned status ${response.status}: ${response.statusText}`)
          setStatus('inactive')
          setErrorMessage(`API error: ${response.status} ${response.statusText}`)
          return
        }

        // Parse JSON response
        try {
          const data = await response.json()

          if (data.encrypted) {
            setStatus('active')
          } else {
            setStatus('inactive')
            setErrorMessage(data.message || 'Unknown encryption issue')
          }
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError)
          setStatus('inactive')
          setErrorMessage('Invalid response from server')
        }
      } catch (error) {
        console.error('Error checking encryption status:', error)
        setStatus('inactive')
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
      }
    }

    checkEncryption()
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {status === 'checking' && (
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3.5 w-3.5" />
                <span>Checking encryption...</span>
              </Badge>
            )}

            {status === 'active' && (
              <Badge variant="secondary" className="gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Data Encrypted</span>
              </Badge>
            )}

            {status === 'inactive' && (
              <Badge variant="destructive" className="gap-1">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Encryption Issue</span>
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {status === 'checking' && <p>Verifying encryption configuration...</p>}
          {status === 'active' && <p>Encryption is properly configured and active</p>}
          {status === 'inactive' && (
            <p>{errorMessage || 'Encryption is not properly configured'}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
