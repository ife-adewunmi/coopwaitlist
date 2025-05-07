import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ModalActions {
  SLICE_NAME = '@MODAL',
  SHOW_MODAL = '@MODAL/showModal',
  CLOSE_MODAL = '@MODAL/closeModal',
  RESET_MODAL = '@MODAL/resetModal',
}

export enum ModalType {
  NONE = 'NONE',
  WAITLIST_FORM = 'WAITLIST_FORM',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
}

// Define the state structure for modals
export interface ModalState {
  modalType: ModalType
  isOpen: boolean
  data: any
}

// Initial state for the modal slice
export const initialState: ModalState = {
  modalType: ModalType.NONE,
  isOpen: false,
  data: {},
}

// Create the slice
const modalSlice = createSlice({
  name: ModalActions.SLICE_NAME,
  initialState,
  reducers: {
    // Open a specific modal with optional data
    showModal: (
      state,
      action: PayloadAction<{ type: ModalType; data?: Record<string, unknown> }>,
    ) => {
      state.modalType = action.payload.type
      state.isOpen = true
      state.data = action.payload.data || {}
    },

    // Close the currently open modal
    closeModal: (state) => {
      state.isOpen = false
    },

    // Reset the modal state completely
    resetModal: (state) => {
      state.modalType = ModalType.NONE
      state.isOpen = false
      state.data = {}
    },

    // Update the modal data without changing other properties
    updateModalData: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.data = { ...state.data, ...action.payload }
    },
  },
})

// Export actions and reducer
export const { showModal, closeModal, resetModal, updateModalData } = modalSlice.actions
export const modalReducer = modalSlice.reducer
