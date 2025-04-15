import { NextResponse } from 'next/server'
import { verifyMagicLinkToken, setAuthCookie } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        {
          error: 'Missing token',
        },
        { status: 400 },
      )
    }

    const { valid, email } = await verifyMagicLinkToken(token)

    if (!valid || !email) {
      return NextResponse.json(
        {
          error: 'Invalid or expired token',
        },
        { status: 401 },
      )
    }

    // Set auth cookie
    await setAuthCookie(email)

    // Redirect to admin dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  } catch (error) {
    console.error('Error verifying magic link:', error)
    return NextResponse.json(
      {
        error: 'Failed to verify magic link',
      },
      { status: 500 },
    )
  }
}
