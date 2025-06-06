import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'
import { Registration } from '@/lib/types/registration'
import { getRegistrationId } from '@/lib/utils'
import { checkRateLimit } from '@/lib/rate-limiter'
import { decryptData, encryptData } from '@/lib/encryption'
import { db } from '@/src/database'
import { registrations } from '@/src/database/schema/registrations'
import { eq } from 'drizzle-orm'

export const emailExists = async (email: string, excludeId?: string) => {
  try {
    const allRegistrations = await db.select().from(registrations)

    return allRegistrations.some((reg) => {
      if (excludeId && reg.id === excludeId) {
        return false
      }

      if (reg.email && reg.emailIv) {
        try {
          const decryptedEmail = decryptData(reg.email, reg.emailIv)
          // Only compare if decryption was successful (not '[Encrypted]')
          if (decryptedEmail !== '[Encrypted]') {
            return decryptedEmail.toLowerCase() === email.toLowerCase()
          }
        } catch (error) {
          console.error('Error decrypting email for comparison:', error)
          // If decryption fails, skip this record for comparison
        }
      }
      return false
    })
  } catch (error) {
    console.error('Error checking email existence:', error)
    return false
  }
}

// Database functions to replace file operations
export async function readRegistrations() {
  try {
    return await db.select().from(registrations)
  } catch (error) {
    console.error('Error reading registrations from database:', error)
    throw new Error('Failed to read registration data')
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

    const registrationsData = await readRegistrations()

    const decryptedRegistrations = registrationsData.map((reg: any) => {
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

    // Check if email already exists
    if (await emailExists(data.email)) {
      return NextResponse.json({ error: 'This email is already registered' }, { status: 409 })
    }

    // Encrypt sensitive data
    const emailResult = encryptData(data.email)
    const whatsappResult = encryptData(data.whatsapp || '')

    // Check if encryption was successful
    if (!emailResult.success || !whatsappResult.success) {
      console.error('Encryption failed:', emailResult.error || whatsappResult.error)
      return NextResponse.json({ error: 'Encryption failed. Please check server configuration.' }, { status: 500 })
    }

    // Create registration object with encrypted data
    const newRegistration = {
      id: data.id || getRegistrationId(),
      name: data.name,
      email: emailResult.encrypted!,
      emailIv: emailResult.iv!,
      whatsapp: whatsappResult.encrypted!,
      whatsappIv: whatsappResult.iv!,
      gender: data.gender,
      ageBracket: data.ageBracket || '',
      state: data.state,
      city: data.city,
      occupation: data.occupation,
      registrationDate: new Date(),
      // Questionnaire fields
      financialGoal: data.financialGoal || null,
      currentFocus: data.currentFocus || null,
      decisionValue: data.decisionValue || null,
      investmentInterest: data.investmentInterest ? JSON.stringify(data.investmentInterest) : null,
      riskTolerance: data.riskTolerance || null,
      timeHorizon: data.timeHorizon || null,
    }

    // Save to database
    await db.insert(registrations).values(newRegistration)

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

    // Find existing registration
    const existingRegistrations = await db.select().from(registrations).where(eq(registrations.id, id))
    if (existingRegistrations.length === 0) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    const existingRegistration = existingRegistrations[0]

    // Check for email uniqueness if updating email
    if (
      dataToUpdate.email &&
      existingRegistration.emailIv &&
      dataToUpdate.email !== decryptData(existingRegistration.email, existingRegistration.emailIv)
    ) {
      if (await emailExists(dataToUpdate.email, id)) {
        return NextResponse.json({ error: 'This email is already registered' }, { status: 409 })
      }
    }

    // Prepare update data
    const updateFields: any = {}

    // Update and encrypt sensitive fields if present
    if (dataToUpdate.email) {
      const emailResult = encryptData(dataToUpdate.email)
      updateFields.email = emailResult.encrypted
      updateFields.emailIv = emailResult.iv
    }

    if (dataToUpdate.whatsapp) {
      const whatsappResult = encryptData(dataToUpdate.whatsapp)
      updateFields.whatsapp = whatsappResult.encrypted
      updateFields.whatsappIv = whatsappResult.iv
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
        updateFields[field] = dataToUpdate[field]
      }
    })

    updateFields.updatedAt = new Date()

    // Update in database
    await db.update(registrations).set(updateFields).where(eq(registrations.id, id))

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
