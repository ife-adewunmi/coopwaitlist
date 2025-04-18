'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WaitlistButton } from '@/components/ui/waitlist-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Shield, Menu, X } from 'lucide-react'
import { SimpleEncryptionStatus } from '@/components/security/simple-encryption-status'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/data/site-config'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="hidden text-xl font-bold sm:inline-block">{siteConfig.name}</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#benefits"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Benefits
          </Link>
          <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <SimpleEncryptionStatus />
          </div>

          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Join waitlist button - desktop */}
          <WaitlistButton asLink className="hidden md:flex" />
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t md:hidden"
          >
            <div className="container flex flex-col gap-4 py-4">
              <Link
                href="#features"
                className="rounded-md px-2 py-2 text-sm hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#benefits"
                className="rounded-md px-2 py-2 text-sm hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link
                href="#about"
                className="rounded-md px-2 py-2 text-sm hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="rounded-md px-2 py-2 text-sm hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <WaitlistButton
                asLink
                className="mt-2 w-full"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
