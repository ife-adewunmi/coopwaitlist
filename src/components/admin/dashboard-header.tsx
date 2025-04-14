"use client"
import { Button } from "@/components/ui/button"
import { DownloadIcon, RefreshCw, Shield, Home, LogOut, Moon, Sun } from "lucide-react"
import { SimpleEncryptionStatus } from "@/components/security/simple-encryption-status"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/client-auth"
import { useTheme } from "next-themes"

interface DashboardHeaderProps {
  onRefresh: () => void
  onExport: () => void
}

export function DashboardHeader({ onRefresh, onExport }: DashboardHeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="bg-primary-600 text-white py-4 px-4 sm:px-6 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <SimpleEncryptionStatus />

          <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20" onClick={onExport}>
            <DownloadIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Link href="/">
            <Button variant="secondary" size="sm">
              <Home className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>

          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="text-white border-white hover:bg-white/20"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
