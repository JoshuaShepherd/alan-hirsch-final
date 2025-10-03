import { NextRequest } from 'next/server'
import { ApiError, ErrorCode } from './error-handler'

// Rate limit configuration
export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  keyGenerator?: (request: NextRequest) => string
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

// Rate limit entry
interface RateLimitEntry {
  count: number
  resetTime: number
  blocked: boolean
}

// In-memory rate limit store (for development)
// In production, use Redis or similar
class MemoryRateLimitStore {
  private store = new Map<string, RateLimitEntry>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  async get(key: string): Promise<RateLimitEntry | null> {
    return this.store.get(key) || null
  }

  async set(key: string, entry: RateLimitEntry): Promise<void> {
    this.store.set(key, entry)
  }

  async increment(key: string, windowMs: number): Promise<RateLimitEntry> {
    const now = Date.now()
    const existing = await this.get(key)

    if (!existing || now > existing.resetTime) {
      // Create new entry
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + windowMs,
        blocked: false
      }
      await this.set(key, newEntry)
      return newEntry
    }

    // Increment existing entry
    existing.count++
    await this.set(key, existing)
    return existing
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key)
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.store.clear()
  }
}

// Default rate limit store
const defaultStore = new MemoryRateLimitStore()

// Default key generator (by IP address)
function defaultKeyGenerator(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : (request as any).ip || 'unknown'
  return `rate_limit:${ip}`
}

// Rate limiter class
export class RateLimiter {
  private config: RateLimitConfig
  private store: MemoryRateLimitStore

  constructor(config: RateLimitConfig, store: MemoryRateLimitStore = defaultStore) {
    this.config = {
      keyGenerator: defaultKeyGenerator,
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      ...config
    }
    this.store = store
  }

  async check(request: NextRequest): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
    totalHits: number
  }> {
    const key = this.config.keyGenerator!(request)
    const entry = await this.store.increment(key, this.config.windowMs)

    const remaining = Math.max(0, this.config.maxRequests - entry.count)
    const allowed = entry.count <= this.config.maxRequests

    return {
      allowed,
      remaining,
      resetTime: entry.resetTime,
      totalHits: entry.count
    }
  }

  async isBlocked(request: NextRequest): Promise<boolean> {
    const result = await this.check(request)
    return !result.allowed
  }

  async getRemaining(request: NextRequest): Promise<number> {
    const result = await this.check(request)
    return result.remaining
  }

  async getResetTime(request: NextRequest): Promise<number> {
    const result = await this.check(request)
    return result.resetTime
  }
}

// Predefined rate limiters
export const rateLimiters = {
  // Strict rate limiter for authentication endpoints
  auth: new RateLimiter({
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    keyGenerator: (request) => {
      const forwarded = request.headers.get('x-forwarded-for')
      const ip = forwarded ? forwarded.split(',')[0] : (request as any).ip || 'unknown'
      return `auth_rate_limit:${ip}`
    }
  }),

  // Moderate rate limiter for API endpoints
  api: new RateLimiter({
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  }),

  // Lenient rate limiter for public endpoints
  public: new RateLimiter({
    maxRequests: 1000,
    windowMs: 60 * 60 * 1000, // 1 hour
  }),

  // Strict rate limiter for file uploads
  upload: new RateLimiter({
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  }),

  // Rate limiter for assessment submissions
  assessment: new RateLimiter({
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  })
}

// Rate limit middleware
export function withRateLimit(limiter: RateLimiter = rateLimiters.api) {
  return function<T>(
    handler: (data: T, request: NextRequest) => Promise<Response>
  ) {
    return async (request: NextRequest) => {
      try {
        const result = await limiter.check(request)

        if (!result.allowed) {
          throw new ApiError(
            'Rate limit exceeded',
            ErrorCode.RATE_LIMIT_EXCEEDED,
            429,
            {
              limit: limiter['config'].maxRequests,
              remaining: result.remaining,
              resetTime: new Date(result.resetTime).toISOString(),
              retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
            }
          )
        }

        // Add rate limit headers to response
        const response = await handler({} as T, request)
        
        response.headers.set('X-RateLimit-Limit', limiter['config'].maxRequests.toString())
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
        response.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString())

        return response
      } catch (error) {
        if (error instanceof ApiError) {
          throw error
        }
        throw new ApiError(
          'Rate limit check failed',
          ErrorCode.INTERNAL_SERVER_ERROR,
          500
        )
      }
    }
  }
}

// User-specific rate limiter
export class UserRateLimiter extends RateLimiter {
  constructor(config: RateLimitConfig) {
    super({
      ...config,
      keyGenerator: (request) => {
        // Extract user ID from request (assuming it's in headers or context)
        const userId = request.headers.get('x-user-id')
        if (userId) {
          return `user_rate_limit:${userId}`
        }
        // Fallback to IP-based limiting
        return defaultKeyGenerator(request)
      }
    })
  }
}

// Organization-specific rate limiter
export class OrganizationRateLimiter extends RateLimiter {
  constructor(config: RateLimitConfig) {
    super({
      ...config,
      keyGenerator: (request) => {
        // Extract organization ID from request
        const orgId = request.headers.get('x-organization-id')
        if (orgId) {
          return `org_rate_limit:${orgId}`
        }
        // Fallback to IP-based limiting
        return defaultKeyGenerator(request)
      }
    })
  }
}

// Cleanup function for graceful shutdown
export function cleanupRateLimiters(): void {
  defaultStore.destroy()
}
