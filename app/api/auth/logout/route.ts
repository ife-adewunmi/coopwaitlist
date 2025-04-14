import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

export async function POST() {
  try {
    // Clear auth cookie
    await clearAuthCookie()

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Error logging out:", error)
    return NextResponse.json(
      {
        error: "Failed to log out",
      },
      { status: 500 },
    )
  }
}

