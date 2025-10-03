import {
  createApiRoute,
  createApiRouteInputOnly,
  emptyInputSchema,
  idInputSchema,
} from '@/lib/api/utils';
import {
  userProfileSchema,
  newUserProfileSchema,
  UserProfileRow,
  userProfileResponseSchema,
} from '@/lib/contracts';
import { userProfiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Mapper function to convert Drizzle row to DTO
const mapUserProfileRow = (row: UserProfileRow) => userProfileSchema.parse(row);

// Response schemas are now imported from contracts

// GET /api/user/profile - Get current user's profile
export const GET = createApiRoute(
  emptyInputSchema,
  userProfileResponseSchema,
  async (input, { user, db }) => {
    const profile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, user.id))
      .limit(1);

    if (!profile[0]) {
      throw new Error('Profile not found');
    }

    return {
      data: mapUserProfileRow(profile[0]),
      success: true,
    };
  }
);

// PUT /api/user/profile - Update current user's profile
export const PUT = createApiRoute(
  userProfileSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    lastActiveAt: true,
  }),
  userProfileResponseSchema,
  async (input, { user, db }) => {
    const [updatedProfile] = await db
      .update(userProfiles)
      .set({
        ...input,
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      })
      .where(eq(userProfiles.id, user.id))
      .returning();

    if (!updatedProfile) {
      throw new Error('Profile not found');
    }

    return {
      data: mapUserProfileRow(updatedProfile),
      success: true,
    };
  }
);

// POST /api/user/profile - Create new user profile (for onboarding)
export const POST = createApiRoute(
  newUserProfileSchema,
  userProfileResponseSchema,
  async (input, { user, db }) => {
    // Check if profile already exists
    const existingProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, user.id))
      .limit(1);

    if (existingProfile[0]) {
      throw new Error('Profile already exists');
    }

    const insertedProfiles = await db
      .insert(userProfiles)
      .values({
        ...input,
        id: user.id,
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      })
      .returning();

    // Ensure we have a valid profile
    if (!insertedProfiles || insertedProfiles.length === 0) {
      throw new Error('Failed to create user profile');
    }

    const newProfile = insertedProfiles[0];

    return {
      data: mapUserProfileRow(newProfile),
      success: true,
    };
  }
);
