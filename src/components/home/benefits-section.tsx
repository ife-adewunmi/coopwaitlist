"use client"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { homeContent } from "@/data/home-content"

export function BenefitsSection() {
  const { benefitsTitle, benefitsDescription, benefits } = homeContent

  return (
    <section id="benefits" className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{benefitsTitle}</h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">{benefitsDescription}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start bg-card rounded-lg p-5 shadow-sm border border-border"
              >
                <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                <div>
                  <h3 className="font-semibold text-lg text-card-foreground">{benefit.title}</h3>
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
          <svg className="w-full max-w-md" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
