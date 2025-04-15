// Common content types
export interface SiteConfig {
  name: string
  organizationName: string
  description: string
  url: string
  ogImage?: string
  keywords: string[]
  themeColor: string
}

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}
