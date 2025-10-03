import {
  createPaginatedApiRoute,
  paginationInputSchema,
} from '@/lib/api/utils';
import { userProfileListResponseSchema } from '@/lib/contracts';
import { userProfiles } from '@/lib/db/schema';
import { toUserProfileListDTO } from '@/lib/mappers/user-profiles';
import { hasResults } from '@/lib/db/type-guards';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Input schema for profile search
const profileSearchInputSchema = paginationInputSchema.extend({
  search: z.string().optional(),
  ministryRole: z.string().optional(),
  countryCode: z.string().length(2).optional(),
  leaderTier: z.enum(['core', 'network', 'emerging', 'community']).optional(),
  subscriptionTier: z
    .enum(['free', 'individual', 'professional', 'leader', 'institutional'])
    .optional(),
  accountStatus: z
    .enum(['active', 'inactive', 'suspended', 'pending_verification'])
    .optional(),
});

// GET /api/user/profiles - Get public profiles with search and filtering
export const GET = createPaginatedApiRoute(
  profileSearchInputSchema,
  userProfileListResponseSchema,
  async (input, { user, db }) => {
    const {
      page,
      limit,
      search,
      ministryRole,
      countryCode,
      leaderTier,
      subscriptionTier,
      accountStatus,
    } = input;
    const offset = ((page || 1) - 1) * (limit || 20);

    // Build where conditions
    const conditions = [
      eq(userProfiles.accountStatus, 'active'), // Only active profiles
      // Only show public profiles (privacy setting)
    ];

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(userProfiles.firstName, `%${search}%`),
          like(userProfiles.lastName, `%${search}%`),
          like(userProfiles.displayName, `%${search}%`),
          like(userProfiles.bio, `%${search}%`)
        )!
      );
    }

    // Add filter conditions
    if (ministryRole) {
      conditions.push(eq(userProfiles.ministryRole, ministryRole as any));
    }
    if (countryCode) {
      conditions.push(eq(userProfiles.countryCode, countryCode));
    }
    if (leaderTier) {
      conditions.push(eq(userProfiles.leaderTier, leaderTier));
    }
    if (subscriptionTier) {
      conditions.push(eq(userProfiles.subscriptionTier, subscriptionTier));
    }
    if (accountStatus) {
      conditions.push(eq(userProfiles.accountStatus, accountStatus));
    }

    // Get profiles
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(and(...conditions))
      .orderBy(desc(userProfiles.lastActiveAt))
      .limit(limit || 20)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfiles)
      .where(and(...conditions));

    const mappedProfiles = toUserProfileListDTO(profiles);
    const total = countResult[0]?.count ?? 0;

    return {
      items: mappedProfiles,
      pagination: {
        page: page || 1,
        limit: limit || 20,
        total,
        totalPages: Math.ceil(total / (limit || 20)),
        hasNext: (page || 1) < Math.ceil(total / (limit || 20)),
        hasPrev: (page || 1) > 1,
      },
      success: true,
    };
  }
);
