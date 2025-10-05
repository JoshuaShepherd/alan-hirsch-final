// Organization Query Module
// Pure functions for organization operations with context-aware access control

// Note: Using database types directly to avoid circular dependencies
import { and, count, desc, eq, like, or, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  organizationMemberships,
  organizations,
  userProfiles,
  userSubscriptions,
} from '../schema';
import type {
  NewOrganization,
  NewOrganizationMembership,
} from '../schema/auth';
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
// ORGANIZATION QUERIES
// ============================================================================

/**
 * Get organization by ID with context-aware access control
 */
export async function getOrganizationById(
  organizationId: string,
  context: QueryContext
): Promise<typeof organizations.$inferSelect | null> {
  const conditions = [eq(organizations.id, organizationId)];

  // Add context-based filtering for non-admin users
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE organization_id = ${organizationId}
        AND user_id = ${context.userId}
        AND status = 'active'
      )`
    );
  }

  const result = await db
    .select()
    .from(organizations)
    .where(and(...conditions))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get organization by slug with context-aware access control
 */
export async function getOrganizationBySlug(
  slug: string,
  context: QueryContext
): Promise<typeof organizations.$inferSelect | null> {
  const conditions = [eq(organizations.slug, slug)];

  // Add context-based filtering for non-admin users
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE organization_id = organizations.id
        AND user_id = ${context.userId}
        AND status = 'active'
      )`
    );
  }

  const result = await db
    .select()
    .from(organizations)
    .where(and(...conditions))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Search organizations with context-aware filtering
 */
export async function searchOrganizations(
  searchTerm: string,
  context: QueryContext,
  options: {
    limit?: number;
    offset?: number;
    organizationType?: string;
    sizeCategory?: string;
    status?: 'active' | 'inactive' | 'suspended';
  } = {}
): Promise<(typeof organizations.$inferSelect)[]> {
  const {
    limit = 20,
    offset = 0,
    organizationType,
    sizeCategory,
    status = 'active',
  } = options;

  const conditions = [
    or(
      like(organizations.name, `%${searchTerm}%`),
      like(organizations.description, `%${searchTerm}%`)
    ),
    eq(organizations.status, status as any),
  ];

  if (organizationType) {
    conditions.push(
      eq(organizations.organizationType, organizationType as any)
    );
  }

  if (sizeCategory) {
    conditions.push(eq(organizations.sizeCategory, sizeCategory as any));
  }

  // Add context-based filtering for non-admin users
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE organization_id = organizations.id
        AND user_id = ${context.userId}
        AND status = 'active'
      )`
    );
  }

  return db
    .select()
    .from(organizations)
    .where(and(...conditions))
    .orderBy(desc(organizations.createdAt))
    .limit(limit)
    .offset(offset);
}

/**
 * Get organizations by user with membership details
 */
export async function getOrganizationsByUser(
  userId: string,
  context: QueryContext,
  options: {
    status?: 'active' | 'pending' | 'inactive';
    role?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<
    typeof organizations.$inferSelect & {
      membership: typeof organizationMemberships.$inferSelect;
    }
  >
> {
  const { status = 'active', role, limit = 50, offset = 0 } = options;

  const conditions = [
    eq(organizationMemberships.userId, userId),
    eq(organizationMemberships.status, status),
  ];

  if (role) {
    conditions.push(eq(organizationMemberships.role, role as any));
  }

  const results = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      description: organizations.description,
      website: organizations.website,
      logoUrl: organizations.logoUrl,
      organizationType: organizations.organizationType,
      sizeCategory: organizations.sizeCategory,
      contactEmail: organizations.contactEmail,
      contactPhone: organizations.contactPhone,
      address: organizations.address,
      billingEmail: organizations.billingEmail,
      accountOwnerId: organizations.accountOwnerId,
      licenseType: organizations.licenseType,
      maxUsers: organizations.maxUsers,
      status: organizations.status,
      createdAt: organizations.createdAt,
      updatedAt: organizations.updatedAt,
      membership: organizationMemberships,
    })
    .from(organizations)
    .innerJoin(
      organizationMemberships,
      eq(organizations.id, organizationMemberships.organizationId)
    )
    .where(and(...conditions))
    .orderBy(desc(organizationMemberships.joinedAt))
    .limit(limit)
    .offset(offset);

  return results as any;
}

/**
 * Get organization statistics
 */
export async function getOrganizationStats(
  organizationId: string,
  context: QueryContext
): Promise<{
  totalMembers: number;
  activeMembers: number;
  pendingInvitations: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  totalRevenue: number;
} | null> {
  const org = await getOrganizationById(organizationId, context);
  if (!org) return null;

  const [memberStats, subscriptionStats] = await Promise.all([
    // Member statistics
    db
      .select({
        totalMembers: count(organizationMemberships.id),
        activeMembers: count(
          sql`CASE WHEN ${organizationMemberships.status} = 'active' THEN 1 END`
        ),
        pendingInvitations: count(
          sql`CASE WHEN ${organizationMemberships.status} = 'pending' THEN 1 END`
        ),
      })
      .from(organizationMemberships)
      .where(eq(organizationMemberships.organizationId, organizationId)),

    // Subscription statistics
    db
      .select({
        totalSubscriptions: count(userSubscriptions.id),
        activeSubscriptions: count(
          sql`CASE WHEN ${userSubscriptions.status} = 'active' THEN 1 END`
        ),
        monthlyRevenue: sql<number>`COALESCE(SUM(CASE WHEN ${userSubscriptions.status} = 'active' THEN ${userSubscriptions.amount} ELSE 0 END), 0)`,
        totalRevenue: sql<number>`COALESCE(SUM(${userSubscriptions.totalRevenue}), 0)`,
      })
      .from(userSubscriptions)
      .where(eq(userSubscriptions.organizationId, organizationId)),
  ]);

  return {
    totalMembers: memberStats[0]?.totalMembers ?? 0,
    activeMembers: memberStats[0]?.activeMembers ?? 0,
    pendingInvitations: memberStats[0]?.pendingInvitations ?? 0,
    totalSubscriptions: subscriptionStats[0]?.totalSubscriptions ?? 0,
    activeSubscriptions: subscriptionStats[0]?.activeSubscriptions ?? 0,
    monthlyRevenue: subscriptionStats[0]?.monthlyRevenue ?? 0,
    totalRevenue: subscriptionStats[0]?.totalRevenue ?? 0,
  };
}

/**
 * Get organization members with user details
 */
export async function getOrganizationMembers(
  organizationId: string,
  context: QueryContext,
  options: {
    role?: string;
    status?: 'active' | 'pending' | 'inactive';
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<
    typeof userProfiles.$inferSelect & {
      membership: typeof organizationMemberships.$inferSelect;
    }
  >
> {
  const { role, status = 'active', limit = 50, offset = 0 } = options;

  const conditions = [
    eq(organizationMemberships.organizationId, organizationId),
    eq(organizationMemberships.status, status),
  ];

  if (role) {
    conditions.push(eq(organizationMemberships.role, role as any));
  }

  const results = await db
    .select({
      id: userProfiles.id,
      email: userProfiles.email,
      firstName: userProfiles.firstName,
      lastName: userProfiles.lastName,
      displayName: userProfiles.displayName,
      bio: userProfiles.bio,
      avatarUrl: userProfiles.avatarUrl,
      ministryRole: userProfiles.ministryRole,
      denomination: userProfiles.denomination,
      organizationName: userProfiles.organizationName,
      yearsInMinistry: userProfiles.yearsInMinistry,
      countryCode: userProfiles.countryCode,
      timezone: userProfiles.timezone,
      languagePrimary: userProfiles.languagePrimary,
      culturalContext: userProfiles.culturalContext,
      assessmentMovementAlignment: userProfiles.assessmentMovementAlignment,
      assessmentAudienceEngagement: userProfiles.assessmentAudienceEngagement,
      assessmentContentReadiness: userProfiles.assessmentContentReadiness,
      assessmentRevenuePotential: userProfiles.assessmentRevenuePotential,
      assessmentNetworkEffects: userProfiles.assessmentNetworkEffects,
      assessmentStrategicFit: userProfiles.assessmentStrategicFit,
      assessmentTotal: userProfiles.assessmentTotal,
      leaderTier: userProfiles.leaderTier,
      subdomain: userProfiles.subdomain,
      customDomain: userProfiles.customDomain,
      platformTitle: userProfiles.platformTitle,
      subscriptionTier: userProfiles.subscriptionTier,
      theologicalFocus: userProfiles.theologicalFocus,
      brandColors: userProfiles.brandColors,
      emailNotifications: userProfiles.emailNotifications,
      privacySettings: userProfiles.privacySettings,
      onboardingCompleted: userProfiles.onboardingCompleted,
      onboardingStep: userProfiles.onboardingStep,
      accountStatus: userProfiles.accountStatus,
      createdAt: userProfiles.createdAt,
      updatedAt: userProfiles.updatedAt,
      lastActiveAt: userProfiles.lastActiveAt,
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

  return results as any;
}

/**
 * Get organization billing information
 */
export async function getOrganizationBilling(
  organizationId: string,
  context: QueryContext
): Promise<{
  billingEmail: string;
  contactEmail: string;
  contactPhone: string;
  address: Record<string, unknown>;
  licenseType: string;
  maxUsers: number;
  currentUsers: number;
  subscriptionStatus: string;
} | null> {
  const org = await getOrganizationById(organizationId, context);
  if (!org) return null;

  const memberCount = await db
    .select({ count: count(organizationMemberships.id) })
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.organizationId, organizationId),
        eq(organizationMemberships.status, 'active')
      )
    );

  return {
    billingEmail: org.billingEmail ?? '',
    contactEmail: org.contactEmail ?? '',
    contactPhone: org.contactPhone ?? '',
    address: (org.address as Record<string, unknown>) ?? {},
    licenseType: org.licenseType ?? 'individual',
    maxUsers: org.maxUsers ?? 1,
    currentUsers: memberCount[0]?.count ?? 0,
    subscriptionStatus: org.status ?? 'active',
  };
}

/**
 * Create a new organization
 */
export async function createOrganization(
  organizationData: NewOrganization,
  context: QueryContext
): Promise<typeof organizations.$inferSelect> {
  const result = await db
    .insert(organizations)
    .values({
      ...organizationData,
      accountOwnerId: context.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create organization');
  }

  return result[0];
}

/**
 * Update organization with context-aware validation
 */
export async function updateOrganization(
  organizationId: string,
  updates: Partial<NewOrganization>,
  context: QueryContext
): Promise<typeof organizations.$inferSelect | null> {
  // Verify user has access to update this organization
  const existingOrg = await getOrganizationById(organizationId, context);
  if (!existingOrg) {
    throw new Error('Organization not found or access denied');
  }

  // Check if user is account owner or has admin role
  if (
    existingOrg.accountOwnerId !== context.userId &&
    context.role !== 'admin'
  ) {
    throw new Error('Insufficient permissions to update organization');
  }

  const result = await db
    .update(organizations)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(organizations.id, organizationId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Delete organization with context-aware validation
 */
export async function deleteOrganization(
  organizationId: string,
  context: QueryContext
): Promise<boolean> {
  // Verify user has access to delete this organization
  const existingOrg = await getOrganizationById(organizationId, context);
  if (!existingOrg) {
    throw new Error('Organization not found or access denied');
  }

  // Only account owner can delete organization
  if (existingOrg.accountOwnerId !== context.userId) {
    throw new Error('Only account owner can delete organization');
  }

  const result = await db
    .delete(organizations)
    .where(eq(organizations.id, organizationId));

  return result.length > 0;
}

// ============================================================================
// ORGANIZATION MEMBERSHIP QUERIES
// ============================================================================

/**
 * Get organization membership by ID
 */
export async function getOrganizationMembershipById(
  membershipId: string,
  context: QueryContext
): Promise<typeof organizationMemberships.$inferSelect | null> {
  const result = await db
    .select()
    .from(organizationMemberships)
    .where(eq(organizationMemberships.id, membershipId))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get user's membership in organization
 */
export async function getUserOrganizationMembership(
  userId: string,
  organizationId: string,
  context: QueryContext
): Promise<typeof organizationMemberships.$inferSelect | null> {
  const result = await db
    .select()
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.userId, userId),
        eq(organizationMemberships.organizationId, organizationId)
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Create organization membership
 */
export async function createOrganizationMembership(
  membershipData: NewOrganizationMembership,
  context: QueryContext
): Promise<typeof organizationMemberships.$inferSelect> {
  const result = await db
    .insert(organizationMemberships)
    .values({
      ...membershipData,
      invitedBy: context.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create organization membership');
  }

  return result[0];
}

/**
 * Update organization membership
 */
export async function updateOrganizationMembership(
  membershipId: string,
  updates: Partial<NewOrganizationMembership>,
  context: QueryContext
): Promise<typeof organizationMemberships.$inferSelect | null> {
  const result = await db
    .update(organizationMemberships)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(organizationMemberships.id, membershipId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Delete organization membership
 */
export async function deleteOrganizationMembership(
  membershipId: string,
  context: QueryContext
): Promise<boolean> {
  const result = await db
    .delete(organizationMemberships)
    .where(eq(organizationMemberships.id, membershipId));

  return result.length > 0;
}

/**
 * Invite user to organization
 */
export async function inviteUserToOrganization(
  organizationId: string,
  userEmail: string,
  role: string,
  context: QueryContext
): Promise<typeof organizationMemberships.$inferSelect> {
  // Check if user exists
  const user = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.email, userEmail))
    .limit(1);

  if (!hasResults(user)) {
    throw new Error('User not found');
  }

  // Check if membership already exists
  const existingMembership = await getUserOrganizationMembership(
    user[0].id,
    organizationId,
    context
  );

  if (existingMembership) {
    throw new Error('User is already a member of this organization');
  }

  return createOrganizationMembership(
    {
      userId: user[0].id,
      organizationId,
      role: role as any,
      status: 'pending',
      invitedAt: new Date(),
    },
    context
  );
}

/**
 * Accept organization invitation
 */
export async function acceptOrganizationInvitation(
  membershipId: string,
  context: QueryContext
): Promise<typeof organizationMemberships.$inferSelect | null> {
  const membership = await getOrganizationMembershipById(membershipId, context);
  if (!membership) {
    throw new Error('Membership not found');
  }

  if (membership.userId !== context.userId) {
    throw new Error('Access denied');
  }

  if (membership.status !== 'pending') {
    throw new Error('Invitation is not pending');
  }

  return updateOrganizationMembership(
    membershipId,
    {
      status: 'active',
      joinedAt: new Date(),
    },
    context
  );
}

/**
 * Reject organization invitation
 */
export async function rejectOrganizationInvitation(
  membershipId: string,
  context: QueryContext
): Promise<boolean> {
  const membership = await getOrganizationMembershipById(membershipId, context);
  if (!membership) {
    throw new Error('Membership not found');
  }

  if (membership.userId !== context.userId) {
    throw new Error('Access denied');
  }

  return deleteOrganizationMembership(membershipId, context);
}
