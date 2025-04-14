import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"

export default async function AuthCheck() {
  const { authenticated } = await getAuthUser()

  if (!authenticated) {
    redirect("/admin/login")
  }

  // This component doesn't render anything, it just checks authentication
  return null
}

