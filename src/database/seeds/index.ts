#!/usr/bin/env tsx

import { config } from 'dotenv'
import { db } from '../connection'
import { registrations } from '../schema/registrations'
import fs from 'fs'
import path from 'path'

// Load environment variables
config({ path: '.env.local' })

interface JsonRegistration {
  id: string
  name: string
  email: string
  emailIv?: string
  whatsapp: string
  whatsappIv?: string
  gender: string
  ageBracket: string
  state: string
  city: string
  occupation: string
  registrationDate?: string
  createdAt?: string  // Alternative field name
  financialGoal?: string
  currentFocus?: string
  decisionValue?: string
  investmentInterest?: string[]
  riskTolerance?: string
  timeHorizon?: string
}

async function seedFromJson() {
  console.log('🌱 Starting database seeding from JSON...')

  try {
    // Read the existing JSON file
    const jsonPath = path.join(process.cwd(), 'src/data/registrations.json')

    if (!fs.existsSync(jsonPath)) {
      console.log('📄 No existing JSON file found, skipping seed.')
      return
    }

    const jsonData = fs.readFileSync(jsonPath, 'utf8')
    const existingRegistrations: JsonRegistration[] = JSON.parse(jsonData)

    console.log(`📊 Found ${existingRegistrations.length} registrations in JSON file`)

    if (existingRegistrations.length === 0) {
      console.log('📄 No registrations to migrate.')
      return
    }

    // Transform and insert data
    const transformedData = existingRegistrations.map((reg) => {
      // Handle different date field names and formats
      const dateString = reg.registrationDate || reg.createdAt || new Date().toISOString()
      const registrationDate = new Date(dateString)

      // Validate the date
      if (isNaN(registrationDate.getTime())) {
        console.warn(`Invalid date for registration ${reg.id}, using current date`)
        registrationDate.setTime(Date.now())
      }

      return {
        id: reg.id,
        name: reg.name,
        email: reg.email,
        emailIv: reg.emailIv || null,
        whatsapp: reg.whatsapp,
        whatsappIv: reg.whatsappIv || null,
        gender: reg.gender,
        ageBracket: reg.ageBracket || '',
        state: reg.state,
        city: reg.city,
        occupation: reg.occupation,
        registrationDate,
        financialGoal: reg.financialGoal || null,
        currentFocus: reg.currentFocus || null,
        decisionValue: reg.decisionValue || null,
        investmentInterest: reg.investmentInterest ? JSON.stringify(reg.investmentInterest) : null,
        riskTolerance: reg.riskTolerance || null,
        timeHorizon: reg.timeHorizon || null,
      }
    })

    // Insert data in batches to avoid overwhelming the database
    const batchSize = 50
    let insertedCount = 0

    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize)

      try {
        await db.insert(registrations).values(batch).onConflictDoNothing()
        insertedCount += batch.length
        console.log(`✅ Inserted batch ${Math.ceil((i + 1) / batchSize)} (${insertedCount}/${transformedData.length} records)`)
      } catch (error) {
        console.error(`❌ Error inserting batch ${Math.ceil((i + 1) / batchSize)}:`, error)
        // Continue with next batch
      }
    }

    console.log(`🎉 Successfully seeded ${insertedCount} registrations from JSON file!`)


  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

async function runSeed() {
  try {
    await seedFromJson()
    console.log('✅ Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run seed if this script is executed directly
if (require.main === module) {
  runSeed()
}

export { seedFromJson, runSeed }