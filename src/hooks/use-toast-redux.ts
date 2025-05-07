'use client'

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToast,
  updateToast,
  dismissToast,
  removeToast,
  TOAST_REMOVE_DELAY,
  ToastInput,
} from '@/states/slices/toast/toastSlice'
import type { RootState } from '@/states/store'

/**
 * Custom hook for managing toast notifications through Redux
 */
export function useToastRedux() {
  const dispatch = useDispatch()
  const toasts = useSelector((state: RootState) => state.toast.toasts)
  const toast = useCallback(
    (props: ToastInput) => {
      const id = dispatch(addToast(props))

      // Auto-dismiss toast after delay
      setTimeout(() => {
        dispatch(dismissToast(id.payload.id))

        // Remove toast from store after animation completes
        setTimeout(() => {
          dispatch(removeToast(id.payload.id))
        }, 300) // Animation duration
      }, TOAST_REMOVE_DELAY)

      return {
        id: id.payload.id,
        update: (props: ToastInput) => dispatch(updateToast({ id: id.payload.id!, toast: props })),
        dismiss: () => dispatch(dismissToast(id.payload.id)),
      }
    },
    [dispatch],
  )

  const dismiss = useCallback(
    (toastId?: string) => {
      dispatch(dismissToast(toastId))

      // Remove toast from store after animation completes
      setTimeout(() => {
        dispatch(removeToast(toastId))
      }, 300)
    },
    [dispatch],
  )

  const showToast = (
    title: string,
    description: string,
    variant: 'default' | 'destructive' = 'default',
  ) => {
    toast({ title, description, variant })
  }

  const showSuccess = (title: string, description: string) => {
    showToast(title, description, 'default')
  }

  const showError = (title: string, description: string) => {
    showToast(title, description, 'destructive')
  }

  return {
    toast,
    dismiss,
    toasts,
    showToast,
    showSuccess,
    showError,
  }
}
