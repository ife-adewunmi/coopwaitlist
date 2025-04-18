'use client'

import type React from 'react'

import { Provider } from 'react-redux'
import { store } from '@/states/store'
import { ThemeProvider } from 'next-themes'
import { WaitlistModalProvider } from '@/contexts/waitlist-modal-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <WaitlistModalProvider>
          {children}
        </WaitlistModalProvider>
      </ThemeProvider>
    </Provider>
  )
}
