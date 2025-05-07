import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from '@/states/slices/modal/modalSlice'
import { toastReducer } from '@/states/slices/toast/toastSlice'
import { waitlistReducer } from '@/states/slices/waitlist/waitlistSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    waitlist: waitlistReducer,
    toast: toastReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
