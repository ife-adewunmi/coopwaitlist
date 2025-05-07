import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'
import React from 'react'

export const TOAST_LIMIT = 5
export const TOAST_REMOVE_DELAY = 5000

export enum ToastActions {
  SLICE_NAME = '@TOAST',
  ADD_TOAST = '@TOAST/addToast',
  UPDATE_TOAST = '@TOAST/updateToast',
  DISMISS_TOAST = '@TOAST/dismissToast',
  REMOVE_TOAST = '@TOAST/removeToast',
}

// Helper type to ensure proper handling of readonly arrays
type DeepMutable<T> =
  T extends ReadonlyArray<infer U>
    ? Array<DeepMutable<U>>
    : T extends object
      ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
      : T

// Ensure toast properties are mutable
export type ToasterToast = DeepMutable<ToastProps> & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Input toast type - may contain readonly arrays
export type ToastInput = Omit<ToastProps, 'className' | 'style'> & {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Mutable version for store
type Toast = Omit<ToasterToast, 'id'>

interface ToastState {
  toasts: ToasterToast[]
}

// Initial state for the toast slice
export const initialState: ToastState = {
  toasts: [],
}

export const toastSlice = createSlice({
  name: ToastActions.SLICE_NAME,
  initialState,
  reducers: {
    // Modified to handle potential readonly arrays
    addToast: (state, action: PayloadAction<ToastInput>) => {
      // Create a mutable deep copy of the payload
      const mutablePayload: Toast = Object.keys(action.payload).reduce((acc, key) => {
        const value = action.payload[key as keyof ToastInput]

        // Handle array conversions
        if (Array.isArray(value)) {
          acc[key as keyof Toast] = [...value] as any
        } else {
          acc[key as keyof Toast] = value as any
        }

        return acc
      }, {} as Toast)

      const toast = {
        ...mutablePayload,
        id: '',
        open: true,
      }

      // Keep only the most recent toasts up to the limit
      state.toasts = [toast, ...state.toasts].slice(0, TOAST_LIMIT)
    },
    updateToast: (state, action: PayloadAction<{ id: string; toast: Partial<ToastInput> }>) => {
      const { id, toast: inputToast } = action.payload

      // Create a mutable copy of the toast update
      const mutableToast: Partial<Toast> = Object.keys(inputToast).reduce((acc, key) => {
        const value = inputToast[key as keyof Partial<ToastInput>]

        // Handle array conversions
        if (Array.isArray(value)) {
          acc[key as keyof Toast] = [...value] as any
        } else {
          acc[key as keyof Toast] = value as any
        }

        return acc
      }, {} as Partial<Toast>)

      state.toasts = state.toasts.map((t) => (t.id === id ? { ...t, ...mutableToast } : t))
    },

    dismissToast: (state, action: PayloadAction<string | undefined>) => {
      const toastId = action.payload

      if (toastId) {
        // Mark specific toast as closed
        state.toasts = state.toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t))
      } else {
        // Mark all toasts as closed
        state.toasts = state.toasts.map((t) => ({ ...t, open: false }))
      }
    },

    removeToast: (state, action: PayloadAction<string | undefined>) => {
      const toastId = action.payload

      if (toastId) {
        // Remove specific toast
        state.toasts = state.toasts.filter((t) => t.id !== toastId)
      } else {
        // Remove all toasts
        state.toasts = []
      }
    },
  },
})

export const { addToast, updateToast, dismissToast, removeToast } = toastSlice.actions

export const toastReducer = toastSlice.reducer
