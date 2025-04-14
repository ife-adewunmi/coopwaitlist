"use client"
import { motion } from "framer-motion"
import type React from "react"

import { TrendingUp, Users, Lightbulb, Building } from "lucide-react"
import { homeContent } from "@/data/home-content"

export function PurposeSection() {
  const { purposeTitle, purposeDescription, features } = homeContent

  const iconMap: Record<string, React.ReactNode> = {
    "trending-up": <TrendingUp className="h-10 w-10 text-primary" />,
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{purposeTitle}</h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground/80">{purposeDescription}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="mb-4">{iconMap[feature.icon]}</div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
