import { magicLinkTemplate } from "./magic-link"
import { welcomeTemplate } from "./welcome"
import { contactFormTemplate } from "./contact-form"
import { newsletterTemplate } from "./newsletter"
import { notificationTemplate } from "./notification"

// Export all email templates
export const emailTemplates = {
  magicLink: magicLinkTemplate,
  welcome: welcomeTemplate,
  contactForm: contactFormTemplate,
  newsletter: newsletterTemplate,
  notification: notificationTemplate,
}

// Template type definition
export type EmailTemplateType = keyof typeof emailTemplates

