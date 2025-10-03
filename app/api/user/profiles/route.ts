import { createPaginatedApiRoute, paginationInputSchema } from '@/lib/api/utils'
import { userProfileSchema, UserProfileRow } from '@/lib/contracts'
import { userProfiles } from '@/lib/db/schema'
import { desc, eq, and, like, or, sql } from 'drizzle-orm'
import { z } from 'zod'

// Mapper function to convert Drizzle row to DTO
const mapUserProfileRow = (row: UserProfileRow) => userProfileSchema.parse(row)

// Input schema for profile search
const profileSearchInputSchema = paginationInputSchema.extend({
  search: z.string().optional(),
  ministryRole: z.string().optional(),
  countryCode: z.string().length(2).optional(),
  leaderTier: z.enum(['core', 'network', 'emerging', 'community']).optional(),
  subscriptionTier: z.enum(['free', 'individual', 'professional', 'leader', 'institutional']).optional(),
  accountStatus: z.enum(['active', 'inactive', 'suspended', 'pending_verification']).optional()
})

// GET /api/user/profiles - Get public profiles with search and filtering
export const GET = createPaginatedApiRoute(
  profileSearchInputSchema,
  userProfileSchema,
  async (input, { user, db }) => {
    const { page, limit, search, ministryRole, countryCode, leaderTier, subscriptionTier, accountStatus } = input
    const offset = ((page || 1) - 1) * (limit || 20)

    // Build where conditions
    const conditions = [
      eq(userProfiles.accountStatus, 'active'), // Only active profiles
      // Only show public profiles (privacy setting)
    ]

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(userProfiles.firstName, `%${search}%`),
          like(userProfiles.lastName, `%${search}%`),
          like(userProfiles.displayName, `%${search}%`),
          like(userProfiles.bio, `%${search}%`)
        )!
      )
    }

    // Add filter conditions
    if (ministryRole) {
      conditions.push(eq(userProfiles.ministryRole, ministryRole as any))
    }
    if (countryCode) {
      conditions.push(eq(userProfiles.countryCode, countryCode))
    }
    if (leaderTier) {
      conditions.push(eq(userProfiles.leaderTier, leaderTier))
    }
    if (subscriptionTier) {
      conditions.push(eq(userProfiles.subscriptionTier, subscriptionTier))
    }
    if (accountStatus) {
      conditions.push(eq(userProfiles.accountStatus, accountStatus))
    }

    // Get profiles
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(and(...conditions))
      .orderBy(desc(userProfiles.lastActiveAt))
      .limit(limit || 20)
      .offset(offset)

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfiles)
      .where(and(...conditions))

    return {
      items: profiles.map(mapUserProfileRow),
      total: countResult[0]?.count || 0
    }
  }
)
