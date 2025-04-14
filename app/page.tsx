import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PurposeSection } from "@/components/home/purpose-section"
import { WaitlistSection } from "@/components/home/waitlist-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { siteConfig } from "@/data/site-config"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  themeColor: siteConfig.themeColor,
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <Header title={siteConfig.name} />

      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <PurposeSection />
      <BenefitsSection />
      <WaitlistSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
