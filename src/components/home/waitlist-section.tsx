'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { WaitlistFormModal } from './waitlist-form-modal'
import { homeContent } from '@/data/home-content'
import { ArrowRight } from 'lucide-react'

export function WaitlistSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white hover:bg-primary-700"
          >
            Join Our Waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <WaitlistFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  )
}
