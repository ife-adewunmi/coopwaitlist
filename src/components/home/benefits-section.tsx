'use client'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { homeContent } from '@/data/home-content'

export function BenefitsSection() {
  const { benefitsTitle, benefitsDescription, benefits } = homeContent

  return (
    <section id="benefits" className="bg-muted/50 py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">{benefitsTitle}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{benefitsDescription}</p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start rounded-lg border border-border bg-card p-5 shadow-sm"
              >
                <CheckCircle className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <svg
            className="w-full max-w-md"
            viewBox="0 0 500 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 100C50 100 150 180 250 100C350 20 450 100 450 100"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-primary"
            />
            <path
              d="M50 150C50 150 150 230 250 150C350 70 450 150 450 150"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-secondary"
            />
            <circle cx="50" cy="100" r="20" fill="currentColor" className="text-accent" />
            <circle cx="250" cy="100" r="20" fill="currentColor" className="text-accent" />
            <circle cx="450" cy="100" r="20" fill="currentColor" className="text-accent" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
