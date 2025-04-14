import { NextResponse } from 'next/server'
import { generateMagicLinkToken } from '@/lib/auth'
import { ADMIN_EMAIL } from '@/lib/auth-constants'
import { sendMagicLinkEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Check if the email is the admin email
    if ((!Array(ADMIN_EMAIL) && email !== ADMIN_EMAIL) || !ADMIN_EMAIL.includes(email)) {
      // For security, don't reveal that this email isn't authorized
      // Instead, pretend we sent the email
      return NextResponse.json({
        success: true,
        message: 'If your email is email is authorized, you will receive a magic link shortly.',
      })
    }

    // Generate a magic link token
    const token = await generateMagicLinkToken(email)

    // In a real app, you would send an email with the magic link
    const magicLink = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/verify?token=${token}`

    // Send the magic link email
    await sendMagicLinkEmail('Admin', email, magicLink)

    // console.log("Magic link for admin:", magicLink)

    return NextResponse.json({
      success: true,
      message: 'If your email is authorized, you will receive a magic link shortly.',
      // Include the magic link in development for testing
      ...(process.env.NODE_ENV !== 'production' && { magicLink }),
    })
  } catch (error) {
    console.error('Error sending magic link:', error)
    return NextResponse.json(
      {
        error: 'Failed to send magic link',
      },
      { status: 500 },
    )
  }
}
