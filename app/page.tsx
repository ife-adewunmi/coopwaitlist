import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { PurposeSection } from '@/components/home/purpose-section'
import { WaitlistSection } from '@/components/home/waitlist-section'
import { BenefitsSection } from '@/components/home/benefits-section'
import { siteConfig } from '@/data/site-config'
import { createTestProps } from '@/lib/test/test-utils'
import { TestId } from '@/src/lib/test/test-ids'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  themeColor: siteConfig.themeColor,
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col" {...createTestProps(TestId.homePage)}>
      {/* Header */}
      <Header title={siteConfig.name} />

      {/* Hero Section */}
      <HeroSection testId={TestId.hero} />

      {/* Content Sections */}
      <PurposeSection testId={TestId.purpose} />
      <BenefitsSection testId={TestId.benefit} />
      <WaitlistSection testId={TestId.waitlist} />

      {/* Footer */}
      <Footer testId={TestId.footer} />
    </main>
  )
}
