import { NextResponse } from 'next/server'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { decryptData } from './encryption'
import fs from 'fs'
import path from 'path'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  })
}

export function getCsrfToken() {
  const csrfToken = Math.random().toString(36).substring(2)
  const metaTag = document.querySelector('meta[name="csrf-token"]')
  return metaTag ? metaTag.getAttribute('content') || '' : csrfToken
}

export const getRegistrationId = (): string => {
  return `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
