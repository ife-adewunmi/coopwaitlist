import type { EmailPayload } from "./index"

// Console email service for development
export async function sendWithConsole(payload: EmailPayload): Promise<{ success: boolean; message?: string }> {
  console.log("\n========== EMAIL SENT (CONSOLE MODE) ==========")
  console.log(`From: ${payload.from?.name} <${payload.from?.email}>`)
  console.log(`To: ${Array.isArray(payload.to) ? payload.to.join(", ") : payload.to}`)
  console.log(`Subject: ${payload.subject}`)
  console.log(`Reply-To: ${payload.replyTo || "Not specified"}`)
  console.log("\nText content:")
  console.log(payload.text)
  console.log("\nHTML content:")
  console.log(payload.html)

  if (payload.attachments && payload.attachments.length > 0) {
    console.log("\nAttachments:")
    payload.attachments.forEach((attachment, index) => {
      console.log(`${index + 1}. ${attachment.filename} (${attachment.contentType || "unknown type"})`)
    })
  }

  console.log("==============================================\n")

  return {
    success: true,
    message: "Email logged to console successfully",
  }
}

