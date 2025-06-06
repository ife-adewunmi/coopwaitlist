import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const registrations = pgTable('registrations', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: text('email').notNull(), // Encrypted email
  emailIv: varchar('email_iv', { length: 32 }), // Encryption IV for email
  whatsapp: text('whatsapp').notNull(), // Encrypted WhatsApp number
  whatsappIv: varchar('whatsapp_iv', { length: 32 }), // Encryption IV for WhatsApp
  gender: varchar('gender', { length: 10 }).notNull(),
  ageBracket: varchar('age_bracket', { length: 20 }).notNull(),
  state: varchar('state', { length: 50 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  occupation: varchar('occupation', { length: 100 }).notNull(),
  registrationDate: timestamp('registration_date').notNull(),

  // Questionnaire fields (optional)
  financialGoal: text('financial_goal'),
  currentFocus: text('current_focus'),
  decisionValue: text('decision_value'),
  investmentInterest: text('investment_interest'), // JSON array stored as text
  riskTolerance: varchar('risk_tolerance', { length: 50 }),
  timeHorizon: varchar('time_horizon', { length: 50 }),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type InsertRegistration = typeof registrations.$inferInsert
export type SelectRegistration = typeof registrations.$inferSelect