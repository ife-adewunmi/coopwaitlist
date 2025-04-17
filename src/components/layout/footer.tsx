'use client'
import Link from 'next/link'
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig, contactInfo, footerSections, socialLinks } from '@/data/site-config'
import { Button } from '@/components/ui/button'
import { TestId } from '@/src/lib/test/test-ids'

export interface FooterProps {
  testId?: string
}

export const Footer: React.FC<FooterProps> = ({ testId }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-600 text-white" data-testid={testId || TestId.footer}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:col-span-4"
          >
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <h3 className="text-xl font-bold">{siteConfig.name}</h3>
            </div>
            <p className="mb-6 text-white/80">
              Empowering individuals and communities through collective growth, support, and
              prosperity. Together, we build financial freedom.
            </p>
            <div className="mt-auto flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition-colors hover:text-white"
                >
                  <span className="sr-only">{link.platform}</span>
                  {link.platform === 'Twitter' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  )}
                  {link.platform === 'Instagram' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  )}
                  {link.platform === 'LinkedIn' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  )}
                  {link.platform === 'Facebook' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="md:col-span-2"
            >
              <h3 className="mb-4 text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-white/80">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 transition-colors hover:text-white"
                      {...(link?.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.title}
                      {link?.href && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
          >
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
            <Button variant="secondary" className="mt-4" asChild>
              <Link href="mailto:hello@growthcooperative.com">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-white/60">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-white/40">A project by {siteConfig.organizationName}</p>
        </div>
      </div>
    </footer>
  )
}
