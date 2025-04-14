import { configureStore } from '@reduxjs/toolkit'
import { registrationsReducer } from '@/state/slices/registrations'

export const store = configureStore({
  reducer: {
    registrations: registrationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
