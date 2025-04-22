'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WaitlistButton } from '@/components/ui/waitlist-button'
import { ArrowRight } from 'lucide-react'
import { homeContent } from '@/data/home-content'
import { TestId } from '@/lib/test/test-ids'

export interface HeroSectionProps {
  testId?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ testId }) => {
  const { hero } = homeContent

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-primary-600 to-primary-700 py-20 md:py-28"
      data-testid={testId || TestId.hero}
    >
      <div className="bg-grid-pattern-light bg-grid-8 absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {hero.headline}{' '}
              <span className="text-accent">
                {hero.subheadline.split(' ').slice(0, 2).join(' ')}
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-white/90 md:text-xl">{hero.subheadline}</p>
            <div className="mb-8 flex flex-wrap gap-4">
              {hero.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-3 w-3 rounded-full bg-accent"></div>
                  <span>{highlight}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <WaitlistButton
                size="lg"
                showArrow
                text={hero.ctaText}
                className="bg-accent text-white hover:bg-accent-600"
              />
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href={hero.secondaryCtaUrl}>{hero.secondaryCtaText}</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl"></div>
              <svg
                className="relative z-10 w-full"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="200"
                  fill="currentColor"
                  className="text-primary-foreground/10"
                />
                <path
                  d="M360 170C360 170 310 120 250 120C190 120 140 170 140 170"
                  stroke="currentColor"
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="text-accent"
                />
                <path
                  d="M140 330C140 330 190 380 250 380C310 380 360 330 360 330"
                  stroke="currentColor"
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="text-secondary"
                />
                <circle cx="140" cy="250" r="40" fill="currentColor" className="text-white" />
                <circle cx="250" cy="250" r="40" fill="currentColor" className="text-accent" />
                <circle cx="360" cy="250" r="40" fill="currentColor" className="text-secondary" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
