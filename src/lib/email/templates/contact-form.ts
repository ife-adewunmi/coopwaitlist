interface ContactFormTemplateProps {
  name: string
  email: string
  message: string
  subject?: string
}

export function contactFormTemplate({
  name,
  email,
  message,
  subject = "Contact Form Submission",
}: ContactFormTemplateProps) {
  return {
    subject: `[Contact Form] ${subject}`,
    text: `
New contact form submission:

Name: ${name}
Email: ${email}
Message:
${message}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .container { border: 1px solid #e0e0e0; border-radius: 5px; padding: 20px; }
    .header { background-color: #0C4A6E; color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; margin: -20px -20px 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; }
    .message { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="field">
      <div class="label">Name:</div>
      <div>${name}</div>
    </div>
    <div class="field">
      <div class="label">Email:</div>
      <div>${email}</div>
    </div>
    <div class="field">
      <div class="label">Message:</div>
      <div class="message">${message.replace(/\n/g, "<br>")}</div>
    </div>
  </div>
</body>
</html>
    `,
  }
}

