import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

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

// Zod schemas for validation
export const insertRegistrationSchema = createInsertSchema(registrations, {
  email: z.string().email(),
  name: z.string().min(2),
  whatsapp: z.string().min(10),
  gender: z.enum(['male', 'female']),
  ageBracket: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(2),
  occupation: z.string().min(2),
  investmentInterest: z.string().optional(),
})

export const selectRegistrationSchema = createSelectSchema(registrations)

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>
export type SelectRegistration = z.infer<typeof selectRegistrationSchema>
