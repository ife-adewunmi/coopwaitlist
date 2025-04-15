import { Suspense } from 'react'
import AuthCheck from './auth-check'
import AdminDashboardClient from './client'
import { Loader2 } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <>
      {/* Check authentication */}
      <Suspense fallback={null}>
        <AuthCheck />
      </Suspense>

      {/* Render the dashboard */}
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <AdminDashboardClient />
      </Suspense>
    </>
  )
}
