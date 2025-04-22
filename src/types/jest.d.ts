import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      // Add other jest-dom matchers if needed
    }
  }
}
