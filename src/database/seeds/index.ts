#!/usr/bin/env tsx

import { db } from '../connection'
import { registrations } from '../schema/registrations'
import fs from 'fs'
import path from 'path'

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
  registrationDate: string
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
    const transformedData = existingRegistrations.map((reg) => ({
      id: reg.id,
      name: reg.name,
      email: reg.email,
      emailIv: reg.emailIv || null,
      whatsapp: reg.whatsapp,
      whatsappIv: reg.whatsappIv || null,
      gender: reg.gender,
      ageBracket: reg.ageBracket,
      state: reg.state,
      city: reg.city,
      occupation: reg.occupation,
      registrationDate: new Date(reg.registrationDate),
      financialGoal: reg.financialGoal || null,
      currentFocus: reg.currentFocus || null,
      decisionValue: reg.decisionValue || null,
      investmentInterest: reg.investmentInterest ? JSON.stringify(reg.investmentInterest) : null,
      riskTolerance: reg.riskTolerance || null,
      timeHorizon: reg.timeHorizon || null,
    }))

    
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
    
      }
    }

    console.log(`🎉 Successfully seeded ${insertedCount} registrations from JSON file!`)

    
    const backupPath = path.join(process.cwd(), 'src/data/registrations.json.backup')
    fs.copyFileSync(jsonPath, backupPath)
    console.log(`💾 Created backup at: ${backupPath}`)

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

async function clearDatabase() {
  console.log('🗑️  Clearing database...')

  try {
    await db.delete(registrations)
    console.log('✅ Database cleared successfully!')
  } catch (error) {
    console.error('❌ Failed to clear database:', error)
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

if (require.main === module) {
  runSeed()
}

export { seedFromJson, clearDatabase, runSeed }
