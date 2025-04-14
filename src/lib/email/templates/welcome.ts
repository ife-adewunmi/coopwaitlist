interface WelcomeTemplateProps {
  recipientName: string
  recipientEmail: string
}

export function welcomeTemplate({ recipientName, recipientEmail }: WelcomeTemplateProps) {
  return {
    subject: "Welcome to Financial Growth Cooperative!",
    text: `
Hello ${recipientName},

Thank you for joining the Financial Growth Cooperative waitlist!

We're building Nigeria's most powerful cooperative movement where collective strength unlocks individual potential. By democratizing financial freedom through collective power, we unite communities to access wealth, ignite financial mastery, and fuel entrepreneurial revolutions.

We'll keep you updated on our progress and let you know when we're ready to launch.

If you have any questions, feel free to reply to this email.

Together, we rise!

Best regards,
Financial Growth Cooperative Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Financial Growth Cooperative</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .container { border: 1px solid #e0e0e0; border-radius: 5px; padding: 20px; }
    .header { background-color: #0C4A6E; color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; margin: -20px -20px 20px; }
    .highlight { color: #B45309; font-weight: bold; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Financial Growth Cooperative</h2>
    </div>
    <p>Hello ${recipientName},</p>
    <p>Thank you for joining the <strong>Financial Growth Cooperative</strong> waitlist!</p>
    <p>We're building Nigeria's most powerful cooperative movement where collective strength unlocks individual potential. By democratizing financial freedom through collective power, we unite communities to access wealth, ignite financial mastery, and fuel entrepreneurial revolutions.</p>
    <p>Our approach:</p>
    <ul>
      <li><span class="highlight">Create Impact:</span> We invest in sustainable futures that transform communities.</li>
      <li><span class="highlight">Build Wealth for All:</span> From savings plans to owning real estate properties.</li>
      <li><span class="highlight">Knowledge Unlocked:</span> We transform ordinary savers into strategic investors.</li>
      <li><span class="highlight">Businesses Amplified:</span> We provide mentorship, resources, and capital.</li>
    </ul>
    <p>We'll keep you updated on our progress and let you know when we're ready to launch.</p>
    <p>If you have any questions, feel free to reply to this email.</p>
    <p><strong>Together, we rise!</strong></p>
    <div class="footer">
      <p>Best regards,<br>Financial Growth Cooperative Team</p>
      <p>Email: ${recipientEmail}</p>
    </div>
  </div>
</body>
</html>
    `,
  }
}

