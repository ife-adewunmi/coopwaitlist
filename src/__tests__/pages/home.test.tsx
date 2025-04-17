import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { TestId } from '@/lib/test/test-ids'

// Mock the components with jest.fn()
jest.mock('@/components/layout/header', () => ({
  Header: jest.fn((props) => {
    const { title, testId } = props
    return <header title={title} data-testid={testId || TestId.navigation.main} />
  }),
}))

jest.mock('@/components/layout/footer', () => ({
  Footer: jest.fn((props) => {
    const { testId } = props
    return <footer data-testid={testId || TestId.footer}>Footer</footer>
  }),
}))

jest.mock('@/components/home/hero-section', () => ({
  HeroSection: jest.fn((props) => {
    const { testId } = props
    return <section data-testid={testId || TestId.hero}>Hero Section</section>
  }),
}))

jest.mock('@/components/home/purpose-section', () => ({
  PurposeSection: jest.fn((props) => {
    const { testId } = props
    return <section data-testid={testId || TestId.purpose}>Purpose Section</section>
  }),
}))

jest.mock('@/components/home/benefits-section', () => ({
  BenefitsSection: jest.fn((props) => {
    const { testId } = props
    return <section data-testid={testId || TestId.benefit}>Benefits Section</section>
  }),
}))

jest.mock('@/components/home/waitlist-section', () => ({
  WaitlistSection: jest.fn((props) => {
    const { testId } = props
    return <section data-testid={testId || TestId.waitlist}>Waitlist Section</section>
  }),
}))

describe('Home Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders the main layout with correct data-testid', () => {
    render(<Home />)
    expect(screen.getByTestId(TestId.homePage)).toBeInTheDocument()
  })

  it('renders all content sections in the correct order', () => {
    render(<Home />)

    // Check that all sections are in the document
    expect(screen.getByTestId(TestId.hero)).toBeInTheDocument()
    expect(screen.getByTestId(TestId.purpose)).toBeInTheDocument()
    expect(screen.getByTestId(TestId.benefit)).toBeInTheDocument()
    expect(screen.getByTestId(TestId.waitlist)).toBeInTheDocument()

    // Check section order
    const mainElement = screen.getByTestId(TestId.homePage)
    const childNodes = Array.from(mainElement.childNodes)

    // Get the indexes of each section element
    const headerIndex = childNodes.findIndex(
      (node) => node === screen.getByTestId(TestId.navigation.main),
    )
    const heroIndex = childNodes.findIndex((node) => node === screen.getByTestId(TestId.hero))
    const purposeIndex = childNodes.findIndex((node) => node === screen.getByTestId(TestId.purpose))
    const benefitsIndex = childNodes.findIndex(
      (node) => node === screen.getByTestId(TestId.benefit),
    )
    const waitlistIndex = childNodes.findIndex(
      (node) => node === screen.getByTestId(TestId.waitlist),
    )
    const footerIndex = childNodes.findIndex((node) => node === screen.getByTestId(TestId.footer))

    // Verify the order
    expect(headerIndex).toBeLessThan(heroIndex)
    expect(heroIndex).toBeLessThan(purposeIndex)
    expect(purposeIndex).toBeLessThan(benefitsIndex)
    expect(benefitsIndex).toBeLessThan(waitlistIndex)
    expect(waitlistIndex).toBeLessThan(footerIndex)
  })
})
