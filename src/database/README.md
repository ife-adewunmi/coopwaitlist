# Database Setup Guide

This directory contains the database configuration, schema, migrations, and seed scripts for the CoopWaitlist application using Drizzle ORM with PostgreSQL (Neon DB).

## Prerequisites

1. **Neon Database Account**: Sign up at [https://console.neon.tech/](https://console.neon.tech/)
2. **Environment Variables**: Set up your `.env.local` file with the database URL

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Neon database URL from the Neon console and update `.env.local`:
   ```
   DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
   ```

## Available Scripts

### Generate Migration Files
```bash
yarn db:generate
```
Generates migration files based on schema changes.

### Run Migrations
```bash
yarn db:migrate
```
Applies pending migrations to the database.

### Seed Database
```bash
yarn db:seed
```
Seeds the database with existing data from JSON files. This will:
- Read data from `src/data/registrations.json`
- Transform and insert it into the database
- Create a backup of the JSON file

### Database Studio
```bash
yarn db:studio
```
Opens Drizzle Studio for visual database management.

### Push Schema (Development)
```bash
yarn db:push
```
Pushes schema changes directly to the database (for development only).

### Reset Database
```bash
yarn db:reset
```
Clears all data from the database.

## Migration Workflow

1. **Initial Setup**:
   ```bash
   # Generate initial migration
   yarn db:generate
   
   # Apply migration to database
   yarn db:migrate
   
   # Seed with existing data
   yarn db:seed
   ```

2. **Schema Changes**:
   ```bash
   # After modifying schema files
   yarn db:generate
   yarn db:migrate
   ```

## Directory Structure

```
src/database/
├── README.md              # This file
├── drizzle.config.ts      # Drizzle configuration
├── connection.ts          # Database connection setup
├── index.ts              # Main exports
├── schema/               # Database schema definitions
│   ├── index.ts          # Schema exports
│   └── registrations.ts  # Registrations table schema
├── migrations/           # Generated migration files
├── scripts/              # Database scripts
│   └── migrate.ts        # Migration runner
└── seeds/                # Seed scripts
    └── index.ts          # Main seed script
```

## Schema Overview

### Registrations Table
- **Primary Fields**: id, name, email, whatsapp, gender, ageBracket, state, city, occupation
- **Encrypted Fields**: email and whatsapp are stored encrypted with IV fields
- **Questionnaire Fields**: Optional fields for user questionnaire responses
- **Timestamps**: createdAt, updatedAt, registrationDate

## Security Notes

- Email and WhatsApp numbers are encrypted before storage
- The encryption IV (Initialization Vector) is stored separately
- Use environment variables for sensitive configuration
- Never commit `.env.local` to version control

## Troubleshooting

### Common Issues

1. **Connection Error**: Verify your DATABASE_URL is correct
2. **Migration Fails**: Check if the database exists and is accessible
3. **Seed Fails**: Ensure the JSON file exists and has valid data

### Logs
All scripts provide detailed logging with emojis for easy identification:
- 🚀 Starting operations
- ✅ Successful operations
- ❌ Errors
- 📊 Data information
- 💾 Backup operations
