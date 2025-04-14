import { NextResponse } from "next/server"
import { checkEncryption } from "@/lib/encryption"

export async function GET() {
  try {
    const result = await checkEncryption()

    return NextResponse.json({
      encrypted: result.success,
      message: result.message,
    })
  } catch (error) {
    console.error("Error in check-encryption API:", error)
    return NextResponse.json({
      encrypted: false,
      message: `Error checking encryption: ${error instanceof Error ? error.message : "Unknown error"}`,
    })
  }
}

