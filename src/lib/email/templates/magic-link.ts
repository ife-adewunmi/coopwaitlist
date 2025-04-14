import { formatDate } from '@/lib/utils'

interface MagicLinkTemplateProps {
  recipientName: string
  magicLink: string
  expiresAt: Date
}

export function magicLinkTemplate({ recipientName, magicLink, expiresAt }: MagicLinkTemplateProps) {
  const expiryTime = formatDate(expiresAt)

  return {
    subject: 'Your Magic Link to Access Financial Growth Cooperative Admin',
    text: `
Hello ${recipientName},

You requested a magic link to access the Financial Growth Cooperative admin dashboard.

Click the link below to log in:
${magicLink}

This link will expire on ${expiryTime}.

If you didn't request this link, please ignore this email.

Best regards,
Financial Growth Cooperative Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Magic Link</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .container { border: 1px solid #e0e0e0; border-radius: 5px; padding: 20px; }
    .header { background-color: #0C4A6E; color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; margin: -20px -20px 20px; }
    .button { display: inline-block; background-color: #0C4A6E; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin: 20px 0; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Financial Growth Cooperative</h2>
    </div>
    <p>Hello ${recipientName},</p>
    <p>You requested a magic link to access the Financial Growth Cooperative admin dashboard.</p>
    <p>Click the button below to log in:</p>
    <p><a href="${magicLink}" class="button">Log In to Admin Dashboard</a></p>
    <p>Or copy and paste this URL into your browser:</p>
    <p><small>${magicLink}</small></p>
    <p>This link will expire on ${expiryTime}.</p>
    <p>If you didn't request this link, please ignore this email.</p>
    <div class="footer">
      <p>Best regards,<br>Financial Growth Cooperative Team</p>
    </div>
  </div>
</body>
</html>
    `,
  }
}
