'use client'
import { motion } from 'framer-motion'
import type React from 'react'

import { TrendingUp, Users, Lightbulb, Building } from 'lucide-react'
import { homeContent } from '@/data/home-content'

export function PurposeSection() {
  const { purposeTitle, purposeDescription, features } = homeContent

  const iconMap: Record<string, React.ReactNode> = {
    'trending-up': <TrendingUp className="h-10 w-10 text-primary" />,
    users: <Users className="h-10 w-10 text-secondary" />,
    lightbulb: <Lightbulb className="h-10 w-10 text-accent" />,
    building: <Building className="h-10 w-10 text-primary" />,
  }

  return (
    <section id="features" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">{purposeTitle}</h2>
          <p className="mx-auto max-w-3xl text-lg text-foreground/80">{purposeDescription}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border border-border bg-card p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-4">{iconMap[feature.icon]}</div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
