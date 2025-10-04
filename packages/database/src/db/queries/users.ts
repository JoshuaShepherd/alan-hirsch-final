// User Profile Query Module
// Pure functions for user profile operations with context-aware access control

import type { NewUserProfile } from '@/lib/contracts';
import { and, asc, desc, eq, like, or, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  organizationMemberships,
  organizations,
  userProfiles,
} from '../schema';
import { hasResults } from '../type-guards';

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface QueryContext {
  organizationId?: string;
  userId?: string;
  role?: string;
}

// ============================================================================
// USER PROFILE QUERIES
// ============================================================================

/**
 * Get user profile by ID with context-aware access control
 */
export async function getUserProfileById(
  userId: string,
  context: QueryContext
): Promise<typeof userProfiles.$inferSelect | null> {
  const conditions = [eq(userProfiles.id, userId)];

  // Add context-based filtering
  if (context.organizationId) {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE user_id = ${userId}
        AND organization_id = ${context.organizationId}
        AND status = 'active'
      )`
    );
  }

  const result = await db
    .select()
    .from(userProfiles)
    .where(and(...conditions))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get user profile by email with context-aware access control
 */
export async function getUserProfileByEmail(
  email: string,
  context: QueryContext
): Promise<typeof userProfiles.$inferSelect | null> {
  const conditions = [eq(userProfiles.email, email)];

  // Add context-based filtering
  if (context.organizationId) {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE user_id = user_profiles.id
        AND organization_id = ${context.organizationId}
        AND status = 'active'
      )`
    );
  }

  const result = await db
    .select()
    .from(userProfiles)
    .where(and(...conditions))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get user profile by subdomain
 */
export async function getUserProfileBySubdomain(
  subdomain: string
): Promise<typeof userProfiles.$inferSelect | null> {
  const result = await db
    .select()
    .from(userProfiles)
    .where(
      and(
        eq(userProfiles.subdomain, subdomain),
        eq(userProfiles.accountStatus, 'active')
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Search user profiles with context-aware filtering
 */
export async function searchUserProfiles(
  searchTerm: string,
  context: QueryContext,
  options: {
    limit?: number;
    offset?: number;
    orderBy?: 'name' | 'created_at' | 'last_active_at';
    orderDirection?: 'asc' | 'desc';
  } = {}
): Promise<(typeof userProfiles.$inferSelect)[]> {
  const {
    limit = 20,
    offset = 0,
    orderBy = 'created_at',
    orderDirection = 'desc',
  } = options;

  const conditions = [
    or(
      like(userProfiles.firstName, `%${searchTerm}%`),
      like(userProfiles.lastName, `%${searchTerm}%`),
      like(userProfiles.displayName, `%${searchTerm}%`),
      like(userProfiles.email, `%${searchTerm}%`)
    ),
    eq(userProfiles.accountStatus, 'active'),
  ];

  // Add context-based filtering
  if (context.organizationId) {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE user_id = user_profiles.id
        AND organization_id = ${context.organizationId}
        AND status = 'active'
      )`
    );
  }

  const orderByField = {
    name: userProfiles.displayName,
    created_at: userProfiles.createdAt,
    last_active_at: userProfiles.lastActiveAt,
  }[orderBy];

  const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

  return db
    .select()
    .from(userProfiles)
    .where(and(...conditions))
    .orderBy(orderDirectionFn(orderByField))
    .limit(limit)
    .offset(offset);
}

/**
 * Get users by organization with role filtering
 */
export async function getUsersByOrganization(
  organizationId: string,
  context: QueryContext,
  options: {
    role?: string;
    limit?: number;
    offset?: number;
    status?: 'active' | 'pending' | 'inactive';
  } = {}
): Promise<
  Array<
    typeof userProfiles.$inferSelect & {
      membership: typeof organizationMemberships.$inferSelect;
    }
  >
> {
  const { role, limit = 50, offset = 0, status = 'active' } = options;

  const conditions = [
    eq(organizationMemberships.organizationId, organizationId),
    eq(organizationMemberships.status, status),
  ];

  if (role) {
    conditions.push(eq(organizationMemberships.role, role));
  }

  const results = await db
    .select({
      ...userProfiles,
      membership: organizationMemberships,
    })
    .from(userProfiles)
    .innerJoin(
      organizationMemberships,
      eq(userProfiles.id, organizationMemberships.userId)
    )
    .where(and(...conditions))
    .orderBy(desc(organizationMemberships.joinedAt))
    .limit(limit)
    .offset(offset);

  return results;
}

/**
 * Get user's APEST assessment scores
 */
export async function getUserApestScores(
  userId: string,
  context: QueryContext
): Promise<{
  movementAlignment: number;
  audienceEngagement: number;
  contentReadiness: number;
  revenuePotential: number;
  networkEffects: number;
  strategicFit: number;
  total: number;
  leaderTier: string;
} | null> {
  const result = await getUserProfileById(userId, context);

  if (!result) return null;

  return {
    movementAlignment: result.assessmentMovementAlignment ?? 0,
    audienceEngagement: result.assessmentAudienceEngagement ?? 0,
    contentReadiness: result.assessmentContentReadiness ?? 0,
    revenuePotential: result.assessmentRevenuePotential ?? 0,
    networkEffects: result.assessmentNetworkEffects ?? 0,
    strategicFit: result.assessmentStrategicFit ?? 0,
    total: result.assessmentTotal ?? 0,
    leaderTier: result.leaderTier ?? 'emerging',
  };
}

/**
 * Get user's ministry context and preferences
 */
export async function getUserMinistryContext(
  userId: string,
  context: QueryContext
): Promise<{
  ministryRole: string;
  denomination: string;
  organizationName: string;
  yearsInMinistry: number;
  countryCode: string;
  timezone: string;
  culturalContext: string;
  theologicalFocus: string[];
  languagePrimary: string;
} | null> {
  const result = await getUserProfileById(userId, context);

  if (!result) return null;

  return {
    ministryRole: result.ministryRole ?? '',
    denomination: result.denomination ?? '',
    organizationName: result.organizationName ?? '',
    yearsInMinistry: result.yearsInMinistry ?? 0,
    countryCode: result.countryCode ?? '',
    timezone: result.timezone ?? '',
    culturalContext: result.culturalContext ?? '',
    theologicalFocus: (result.theologicalFocus as string[]) ?? [],
    languagePrimary: result.languagePrimary ?? 'en',
  };
}

/**
 * Get user's platform customization settings
 */
export async function getUserPlatformSettings(
  userId: string,
  context: QueryContext
): Promise<{
  subdomain: string;
  customDomain: string;
  platformTitle: string;
  brandColors: Record<string, string>;
  emailNotifications: Record<string, boolean>;
  privacySettings: Record<string, boolean>;
} | null> {
  const result = await getUserProfileById(userId, context);

  if (!result) return null;

  return {
    subdomain: result.subdomain ?? '',
    customDomain: result.customDomain ?? '',
    platformTitle: result.platformTitle ?? '',
    brandColors: (result.brandColors as Record<string, string>) ?? {},
    emailNotifications:
      (result.emailNotifications as Record<string, boolean>) ?? {},
    privacySettings: (result.privacySettings as Record<string, boolean>) ?? {},
  };
}

/**
 * Get user's onboarding status
 */
export async function getUserOnboardingStatus(
  userId: string,
  context: QueryContext
): Promise<{
  completed: boolean;
  step: number;
  nextStep?: string;
} | null> {
  const result = await getUserProfileById(userId, context);

  if (!result) return null;

  return {
    completed: result.onboardingCompleted ?? false,
    step: result.onboardingStep ?? 0,
    nextStep: result.onboardingCompleted
      ? undefined
      : getNextOnboardingStep(result.onboardingStep ?? 0),
  };
}

/**
 * Create a new user profile
 */
export async function createUserProfile(
  userData: NewUserProfile,
  context: QueryContext
): Promise<typeof userProfiles.$inferSelect> {
  const result = await db
    .insert(userProfiles)
    .values({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create user profile');
  }

  return result[0];
}

/**
 * Update user profile with context-aware validation
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<NewUserProfile>,
  context: QueryContext
): Promise<typeof userProfiles.$inferSelect | null> {
  // Verify user has access to update this profile
  const existingUser = await getUserProfileById(userId, context);
  if (!existingUser) {
    throw new Error('User not found or access denied');
  }

  const result = await db
    .update(userProfiles)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(userProfiles.id, userId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Update user's last active timestamp
 */
export async function updateUserLastActive(
  userId: string,
  context: QueryContext
): Promise<void> {
  await db
    .update(userProfiles)
    .set({
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(userProfiles.id, userId));
}

/**
 * Get user statistics for dashboard
 */
export async function getUserStats(
  userId: string,
  context: QueryContext
): Promise<{
  totalContent: number;
  publishedContent: number;
  totalViews: number;
  totalSubscribers: number;
  activeSubscribers: number;
  communitiesJoined: number;
  assessmentsCompleted: number;
} | null> {
  const user = await getUserProfileById(userId, context);
  if (!user) return null;

  // This would typically involve more complex queries across multiple tables
  // For now, returning basic stats from user profile
  return {
    totalContent: 0, // Would query content_items table
    publishedContent: 0, // Would query content_items table
    totalViews: 0, // Would aggregate from analytics
    totalSubscribers: 0, // Would query user_subscriptions table
    activeSubscribers: 0, // Would query user_subscriptions table
    communitiesJoined: 0, // Would query community_memberships table
    assessmentsCompleted: 0, // Would query user_assessments table
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getNextOnboardingStep(currentStep: number): string {
  const steps = [
    'profile_setup',
    'ministry_context',
    'assessment_completion',
    'platform_customization',
    'content_creation',
    'community_joining',
  ];

  return steps[currentStep] || 'completed';
}

/**
 * Validate user access to organization
 */
export async function validateUserOrganizationAccess(
  userId: string,
  organizationId: string
): Promise<boolean> {
  const result = await db
    .select()
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.userId, userId),
        eq(organizationMemberships.organizationId, organizationId),
        eq(organizationMemberships.status, 'active')
      )
    )
    .limit(1);

  return hasResults(result);
}

/**
 * Get user's organization memberships
 */
export async function getUserOrganizationMemberships(
  userId: string,
  context: QueryContext
): Promise<
  Array<
    typeof organizationMemberships.$inferSelect & {
      organization: typeof organizations.$inferSelect;
    }
  >
> {
  const results = await db
    .select({
      ...organizationMemberships,
      organization: organizations,
    })
    .from(organizationMemberships)
    .innerJoin(
      organizations,
      eq(organizationMemberships.organizationId, organizations.id)
    )
    .where(
      and(
        eq(organizationMemberships.userId, userId),
        eq(organizationMemberships.status, 'active')
      )
    )
    .orderBy(desc(organizationMemberships.joinedAt));

  return results;
}
