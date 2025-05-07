'use client'

import type React from 'react'
import { ThemeProvider } from './theme-provider'
import { Provider } from 'react-redux'
import { store } from '@/states/store'
import { ModalManager } from '@/states/slices/modal/ModalManager'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <ModalManager />
      </ThemeProvider>
    </Provider>
  )
}
