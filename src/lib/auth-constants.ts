import { EnvConfig } from './config/env-config'

// Constants for authentication (no 'use server' directive here)
export const ADMIN_EMAIL = EnvConfig.get().ADMIN_EMAIL || 'admin@example.com'
