'use client'

import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { PurposeSection } from '@/components/home/purpose-section'
import { BenefitsSection } from '@/components/home/benefits-section'
import { WaitlistSection } from '@/components/home/waitlist-section'
import { siteConfig } from '@/data/site-config'
import { TestId } from '@/lib/test/test-ids'

export default function Home() {
  return (
    <main data-testid={TestId.homePage}>
      <Header title={siteConfig.name} testId={TestId.navigation.main} />
      <HeroSection testId={TestId.hero} />
      <PurposeSection testId={TestId.purpose} />
      <BenefitsSection testId={TestId.benefit} />
      <WaitlistSection testId={TestId.waitlist} />
      <Footer testId={TestId.footer} />
    </main>
  )
}
