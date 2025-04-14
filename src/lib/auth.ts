'use server'

// Authentication utilities
import crypto from 'crypto'
import { cookies } from 'next/headers'
import { ADMIN_EMAIL } from './auth-constants'

// Generate a magic link token
export async function generateMagicLinkToken(email: string): Promise<string> {
  // Create a random token
  const randomBytes = crypto.randomBytes(32).toString('hex')

  // Create a timestamp for expiration
  const timestamp = Date.now() + 15 * 60 * 1000 // 15 minutes

  // Create a signature to prevent tampering
  const signature = crypto
    .createHmac('sha256', process.env.ENCRYPTION_KEY || 'fallback-key')
    .update(`${email}:${timestamp}:${randomBytes}`)
    .digest('hex')

  // Combine all parts
  const token = Buffer.from(
    JSON.stringify({
      email,
      timestamp,
      random: randomBytes,
      signature,
    }),
  ).toString('base64')

  return token
}

// Verify a magic link token
export async function verifyMagicLinkToken(
  token: string,
): Promise<{ valid: boolean; email?: string }> {
  try {
    // Decode the token
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())

    // Check if token has expired
    if (decoded.timestamp < Date.now()) {
      return { valid: false }
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.ENCRYPTION_KEY || 'fallback-key')
      .update(`${decoded.email}:${decoded.timestamp}:${decoded.random}`)
      .digest('hex')

    if (expectedSignature !== decoded.signature) {
      return { valid: false }
    }

    // Check if email is the admin email
    if (
      (!Array(ADMIN_EMAIL) && decoded.email !== ADMIN_EMAIL) ||
      !ADMIN_EMAIL.includes(decoded.email)
    ) {
      return { valid: false }
    }

    return { valid: true, email: decoded.email }
  } catch (error) {
    console.error('Error verifying magic link token:', error)
    return { valid: false }
  }
}

// Set auth cookie
export async function setAuthCookie(email: string) {
  const cookieStore = cookies()
  const token = await generateMagicLinkToken(email)

  ;(await cookieStore).set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  })
}

// Get authenticated user from cookie
export async function getAuthUser(): Promise<{ authenticated: boolean; email?: string }> {
  const cookieStore = cookies()
  const token = (await cookieStore).get('auth_token')?.value

  if (!token) {
    return { authenticated: false }
  }

  const { valid, email } = await verifyMagicLinkToken(token)

  if (!valid) {
    return { authenticated: false }
  }

  return { authenticated: true, email }
}

// Clear auth cookie
export async function clearAuthCookie() {
  const cookieStore = cookies()
  ;(await cookieStore).delete('auth_token')
}
