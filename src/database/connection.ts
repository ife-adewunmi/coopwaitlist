import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

// Load environment variables
config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

// Create the connection
const sql = neon(process.env.DATABASE_URL)

// Create the database instance
export const db = drizzle(sql, { schema })

// Export the connection for direct SQL queries if needed
export { sql }
