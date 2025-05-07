import type React from 'react'
import { RootProvider } from '@/providers/root-provider'
import { Toaster } from '@/components/ui/toaster'
import { openSans } from './fonts'
import './globals.css'

export const metadata = {
  title: 'Coop - Join our waitlist',
  description: 'Coop is building a cooperative banking platform for Africans',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable} suppressHydrationWarning>
      <body>
        <RootProvider>
          {children}
          <Toaster />
        </RootProvider>
      </body>
    </html>
  )
}
