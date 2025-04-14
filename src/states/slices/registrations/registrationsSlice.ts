import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Registration {
  id?: string
  name: string
  email: string
  whatsapp: string
  gender: string
  ageBracket: string
  state: string
  city: string
  occupation: string
  registrationDate: string
}

interface RegistrationsState {
  registrations: Registration[]
}

const initialState: RegistrationsState = {
  registrations: [],
}

export const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    addRegistration: (state, action: PayloadAction<Registration>) => {
      state.registrations.push({
        ...action.payload,
        id: action.payload.id || `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      })
    },
    setRegistrations: (state, action: PayloadAction<Registration[]>) => {
      state.registrations = action.payload
    },
  },
})

export const { addRegistration, setRegistrations } = registrationsSlice.actions

export const registrationsReducer = registrationsSlice.reducer
