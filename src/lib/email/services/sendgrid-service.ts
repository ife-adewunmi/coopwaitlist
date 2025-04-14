import type { EmailPayload } from './index'
import { EMAIL_CONFIG } from '../config'

// SendGrid email service
export async function sendWithSendGrid(
  payload: EmailPayload,
): Promise<{ success: boolean; message?: string; error?: any }> {
  try {
    // Check if SendGrid API key is configured
    if (!EMAIL_CONFIG.service.sendgrid.apiKey) {
      throw new Error('SendGrid API key is not configured')
    }

    // Dynamic import to avoid loading SendGrid in environments where it's not used
    const sgMail = await import('@sendgrid/mail')
    sgMail.default.setApiKey(EMAIL_CONFIG.service.sendgrid.apiKey)

    const msg = {
      to: payload.to,
      from: {
        email: payload.from?.email || EMAIL_CONFIG.defaultFrom.email,
        name: payload.from?.name || EMAIL_CONFIG.defaultFrom.name,
      },
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      replyTo: payload.replyTo,
      attachments: payload.attachments?.map((attachment) => ({
        content:
          typeof attachment.content === 'string'
            ? attachment.content
            : attachment.content.toString('base64'),
        filename: attachment.filename,
        type: attachment.contentType,
        disposition: 'attachment',
      })),
    }

    await sgMail.default.send(msg)

    return {
      success: true,
      message: 'Email sent successfully with SendGrid',
    }
  } catch (error) {
    console.error('SendGrid error:', error)
    return {
      success: false,
      message: 'Failed to send email with SendGrid',
      error,
    }
  }
}
