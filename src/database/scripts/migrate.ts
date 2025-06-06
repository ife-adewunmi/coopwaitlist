#!/usr/bin/env tsx

import { migrate } from 'drizzle-orm/neon-http/migrator'
import { db } from '../connection'
import path from 'path'

async function runMigrations() {
  console.log('🚀 Starting database migrations...')
  
  try {
    const migrationsFolder = path.join(process.cwd(), 'src/database/migrations')
    
    await migrate(db, { migrationsFolder })
    
    console.log(`\n📁 Migrations folder: ${migrationsFolder}`)
    console.log('✅ Database migrations completed successfully!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migrations if this script is executed directly
if (require.main === module) {
  runMigrations()
}

export { runMigrations }
