'use client'

import { ArrowRight } from 'lucide-react'
import { TestId } from '@/lib/test/test-ids'
import { motion } from 'framer-motion'
import { homeContent } from '@/data/home-content'
import { WaitlistButton } from '../waitlist/waitlist-button'

interface WaitlistSectionProps {
  className?: string
  testId?: string
}

export function WaitlistSection({ className, testId }: WaitlistSectionProps) {
  const { waitlistTitle, waitlistDescription } = homeContent

  return (
    <section
      id="waitlist"
      className={`py-16 ${className || ''}`}
      data-testid={testId || TestId.waitlist}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="mb-8 text-4xl font-bold text-primary lg:text-5xl">{waitlistTitle}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            {waitlistDescription}
          </p>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
            <WaitlistButton
              size="lg"
              label={'Join Our Waitlist'}
              icon={<ArrowRight className="ml-2 h-4 w-4" />}
              className="bg-primary text-white hover:bg-primary-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
