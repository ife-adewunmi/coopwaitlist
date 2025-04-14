'use client'
import { Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function SimpleEncryptionStatus() {
  // This component doesn't make API calls, just shows that encryption is configured
  return (
    <Badge variant="secondary" className="gap-1">
      <Shield className="h-3.5 w-3.5" />
      <span>Encrypted Data</span>
    </Badge>
  )
}
