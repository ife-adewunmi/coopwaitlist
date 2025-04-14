// Email configuration
export const EMAIL_CONFIG = {
  // Default sender information
  defaultFrom: {
    name: 'Help Circle Cooperative',
    email: 'noreply@helpcircle.coop',
  },

  // Admin email for notifications
  adminEmail: process.env.ADMIN_EMAIL || 'admin@helpcircle.coop',

  // Email service configuration
  service: {
    // You can switch between different email providers here
    provider: process.env.EMAIL_PROVIDER || 'console', // Options: "sendgrid", "mailgun", "smtp", "console"

    // SendGrid
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
    },

    // Mailgun
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },

    // SMTP
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number.parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },

  // Rate limiting to prevent abuse
  rateLimit: {
    maxPerHour: 50,
    maxPerDay: 200,
  },
}
