interface NewsletterTemplateProps {
  recipientName?: string
  recipientEmail: string
  subject: string
  content: string
  unsubscribeLink: string
}

export function newsletterTemplate({
  recipientName,
  recipientEmail,
  subject,
  content,
  unsubscribeLink,
}: NewsletterTemplateProps) {
  const greeting = recipientName ? `Hello ${recipientName},` : "Hello,"

  return {
    subject,
    text: `
${greeting}

${content}

To unsubscribe from future newsletters, click here: ${unsubscribeLink}

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
    .content { margin-bottom: 30px; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 20px; }
    .unsubscribe { font-size: 11px; color: #999; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Financial Growth Cooperative</h2>
    </div>
    <p>${greeting}</p>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>Best regards,<br>Financial Growth Cooperative Team</p>
      <p class="unsubscribe">To unsubscribe from future newsletters, <a href="${unsubscribeLink}">click here</a>.</p>
      <p>Email: ${recipientEmail}</p>
    </div>
  </div>
</body>
</html>
    `,
  }
}

