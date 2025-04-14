import { UrlObject } from "node:url"

export interface HeroContent {
  headline: string
  subheadline: string
  ctaText: string
  ctaUrl: string
  secondaryCtaText?: string
  secondaryCtaUrl: string | Url
  highlights: string[]
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface BenefitItem {
  title: string
  description: string
}

export interface HomeContent {
  hero: HeroContent
  purposeTitle: string
  purposeDescription: string
  features: FeatureItem[]
  benefitsTitle: string
  benefitsDescription: string
  benefits: BenefitItem[]
  waitlistTitle: string
  waitlistDescription: string
}

type Url = string | UrlObject;
