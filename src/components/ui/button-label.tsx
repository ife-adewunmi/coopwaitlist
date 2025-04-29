import React from 'react'

type IconPosition = 'left' | 'right'

export interface ButtonIcon {
  icon: React.ReactNode
  iconPosition?: IconPosition
  iconSize?: number
  iconColor?: string
  iconClassName?: string
}

export interface ButtonLabelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | React.ReactNode
  className?: string
  buttonIcon?: ButtonIcon
}

export const ButtonLabel = ({ label, buttonIcon }: ButtonLabelProps) => {
  const {
    icon,
    iconPosition = 'right',
    iconSize = 16,
    iconColor = 'currentColor',
    iconClassName = 'h-4 w-4',
  } = buttonIcon || {}

  const iconStyles = {
    width: iconSize,
    height: iconSize,
    color: iconColor,
  }

  return (
    <>
      {icon && iconPosition === 'left' && (
        <span className={iconClassName} style={iconStyles}>
          {icon}
        </span>
      )}
      {label}
      {icon && iconPosition === 'right' && (
        <span className={iconClassName} style={iconStyles}>
          {icon}
        </span>
      )}
    </>
  )
}
