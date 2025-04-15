import type React from 'react'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { openSans } from './fonts'
import './globals.css'

export const metadata = {
  title: 'Financial Growth Cooperative - Waitlist',
  description: 'Join our waitlist for the Financial Growth Cooperative',
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable} suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
