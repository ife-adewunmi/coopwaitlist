import { sendEmail, EmailPayload } from "./services"
import { emailTemplates, type EmailTemplateType } from "./templates"
import { EMAIL_CONFIG } from "./config"

// Email utility functions
export async function sendWelcomeEmail(name: string, email: string) {
  const template = emailTemplates.welcome({
    recipientName: name,
    recipientEmail: email,
  })

  return await sendEmail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  })
}

export async function sendMagicLinkEmail(name: string, email: string, magicLink: string) {
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 15) // 15 minutes from now

  const template = emailTemplates.magicLink({
    recipientName: name,
    magicLink,
    expiresAt,
  })

  return await sendEmail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  })
}

export async function sendContactFormEmail(name: string, email: string, message: string, subject?: string) {
  const template = emailTemplates.contactForm({
    name,
    email,
    message,
    subject,
  })

  return await sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: template.subject,
    text: template.text,
    html: template.html,
    replyTo: email,
  })
}

export async function sendNewsletterEmail(
  recipients: string[],
  subject: string,
  content: string,
  unsubscribeBaseUrl: string,
) {
  // Send emails in batches to avoid rate limits
  const batchSize = 50
  const results = []

  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize)

    for (const email of batch) {
      const unsubscribeLink = `${unsubscribeBaseUrl}?email=${encodeURIComponent(email)}`

      const template = emailTemplates.newsletter({
        recipientEmail: email,
        subject,
        content,
        unsubscribeLink,
      })

      const result = await sendEmail({
        to: email,
        subject: template.subject,
        text: template.text,
        html: template.html,
      })

      results.push(result)
    }

    // Add a small delay between batches to avoid rate limits
    if (i + batchSize < recipients.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return results
}

export async function sendNotificationEmail(
  name: string,
  email: string,
  subject: string,
  message: string,
  actionText?: string,
  actionLink?: string,
) {
  const template = emailTemplates.notification({
    recipientName: name,
    subject,
    message,
    actionText,
    actionLink,
  })

  return await sendEmail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  })
}

// Generic function to send email using any template
export async function sendTemplatedEmail(
  templateType: EmailTemplateType,
  to: string | string[],
  templateData: any,
  options?: Partial<EmailPayload>,
) {
  const template = emailTemplates[templateType](templateData)

  return await sendEmail({
    to,
    subject: template.subject,
    text: template.text,
    html: template.html,
    ...options,
  })
}

// Export all email-related utilities
export { sendEmail, EmailPayload, emailTemplates, EMAIL_CONFIG }
