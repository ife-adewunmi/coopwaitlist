'use client'
import { motion } from 'framer-motion'
import { WaitlistButton } from '@/components/ui/waitlist-button'
import { homeContent } from '@/data/home-content'

export function WaitlistSection() {
  const { waitlistTitle, waitlistDescription } = homeContent

  return (
    <section id="waitlist" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">{waitlistTitle}</h2>
          <p className="mb-8 text-lg text-muted-foreground">{waitlistDescription}</p>
          <WaitlistButton
            size="lg"
            showArrow
            text="Join Our Waitlist"
            className="bg-primary text-white hover:bg-primary-700"
          />
        </motion.div>
      </div>
    </section>
  )
}
