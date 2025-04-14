import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { sendWelcomeEmail } from "@/lib/email"
import { Registration } from "@/lib/types/registration"

// Path to the JSON file
const dataFilePath = path.join(process.cwd(), "src/data", "registrations.json")

// Ensure the data directory exists
const ensureDirectoryExists = (filePath: string) => {
  const dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    try {
      fs.mkdirSync(dirname, { recursive: true })
    } catch (error) {
      console.error("Error creating directory:", error)
      throw new Error(`Failed to create directory: ${dirname}`)
    }
  }
}

// Encrypt sensitive data
const encryptData = (text: string) => {
  try {
    // Use the environment variable for encryption
    const encryptionKey = process.env.ENCRYPTION_KEY

    if (!encryptionKey) {
      console.error("ENCRYPTION_KEY environment variable is not set")
      throw new Error("Encryption key not available")
    }

    // Create encryption key from environment variable
    const encKey = crypto.scryptSync(encryptionKey, "salt", 32)
    const iv = crypto.randomBytes(16)

    // Encrypt the text
    const cipher = crypto.createCipheriv("aes-256-cbc", encKey, iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")

    return { encrypted, iv: iv.toString("hex") }
  } catch (error) {
    console.error("Encryption error:", error)
    throw new Error(`Failed to encrypt data: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Decrypt sensitive data
const decryptData = (encrypted: string, iv: string) => {
  try {
    // Use the environment variable for decryption
    const encryptionKey = process.env.ENCRYPTION_KEY

    if (!encryptionKey) {
      console.error("ENCRYPTION_KEY environment variable is not set")
      throw new Error("Encryption key not available")
    }

    // Create encryption key from environment variable
    const encKey = crypto.scryptSync(encryptionKey, "salt", 32)

    // Decrypt the text
    const decipher = crypto.createDecipheriv("aes-256-cbc", encKey, Buffer.from(iv, "hex"))
    let decrypted = decipher.update(encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  } catch (error) {
    console.error("Decryption error:", error)
    return "[Encrypted]" // Return a placeholder for encrypted data
  }
}

// Rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10
const ipRequests: Record<string, { count: number; resetTime: number }> = {}

// Check rate limit
const checkRateLimit = (ip: string) => {
  const now = Date.now()

  // Initialize or reset if window has passed
  if (!ipRequests[ip] || now > ipRequests[ip].resetTime) {
    ipRequests[ip] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
  }

  // Increment count
  ipRequests[ip].count++

  // Check if over limit
  return ipRequests[ip].count <= MAX_REQUESTS_PER_WINDOW
}

// Check if email already exists in registrations
const emailExists = (registrations: any[], email: string) => {
  // For each registration, decrypt the email and compare
  return registrations.some((reg) => {
    if (reg.email && reg.emailIv) {
      try {
        const decryptedEmail = decryptData(reg.email, reg.emailIv)
        return decryptedEmail.toLowerCase() === email.toLowerCase()
      } catch (error) {
        console.error("Error decrypting email for comparison:", error)
        return false
      }
    }
    return false
  })
}

// Get all registrations
export async function GET(request: Request) {
  try {
    console.log(dataFilePath);
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 })
    }

    try {
      ensureDirectoryExists(dataFilePath)
    } catch (error) {
      console.error("Directory creation error:", error)
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Check if file exists, if not create it with empty array
    if (!fs.existsSync(dataFilePath)) {
      try {
        fs.writeFileSync(dataFilePath, JSON.stringify([]))
      } catch (error) {
        console.error("Error creating file:", error)
        return NextResponse.json({ error: "Failed to initialize data storage" }, { status: 500 })
      }
      return NextResponse.json([])
    }

    // Read the file
    let fileContents
    try {
      fileContents = fs.readFileSync(dataFilePath, "utf8")
    } catch (error) {
      console.error("Error reading file:", error)
      return NextResponse.json({ error: "Failed to read registration data" }, { status: 500 })
    }

    // Parse JSON
    let registrations
    try {
      registrations = JSON.parse(fileContents)
    } catch (error) {
      console.error("Error parsing JSON:", error)
      return NextResponse.json({ error: "Data format error" }, { status: 500 })
    }

    // Decrypt sensitive data before sending to client
    const decryptedRegistrations = registrations.map((reg: any) => {
      try {
        // Only decrypt if the data is in encrypted format
        const decryptedReg = { ...reg }

        if (reg.email && reg.emailIv) {
          decryptedReg.email = decryptData(reg.email, reg.emailIv)
          // Remove the IV from the response
          delete decryptedReg.emailIv
        }

        if (reg.whatsapp && reg.whatsappIv) {
          decryptedReg.whatsapp = decryptData(reg.whatsapp, reg.whatsappIv)
          // Remove the IV from the response
          delete decryptedReg.whatsappIv
        }

        return decryptedReg
      } catch (error) {
        console.error("Error decrypting registration:", error)
        return reg
      }
    })

    return NextResponse.json(decryptedRegistrations)
  } catch (error) {
    console.error("Error reading registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}

// Add a new registration
export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 })
    }

    // Check CSRF token
    const csrfToken = request.headers.get("x-csrf-token")
    if (!csrfToken) {
      return NextResponse.json({ error: "CSRF token missing" }, { status: 403 })
    }

    // Parse request body
    let registration: Registration
    try {
      registration = await request.json()
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    // Validate the registration data
    if (
      !registration.name ||
      !registration.email ||
      !registration.whatsapp ||
      !registration.gender ||
      !registration.ageBracket ||
      !registration.state ||
      !registration.city ||
      !registration.occupation
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    try {
      ensureDirectoryExists(dataFilePath)
    } catch (error) {
      console.error("Directory creation error:", error)
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Read existing registrations or create empty array
    let registrations = []
    if (fs.existsSync(dataFilePath)) {
      try {
        const fileContents = fs.readFileSync(dataFilePath, "utf8")
        registrations = JSON.parse(fileContents)
      } catch (error) {
        console.error("Error reading or parsing existing data:", error)
        return NextResponse.json({ error: "Failed to read existing data" }, { status: 500 })
      }
    }

    // Check if email already exists
    if (emailExists(registrations, registration.email)) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }, // 409 Conflict
      )
    }

    // Encrypt sensitive data
    let encryptedEmail, emailIv, encryptedWhatsapp, whatsappIv
    try {
      const emailResult = encryptData(registration.email)
      encryptedEmail = emailResult.encrypted
      emailIv = emailResult.iv

      const whatsappResult = encryptData(registration.whatsapp)
      encryptedWhatsapp = whatsappResult.encrypted
      whatsappIv = whatsappResult.iv
    } catch (error) {
      console.error("Encryption error:", error)
      return NextResponse.json({ error: "Failed to encrypt sensitive data" }, { status: 500 })
    }

    // Add the new registration with a unique ID and encrypted data
    const newRegistration = {
      ...registration,
      email: encryptedEmail,
      emailIv: emailIv,
      whatsapp: encryptedWhatsapp,
      whatsappIv: whatsappIv,
      id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      registrationDate: registration.registrationDate || new Date().toISOString(),
    }

    registrations.push(newRegistration)

    // Write back to the file
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(registrations, null, 2))
    } catch (error) {
      console.error("Error writing to file:", error)
      return NextResponse.json({ error: "Failed to save registration data" }, { status: 500 })
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(registration.name, registration.email)
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Registration added successfully",
    })
  } catch (error) {
    console.error("Error adding registration:", error)
    return NextResponse.json(
      { error: "Failed to add registration: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 },
    )
  }
}
