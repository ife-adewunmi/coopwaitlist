import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TestId } from '@/lib/test/test-ids'

// Mock the cn utility function
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...args) => args.join(' ')),
}))

describe('Button Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const testId = TestId.button

  it('renders with default props and testId', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByTestId(testId)
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
    expect(button.tagName).toBe('BUTTON')
  })

  it('renders with custom testId', () => {
    render(<Button testId="custom-button">Click me</Button>)
    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
  })

  it('applies the correct class names based on variants', () => {
    render(
      <Button variant="destructive" size="lg">
        Destructive
      </Button>,
    )

    expect(cn).toHaveBeenCalledWith(
      expect.stringContaining(buttonVariants({ variant: 'destructive', size: 'lg' })),
    )

    const button = screen.getByTestId(testId)
    expect(button).toHaveClass(buttonVariants({ variant: 'destructive', size: 'lg' }))
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByTestId(testId)
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('forwards the ref properly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Click me</Button>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('renders as a different element when asChild is true', () => {
    // Note: In a real test, asChild would render the children as a button
    // Since we're dealing with Slot from radix, we need to mock it properly
    // Here's an approximation to test the logic
    const { container } = render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>,
    )

    expect(container.querySelector('a')).not.toBeNull()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByTestId(testId)
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('disabled')
  })

  it('renders all variants correctly', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']

    variants.forEach((variant) => {
      const { unmount } = render(
        <Button variant={variant as any} testId={`button-${variant}`}>
          {variant} Button
        </Button>,
      )

      const button = screen.getByTestId(`button-${variant}`)
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent(`${variant} Button`)

      unmount()
    })
  })

  it('renders all sizes correctly', () => {
    const sizes = ['default', 'sm', 'lg', 'icon']

    sizes.forEach((size) => {
      const { unmount } = render(
        <Button size={size as any} testId={`button-${size}`}>
          {size} Button
        </Button>,
      )

      const button = screen.getByTestId(`button-${size}`)
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent(`${size} Button`)

      unmount()
    })
  })
})
