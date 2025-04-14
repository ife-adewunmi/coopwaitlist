interface NotificationTemplateProps {
  recipientName: string
  subject: string
  message: string
  actionText?: string
  actionLink?: string
}

export function notificationTemplate({
  recipientName,
  subject,
  message,
  actionText,
  actionLink,
}: NotificationTemplateProps) {
  const actionButton = actionText && actionLink ? `\n\n${actionText}: ${actionLink}` : ''

  return {
    subject,
    text: `
Hello ${recipientName},

${message}${actionButton}

Best regards,
Financial Growth Cooperative Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
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
    <p>${message}</p>
    ${actionText && actionLink ? `<p><a href="${actionLink}" class="button">${actionText}</a></p>` : ''}
    <div class="footer">
      <p>Best regards,<br>Financial Growth Cooperative Team</p>
    </div>
  </div>
</body>
</html>
    `,
  }
}
