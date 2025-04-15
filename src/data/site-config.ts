import { SiteConfig } from '@/lib/types/content'

export const siteConfig: SiteConfig = {
  name: 'Growth Cooperative',
  organizationName: 'Community Finance Initiative',
  description: "Nigeria's premier cooperative for collective financial growth and prosperity",
  url: 'https://growthcooperative.com',
  keywords: [
    'cooperative society',
    'financial growth',
    'community finance',
    'wealth building',
    'nigeria cooperative',
    'financial freedom',
    'collective investment',
  ],
  themeColor: '#00875A', // Forest Green - represents growth, prosperity, and stability
}

export const contactInfo = {
  email: 'hello@growthcooperative.com',
  phone: '+234 800 123 4567',
  address: 'Lagos, Nigeria',
}

export const footerSections = [
  {
    title: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Our Mission', href: '/mission' },
      { title: 'Team', href: '/team' },
      { title: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Financial Education', href: '/resources' },
      { title: 'Investment Guide', href: '/guide' },
      { title: 'FAQ', href: '/faq' },
      { title: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

export const socialLinks = [
  {
    platform: 'Twitter',
    url: 'https://twitter.com/growthcoop',
    icon: 'twitter',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/growthcoop',
    icon: 'instagram',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/growthcoop',
    icon: 'linkedin',
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/growthcoop',
    icon: 'facebook',
  },
]
