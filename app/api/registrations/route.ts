import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { sendWelcomeEmail } from '@/lib/email'
import { Registration } from '@/lib/types/registration'
import { getRegistrationId } from '@/lib/utils'
import { checkRateLimit } from '@/lib/rate-limiter'
import { decryptData, encryptData } from '@/lib/encryption'

const dataFilePath = path.join(process.cwd(), 'src/data', 'registrations.json')

export const emailExists = (registrations: any[], email: string, excludeId?: string) => {
  return registrations.some((reg) => {
    if (excludeId && reg.id === excludeId) {
      return false
    }

    if (reg.email && reg.emailIv) {
      try {
        const decryptedEmail = decryptData(reg.email, reg.emailIv)
        return decryptedEmail.toLowerCase() === email.toLowerCase()
      } catch (error) {
        console.error('Error decrypting email for comparison:', error)
        return false
      }
    }
    return false
  })
}

export function ensureDirectoryExists() {
  const dirname = path.dirname(dataFilePath)
  if (!fs.existsSync(dirname)) {
    try {
      fs.mkdirSync(dirname, { recursive: true })
    } catch (error) {
      console.error('Error creating directory:', error)
      throw new Error(`Failed to create directory: ${dirname}`)
    }
  }
}

export function readRegistrations() {
  try {
    ensureDirectoryExists()
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]))
      return []
    }
    const fileContents = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading registrations:', error)
    return NextResponse.json({ error: 'Failed to read registration data' }, { status: 500 })
  }
}

export function writeRegistrations(registrations: any[]) {
  try {
    ensureDirectoryExists()
    fs.writeFileSync(dataFilePath, JSON.stringify(registrations, null, 2))
  } catch (error) {
    console.error('Error writing registrations:', error)
    throw new Error('Failed to save registration data')
  }
}

// Get all registrations
export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later' },
        { status: 429 },
      )
    }

    const registrations = readRegistrations()

    const decryptedRegistrations = registrations.map((reg: any) => {
      const decryptedReg = { ...reg }

      // Decrypt email if it exists
      if (reg.email && reg.emailIv) {
        decryptedReg.email = decryptData(reg.email, reg.emailIv)
        delete decryptedReg.emailIv
      }

      // Decrypt whatsapp if it exists
      if (reg.whatsapp && reg.whatsappIv) {
        decryptedReg.whatsapp = decryptData(reg.whatsapp, reg.whatsappIv)
        delete decryptedReg.whatsappIv
      }

      return decryptedReg
    })

    return NextResponse.json(decryptedRegistrations)
  } catch (error) {
    console.error('Error reading registrations:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}

// Add a new registration with optional questionnaire answers
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later' },
        { status: 429 },
      )
    }

    const csrfToken = request.headers.get('x-csrf-token')
    if (!csrfToken) {
      return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 })
    }

    const data = await request.json()
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const registrations = readRegistrations()
    if (emailExists(registrations, data.email)) {
      return NextResponse.json({ error: 'This email is already registered' }, { status: 409 })
    }

    // Extract registration base data
    const registrationBase = {
      id: data.id || getRegistrationId(),
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp || '',
      gender: data.gender,
      ageBracket: data.ageBracket,
      state: data.state,
      city: data.city,
      occupation: data.occupation,
      createdAt: new Date().toISOString(),
    }

    // Encrypt sensitive data
    const emailResult = encryptData(data.email)
    const whatsappResult = encryptData(data.whatsapp || '')

    // Create registration object with encrypted data
    const newRegistration = {
      ...registrationBase,
      email: emailResult.encrypted,
      emailIv: emailResult.iv,
      whatsapp: whatsappResult.encrypted,
      whatsappIv: whatsappResult.iv,
    }

    // Add questionnaire answers if they exist
    const questionnaireFields = [
      'financialGoal',
      'currentFocus',
      'decisionValue',
      'investmentInterest',
      'riskTolerance',
      'timeHorizon',
    ]

    questionnaireFields.forEach((field) => {
      if (field in data) {
        ;(newRegistration as any)[field] = data[field]
      }
    })

    registrations.push(newRegistration)
    writeRegistrations(registrations)

    try {
      await sendWelcomeEmail(data.name, data.email)
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Registration completed successfully',
      id: newRegistration.id,
    })
  } catch (error) {
    console.error('Error adding registration:', error)
    return NextResponse.json(
      {
        error: `Failed to add registration: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    )
  }
}

// Update an existing registration
export async function PATCH(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later' },
        { status: 429 },
      )
    }

    const csrfToken = request.headers.get('x-csrf-token')
    if (!csrfToken) {
      return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 })
    }

    const updateData = await request.json()
    const { id, ...dataToUpdate } = updateData

    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ error: 'Invalid or missing registration ID' }, { status: 400 })
    }

    const registrations = readRegistrations()
    const registrationIndex = registrations.findIndex((reg: any) => reg.id === id)
    if (registrationIndex === -1) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    const existingRegistration = registrations[registrationIndex]

    // Check for email uniqueness if updating email
    if (
      dataToUpdate.email &&
      dataToUpdate.email !== decryptData(existingRegistration.email, existingRegistration.emailIv)
    ) {
      if (emailExists(registrations, dataToUpdate.email, id)) {
        return NextResponse.json({ error: 'This email is already registered' }, { status: 409 })
      }
    }

    const updatedRegistration = { ...existingRegistration }

    // Update and encrypt sensitive fields if present
    if (dataToUpdate.email) {
      const emailResult = encryptData(dataToUpdate.email)
      updatedRegistration.email = emailResult.encrypted
      updatedRegistration.emailIv = emailResult.iv
    }

    if (dataToUpdate.whatsapp) {
      const whatsappResult = encryptData(dataToUpdate.whatsapp)
      updatedRegistration.whatsapp = whatsappResult.encrypted
      updatedRegistration.whatsappIv = whatsappResult.iv
    }

    // Update all other applicable fields
    const fieldsToUpdate = [
      'name',
      'gender',
      'ageBracket',
      'state',
      'city',
      'occupation',
      'financialGoal',
      'currentFocus',
      'decisionValue',
      'investmentInterest',
      'riskTolerance',
      'timeHorizon',
    ]

    fieldsToUpdate.forEach((field) => {
      if (field in dataToUpdate) {
        updatedRegistration[field] = dataToUpdate[field]
      }
    })

    updatedRegistration.lastUpdated = new Date().toISOString()
    registrations[registrationIndex] = updatedRegistration
    writeRegistrations(registrations)

    return NextResponse.json({
      success: true,
      message: 'Registration updated successfully',
    })
  } catch (error) {
    console.error('Error updating registration:', error)
    return NextResponse.json(
      {
        error: `Failed to update registration: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    )
  }
}
