'use client'

// Client-side authentication utilities
// This file doesn't use Node.js modules like crypto

// Send a login request
export async function sendLoginRequest(email: string) {
  const response = await fetch('/api/auth/magic-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Failed to send magic link')
  }

  return response.json()
}

// Logout
export async function logout() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Failed to logout')
  }

  return response.json()
}
