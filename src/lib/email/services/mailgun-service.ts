import type { EmailPayload } from './index'
import { EMAIL_CONFIG } from '../config'
// import FormData from "form-data"
// import fetch from "node-fetch"

// Mailgun email service
export async function sendWithMailgun(
  payload: EmailPayload,
): Promise<{ success: boolean; message?: string; error?: any }> {
  try {
    // Check if Mailgun credentials are configured
    if (!EMAIL_CONFIG.service.mailgun.apiKey || !EMAIL_CONFIG.service.mailgun.domain) {
      throw new Error('Mailgun API key or domain is not configured')
    }

    const auth = Buffer.from(`api:${EMAIL_CONFIG.service.mailgun.apiKey}`).toString('base64')
    const formData = new FormData()

    // Add email data to form
    formData.append(
      'from',
      `${payload.from?.name || EMAIL_CONFIG.defaultFrom.name} <${payload.from?.email || EMAIL_CONFIG.defaultFrom.email}>`,
    )

    if (Array.isArray(payload.to)) {
      payload.to.forEach((recipient) => formData.append('to', recipient))
    } else {
      formData.append('to', payload.to)
    }

    formData.append('subject', payload.subject)
    formData.append('text', payload.text)
    formData.append('html', payload.html)

    if (payload.replyTo) {
      formData.append('h:Reply-To', payload.replyTo)
    }

    // Add attachments if any
    if (payload.attachments && payload.attachments.length > 0) {
      payload.attachments.forEach((attachment) => {
        formData.append('attachment', attachment.content, {
          filename: attachment.filename,
          contentType: attachment.contentType,
        })
      })
    }

    const response = await fetch(
      `https://api.mailgun.net/v3/${EMAIL_CONFIG.service.mailgun.domain}/messages`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Mailgun API error: ${JSON.stringify(errorData)}`)
    }

    const result = await response.json()

    return {
      success: true,
      message: 'Email sent successfully with Mailgun',
    }
  } catch (error) {
    console.error('Mailgun error:', error)
    return {
      success: false,
      message: 'Failed to send email with Mailgun',
      error,
    }
  }
}
