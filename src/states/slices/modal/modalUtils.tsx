import { AppDispatch } from '@/states/store'
import { closeModal, updateModalData } from './modalSlice'

export function closeModalWithDelay(dispatch: AppDispatch, delayMs: number = 1000) {
  setTimeout(() => {
    dispatch(closeModal())
  }, delayMs)
}

export function updateModalState(
  dispatch: AppDispatch,
  data: Record<string, any>,
  options: { merge?: boolean } = { merge: true },
) {
  dispatch(updateModalData(options.merge ? { ...data } : data))
}
