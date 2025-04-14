import { sendWithConsole } from './console-service'
import { sendWithSendGrid } from './sendgrid-service'
import { sendWithMailgun } from './mailgun-service'
import { sendWithSmtp } from './smtp-service'
import { EMAIL_CONFIG } from '../config'

export interface EmailPayload {
  to: string | string[]
  subject: string
  text: string
  html: string
  from?: {
    name?: string
    email: string
  }
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

export async function sendEmail(
  payload: EmailPayload,
): Promise<{ success: boolean; message?: string; error?: any }> {
  try {
    // Set default from if not provided
    if (!payload.from) {
      payload.from = EMAIL_CONFIG.defaultFrom
    }

    // Choose the email service based on configuration
    switch (EMAIL_CONFIG.service.provider) {
      case 'sendgrid':
        return await sendWithSendGrid(payload)
      case 'mailgun':
        return await sendWithMailgun(payload)
      case 'smtp':
        return await sendWithSmtp(payload)
      case 'console':
      default:
        return await sendWithConsole(payload)
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      message: 'Failed to send email',
      error,
    }
  }
}
