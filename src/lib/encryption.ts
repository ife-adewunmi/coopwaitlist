import crypto from 'crypto'

// Utility function to check if encryption is properly configured
export async function checkEncryption() {
  try {
    const encryptionKey = process.env.ENCRYPTION_KEY

    if (!encryptionKey) {
      return {
        success: false,
        message: 'ENCRYPTION_KEY environment variable is not set',
      }
    }

    // Test encryption with a simple string
    const testText = 'test-encryption'

    // Create encryption key
    const encKey = crypto.scryptSync(encryptionKey, 'salt', 32)
    const iv = crypto.randomBytes(16)

    // Encrypt
    const cipher = crypto.createCipheriv('aes-256-cbc', encKey, iv)
    let encrypted = cipher.update(testText, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    // Decrypt
    const decipher = crypto.createDecipheriv('aes-256-cbc', encKey, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    // Check if decryption was successful
    if (decrypted === testText) {
      return {
        success: true,
        message: 'Encryption is properly configured',
      }
    } else {
      return {
        success: false,
        message: 'Encryption test failed: decrypted text does not match original',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Encryption error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

// Encrypt data
export function encryptData(text: string) {
  try {
    const encryptionKey = process.env.ENCRYPTION_KEY

    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY environment variable is not set')
    }

    const encKey = crypto.scryptSync(encryptionKey, 'salt', 32)
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', encKey, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return {
      success: true,
      encrypted,
      iv: iv.toString('hex'),
    }
  } catch (error) {
    console.error('Encryption error:', error)
    return {
      success: false,
      error: `Failed to encrypt: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

// Decrypt data
export function decryptData(encrypted: string, iv: string) {
  try {
    const encryptionKey = process.env.ENCRYPTION_KEY

    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY environment variable is not set')
    }

    const encKey = crypto.scryptSync(encryptionKey, 'salt', 32)
    const decipher = crypto.createDecipheriv('aes-256-cbc', encKey, Buffer.from(iv, 'hex'))
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return {
      success: true,
      decrypted,
    }
  } catch (error) {
    console.error('Decryption error:', error)
    return {
      success: false,
      error: `Failed to decrypt: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
