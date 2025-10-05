// Alan Hirsch Digital Platform - Type-Safe Database Queries
// Comprehensive query operations for the platform

// Note: Database queries return raw database types
// Mappers should be applied in the service layer
import { and, count, desc, eq, isNull, like, or, sql } from 'drizzle-orm';
import { db } from './drizzle';
import {
  aiConversations,
  assessments,
  auditLogs,
  communities,
  communityMemberships,
  contentCategories,
  contentItems,
  organizationMemberships,
  organizations,
  subscriptionPlans,
  userAnalyticsEvents,
  userAssessments,
  userProfiles,
  userSubscriptions,
} from './schema';
import { hasResults } from './type-guards';

// ============================================================================
// User & Authentication Queries
// ============================================================================

// Note: This function requires Supabase auth and should be moved to the app layer
// export async function getUser(): Promise<
//   typeof userProfiles.$inferSelect | null
// > {
//   const supabase = await createClient();
//   // ... implementation
// }

export async function getUserById(
  userId: string
): Promise<typeof userProfiles.$inferSelect | null> {
  const result = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.id, userId))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

export async function getUserByEmail(
  email: string
): Promise<typeof userProfiles.$inferSelect | null> {
  const result = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.email, email))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

// Alias for backward compatibility
export const getUser = getUserById;

export async function updateUserLastActive(userId: string): Promise<void> {
  await db
    .update(userProfiles)
    .set({ lastActiveAt: new Date() })
    .where(eq(userProfiles.id, userId));
}

// ============================================================================
// Content Management Queries
// ============================================================================

export async function getPublishedContent(limit = 20, offset = 0) {
  const results = await db
    .select({
      content: contentItems,
      author: userProfiles,
      category: contentCategories,
    })
    .from(contentItems)
    .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
    .leftJoin(
      contentCategories,
      eq(contentItems.primaryCategoryId, contentCategories.id)
    )
    .where(
      and(
        eq(contentItems.status, 'published'),
        eq(contentItems.visibility, 'public')
      )
    )
    .orderBy(desc(contentItems.publishedAt))
    .limit(limit)
    .offset(offset);

  return results.map(({ content, author, category }) => ({
    content,
    author: author
      ? {
          id: author.id,
          displayName: author.displayName ?? '',
          subdomain: author.subdomain ?? '',
          avatarUrl: author.avatarUrl ?? '',
        }
      : null,
    category: category
      ? {
          id: category.id,
          name: category.name,
          slug: category.slug,
        }
      : null,
  }));
}

export async function getContentBySlug(slug: string) {
  const result = await db
    .select({
      content: contentItems,
      author: userProfiles,
      category: contentCategories,
    })
    .from(contentItems)
    .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
    .leftJoin(
      contentCategories,
      eq(contentItems.primaryCategoryId, contentCategories.id)
    )
    .where(eq(contentItems.slug, slug))
    .limit(1);

  if (!hasResults(result)) return null;

  const { content, author, category } = result[0];
  return {
    content,
    author: author
      ? {
          id: author.id,
          displayName: author.displayName ?? '',
          subdomain: author.subdomain ?? '',
          avatarUrl: author.avatarUrl ?? '',
          bio: author.bio ?? '',
        }
      : null,
    category,
  };
}

export async function getContentByAuthor(authorId: string, limit = 10) {
  return db
    .select()
    .from(contentItems)
    .where(
      and(
        eq(contentItems.authorId, authorId),
        eq(contentItems.status, 'published')
      )
    )
    .orderBy(desc(contentItems.publishedAt))
    .limit(limit);
}

export async function searchContent(query: string, limit = 20) {
  const results = await db
    .select({
      content: contentItems,
      author: userProfiles,
    })
    .from(contentItems)
    .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
    .where(
      and(
        or(
          like(contentItems.title, `%${query}%`),
          like(contentItems.excerpt, `%${query}%`),
          like(contentItems.content, `%${query}%`)
        ),
        eq(contentItems.status, 'published'),
        eq(contentItems.visibility, 'public')
      )
    )
    .orderBy(desc(contentItems.publishedAt))
    .limit(limit);

  return results.map(({ content, author }) => ({
    content,
    author: author
      ? {
          displayName: author.displayName ?? '',
          subdomain: author.subdomain ?? '',
        }
      : null,
  }));
}

// ============================================================================
// Assessment System Queries
// ============================================================================

export async function getActiveAssessments() {
  const results = await db
    .select()
    .from(assessments)
    .where(eq(assessments.status, 'active'))
    .orderBy(assessments.name);

  return results;
}

export async function getUserAssessments(userId: string) {
  const results = await db
    .select({
      userAssessment: userAssessments,
      assessment: assessments,
    })
    .from(userAssessments)
    .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
    .where(eq(userAssessments.userId, userId))
    .orderBy(desc(userAssessments.completedAt));

  return results.map(({ userAssessment, assessment }) => ({
    ...userAssessment,
    assessment: assessment,
  }));
}

export async function getLatestAPESTAssessment(userId: string) {
  const result = await db
    .select({
      userAssessment: userAssessments,
      assessment: assessments,
    })
    .from(userAssessments)
    .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
    .where(
      and(
        eq(userAssessments.userId, userId),
        eq(assessments.assessmentType, 'apest'),
        isNull(userAssessments.completedAt)
      )
    )
    .orderBy(desc(userAssessments.startedAt))
    .limit(1);

  if (!hasResults(result)) return null;

  const { userAssessment, assessment } = result[0];
  return {
    ...userAssessment,
    assessment: assessment,
  };
}

// Re-export comprehensive assessment queries
export * from './queries/assessments';

// ============================================================================
// Subscription & Billing Queries
// ============================================================================

export async function getActiveSubscriptionPlans() {
  return db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.isActive, true))
    .orderBy(subscriptionPlans.sortOrder);
}

export async function getUserSubscription(userId: string) {
  const result = await db
    .select({
      subscription: userSubscriptions,
      plan: subscriptionPlans,
      leaderProfile: {
        id: userProfiles.id,
        displayName: userProfiles.displayName,
      },
    })
    .from(userSubscriptions)
    .leftJoin(
      subscriptionPlans,
      eq(userSubscriptions.planId, subscriptionPlans.id)
    )
    .leftJoin(
      userProfiles,
      eq(userSubscriptions.leaderProfileId, userProfiles.id)
    )
    .where(
      and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, 'active')
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

export async function getSubscriptionByStripeId(stripeSubscriptionId: string) {
  const result = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.stripeSubscriptionId, stripeSubscriptionId))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

// ============================================================================
// Community Queries
// ============================================================================

export async function getPublicCommunities(limit = 20) {
  const results = await db
    .select({
      community: communities,
      creator: userProfiles,
    })
    .from(communities)
    .leftJoin(userProfiles, eq(communities.createdBy, userProfiles.id))
    .where(
      and(eq(communities.visibility, 'public'), eq(communities.isActive, true))
    )
    .orderBy(desc(communities.currentMemberCount))
    .limit(limit);

  return results.map(({ community, creator }) => ({
    community,
    creator: creator
      ? {
          displayName: creator.displayName ?? '',
          avatarUrl: creator.avatarUrl ?? '',
        }
      : null,
  }));
}

export async function getUserCommunities(userId: string) {
  const results = await db
    .select({
      community: communities,
      membership: communityMemberships,
    })
    .from(communityMemberships)
    .innerJoin(
      communities,
      eq(communityMemberships.communityId, communities.id)
    )
    .where(
      and(
        eq(communityMemberships.userId, userId),
        eq(communityMemberships.status, 'active')
      )
    )
    .orderBy(desc(communityMemberships.joinedAt));

  return results.map(({ community, membership }) => ({
    community,
    membership,
  }));
}

// ============================================================================
// AI & Analytics Queries
// ============================================================================

export async function getUserAIConversations(userId: string, limit = 10) {
  return db
    .select()
    .from(aiConversations)
    .where(eq(aiConversations.userId, userId))
    .orderBy(desc(aiConversations.createdAt))
    .limit(limit);
}

export async function trackUserEvent(eventData: {
  userId?: string;
  eventType: string;
  eventAction: string;
  eventLabel?: string;
  contentId?: string;
  properties?: Record<string, unknown>;
}): Promise<void> {
  await db.insert(userAnalyticsEvents).values({
    eventType: eventData.eventType as any,
    eventAction: eventData.eventAction,
    eventLabel: eventData.eventLabel,
    contentId: eventData.contentId,
    properties: eventData.properties || {},
  });
}

// ============================================================================
// Dashboard & Analytics Queries
// ============================================================================

export async function getLeaderDashboardData(userId: string) {
  const [contentStats, subscriptionStats, recentActivity] = await Promise.all([
    // Content statistics
    db
      .select({
        totalContent: count(contentItems.id),
        publishedContent: count(
          sql`CASE WHEN ${contentItems.status} = 'published' THEN 1 END`
        ),
        totalViews: sql<number>`COALESCE(SUM(${contentItems.viewCount}), 0)`,
      })
      .from(contentItems)
      .where(eq(contentItems.authorId, userId)),

    // Subscription statistics
    db
      .select({
        totalSubscribers: count(userSubscriptions.id),
        activeSubscribers: count(
          sql`CASE WHEN ${userSubscriptions.status} = 'active' THEN 1 END`
        ),
      })
      .from(userSubscriptions)
      .where(eq(userSubscriptions.leaderProfileId, userId)),

    // Recent activity
    db
      .select()
      .from(userAnalyticsEvents)
      .where(eq(userAnalyticsEvents.leaderProfileId, userId))
      .orderBy(desc(userAnalyticsEvents.createdAt))
      .limit(10),
  ]);

  return {
    contentStats: contentStats[0],
    subscriptionStats: subscriptionStats[0],
    recentActivity,
  };
}

// ============================================================================
// Organization Queries
// ============================================================================

export async function getUserOrganizations(userId: string) {
  const results = await db
    .select({
      organization: organizations,
      membership: organizationMemberships,
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
    .orderBy(organizationMemberships.joinedAt);

  return results.map(({ organization, membership }) => ({
    organization: organization,
    membership: membership,
  }));
}

// ============================================================================
// Audit & Security Queries
// ============================================================================

export async function logAuditEvent(eventData: {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  await db.insert(auditLogs).values({
    riskLevel: 'low',
    ...eventData,
  });
}

export async function getRecentAuditLogs(limit = 50) {
  const results = await db
    .select({
      log: auditLogs,
      user: userProfiles,
    })
    .from(auditLogs)
    .leftJoin(userProfiles, eq(auditLogs.userId, userProfiles.id))
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit);

  return results.map(({ log, user }) => ({
    log,
    user: user
      ? {
          displayName: user.displayName ?? '',
          email: user.email,
        }
      : null,
  }));
}

// ============================================================================
// Legacy Compatibility Functions (for existing code)
// ============================================================================

// Keeping some legacy functions for backward compatibility
export async function getTeamByStripeCustomerId(
  _customerId: string
): Promise<null> {
  // This can be mapped to organization queries if needed
  return null;
}

export async function updateTeamSubscription(
  _teamId: number,
  _subscriptionData: unknown
): Promise<null> {
  // Legacy function - can be updated to work with new schema
  return null;
}

export async function getUserWithTeam(_userId: number): Promise<null> {
  // Legacy function - can be updated to work with new schema
  return null;
}

// Note: This function requires Supabase auth and should be moved to the app layer
export async function getActivityLogs(limit = 10) {
  return getRecentAuditLogs(limit);
}

// Note: This function requires Supabase auth and should be moved to the app layer
export async function getTeamForUser(userId: string) {
  if (!userId) {
    return null;
  }
  const userOrganizations = await getUserOrganizations(userId);
  return hasResults(userOrganizations)
    ? userOrganizations[0].organization
    : null;
}
