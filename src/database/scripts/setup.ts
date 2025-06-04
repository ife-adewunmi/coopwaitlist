

import { runMigrations } from './migrate'
import { seedFromJson } from '../seeds'

async function setupDatabase() {
  console.log('🚀 Starting complete database setup...')
  
  try {
    
    console.log('\n📋 Step 1: Running migrations...')
    await runMigrations()
    
    
    console.log('\n🌱 Step 2: Seeding database...')
    await seedFromJson()
    
    console.log('\n🎉 Database setup completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Update your API routes to use the database instead of JSON files')
    console.log('   2. Test the application to ensure everything works correctly')
    console.log('   3. Consider removing or archiving the JSON files once migration is confirmed')
    
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Database setup failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  setupDatabase()
}

export { setupDatabase }
