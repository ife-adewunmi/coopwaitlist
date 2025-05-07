// Rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10
const ipRequests: Record<string, { count: number; resetTime: number }> = {}

// Check rate limit
export const checkRateLimit = (ip: string) => {
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
