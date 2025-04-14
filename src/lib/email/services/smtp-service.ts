import type { EmailPayload } from "./index"
import { EMAIL_CONFIG } from "../config"

// SMTP email service
export async function sendWithSmtp(
  payload: EmailPayload,
): Promise<{ success: boolean; message?: string; error?: any }> {
  try {
    // Check if SMTP credentials are configured
    if (!EMAIL_CONFIG.service.smtp.host || !EMAIL_CONFIG.service.smtp.auth.user) {
      throw new Error("SMTP configuration is incomplete")
    }

    // Dynamic import to avoid loading nodemailer in environments where it's not used
    const nodemailer = await import("nodemailer")

    // Create transporter
    const transporter = nodemailer.default.createTransport({
      host: EMAIL_CONFIG.service.smtp.host,
      port: EMAIL_CONFIG.service.smtp.port,
      secure: EMAIL_CONFIG.service.smtp.secure,
      auth: {
        user: EMAIL_CONFIG.service.smtp.auth.user,
        pass: EMAIL_CONFIG.service.smtp.auth.pass,
      },
    })

    // Prepare email
    const mailOptions = {
      from: `${payload.from?.name || EMAIL_CONFIG.defaultFrom.name} <${payload.from?.email || EMAIL_CONFIG.defaultFrom.email}>`,
      to: Array.isArray(payload.to) ? payload.to.join(", ") : payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      replyTo: payload.replyTo,
      attachments: payload.attachments,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: `Email sent successfully with SMTP: ${info.messageId}`,
    }
  } catch (error) {
    console.error("SMTP error:", error)
    return {
      success: false,
      message: "Failed to send email with SMTP",
      error,
    }
  }
}

