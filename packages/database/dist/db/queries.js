// Alan Hirsch Digital Platform - Type-Safe Database Queries
// Comprehensive query operations for the platform
import { toAssessmentResponseDTO, toUserAssessmentResponseDTO, } from '@/lib/mappers/assessments';
import { toOrganizationDTO, toOrganizationMembershipDTO, } from '@/lib/mappers/organizations';
import { createClient } from '@/lib/supabase/server';
import { and, count, desc, eq, isNull, like, or, sql } from 'drizzle-orm';
import { db } from './drizzle';
import { aiConversations, assessments, auditLogs, communities, communityMemberships, contentCategories, contentItems, organizationMemberships, organizations, subscriptionPlans, userAnalyticsEvents, userAssessments, userProfiles, userSubscriptions, } from './schema';
import { hasResults } from './type-guards';
// ============================================================================
// User & Authentication Queries
// ============================================================================
export async function getUser() {
    const supabase = await createClient();
    const { data: { user }, error, } = await supabase.auth.getUser();
    if (error || !user) {
        return null;
    }
    const userProfile = await db
        .select()
        .from(userProfiles)
        .where(and(eq(userProfiles.id, user.id), eq(userProfiles.accountStatus, 'active')))
        .limit(1);
    return hasResults(userProfile) ? userProfile[0] : null;
}
export async function getUserById(userId) {
    const result = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.id, userId))
        .limit(1);
    return hasResults(result) ? result[0] : null;
}
export async function getUserByEmail(email) {
    const result = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.email, email))
        .limit(1);
    return hasResults(result) ? result[0] : null;
}
export async function updateUserLastActive(userId) {
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
        .leftJoin(contentCategories, eq(contentItems.primaryCategoryId, contentCategories.id))
        .where(and(eq(contentItems.status, 'published'), eq(contentItems.visibility, 'public')))
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
export async function getContentBySlug(slug) {
    const result = await db
        .select({
        content: contentItems,
        author: userProfiles,
        category: contentCategories,
    })
        .from(contentItems)
        .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
        .leftJoin(contentCategories, eq(contentItems.primaryCategoryId, contentCategories.id))
        .where(eq(contentItems.slug, slug))
        .limit(1);
    if (!hasResults(result))
        return null;
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
export async function getContentByAuthor(authorId, limit = 10) {
    return db
        .select()
        .from(contentItems)
        .where(and(eq(contentItems.authorId, authorId), eq(contentItems.status, 'published')))
        .orderBy(desc(contentItems.publishedAt))
        .limit(limit);
}
export async function searchContent(query, limit = 20) {
    const results = await db
        .select({
        content: contentItems,
        author: userProfiles,
    })
        .from(contentItems)
        .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
        .where(and(or(like(contentItems.title, `%${query}%`), like(contentItems.excerpt, `%${query}%`), like(contentItems.content, `%${query}%`)), eq(contentItems.status, 'published'), eq(contentItems.visibility, 'public')))
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
    return results.map(toAssessmentResponseDTO);
}
export async function getUserAssessments(userId) {
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
        ...toUserAssessmentResponseDTO(userAssessment),
        assessment: toAssessmentResponseDTO(assessment),
    }));
}
export async function getLatestAPESTAssessment(userId) {
    const result = await db
        .select({
        userAssessment: userAssessments,
        assessment: assessments,
    })
        .from(userAssessments)
        .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
        .where(and(eq(userAssessments.userId, userId), eq(assessments.assessmentType, 'apest'), isNull(userAssessments.completedAt)))
        .orderBy(desc(userAssessments.startedAt))
        .limit(1);
    if (!hasResults(result))
        return null;
    const { userAssessment, assessment } = result[0];
    return {
        ...toUserAssessmentResponseDTO(userAssessment),
        assessment: toAssessmentResponseDTO(assessment),
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
export async function getUserSubscription(userId) {
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
        .leftJoin(subscriptionPlans, eq(userSubscriptions.planId, subscriptionPlans.id))
        .leftJoin(userProfiles, eq(userSubscriptions.leaderProfileId, userProfiles.id))
        .where(and(eq(userSubscriptions.userId, userId), eq(userSubscriptions.status, 'active')))
        .limit(1);
    return hasResults(result) ? result[0] : null;
}
export async function getSubscriptionByStripeId(stripeSubscriptionId) {
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
        .where(and(eq(communities.visibility, 'public'), eq(communities.isActive, true)))
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
export async function getUserCommunities(userId) {
    const results = await db
        .select({
        community: communities,
        membership: communityMemberships,
    })
        .from(communityMemberships)
        .innerJoin(communities, eq(communityMemberships.communityId, communities.id))
        .where(and(eq(communityMemberships.userId, userId), eq(communityMemberships.status, 'active')))
        .orderBy(desc(communityMemberships.joinedAt));
    return results.map(({ community, membership }) => ({
        community,
        membership,
    }));
}
// ============================================================================
// AI & Analytics Queries
// ============================================================================
export async function getUserAIConversations(userId, limit = 10) {
    return db
        .select()
        .from(aiConversations)
        .where(eq(aiConversations.userId, userId))
        .orderBy(desc(aiConversations.createdAt))
        .limit(limit);
}
export async function trackUserEvent(eventData) {
    await db.insert(userAnalyticsEvents).values({
        eventType: eventData.eventType,
        eventAction: eventData.eventAction,
        eventLabel: eventData.eventLabel,
        contentId: eventData.contentId,
        properties: eventData.properties || {},
    });
}
// ============================================================================
// Dashboard & Analytics Queries
// ============================================================================
export async function getLeaderDashboardData(userId) {
    const [contentStats, subscriptionStats, recentActivity] = await Promise.all([
        // Content statistics
        db
            .select({
            totalContent: count(contentItems.id),
            publishedContent: count(sql `CASE WHEN ${contentItems.status} = 'published' THEN 1 END`),
            totalViews: sql `COALESCE(SUM(${contentItems.viewCount}), 0)`,
        })
            .from(contentItems)
            .where(eq(contentItems.authorId, userId)),
        // Subscription statistics
        db
            .select({
            totalSubscribers: count(userSubscriptions.id),
            activeSubscribers: count(sql `CASE WHEN ${userSubscriptions.status} = 'active' THEN 1 END`),
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
export async function getUserOrganizations(userId) {
    const results = await db
        .select({
        organization: organizations,
        membership: organizationMemberships,
    })
        .from(organizationMemberships)
        .innerJoin(organizations, eq(organizationMemberships.organizationId, organizations.id))
        .where(and(eq(organizationMemberships.userId, userId), eq(organizationMemberships.status, 'active')))
        .orderBy(organizationMemberships.joinedAt);
    return results.map(({ organization, membership }) => ({
        organization: toOrganizationDTO(organization),
        membership: toOrganizationMembershipDTO(membership),
    }));
}
// ============================================================================
// Audit & Security Queries
// ============================================================================
export async function logAuditEvent(eventData) {
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
export async function getTeamByStripeCustomerId(_customerId) {
    // This can be mapped to organization queries if needed
    return null;
}
export async function updateTeamSubscription(_teamId, _subscriptionData) {
    // Legacy function - can be updated to work with new schema
    return null;
}
export async function getUserWithTeam(_userId) {
    // Legacy function - can be updated to work with new schema
    return null;
}
export async function getActivityLogs() {
    // Updated to use new audit logs
    const user = await getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    return getRecentAuditLogs(10);
}
export async function getTeamForUser() {
    // Legacy function - can be mapped to organization queries
    const user = await getUser();
    if (!user) {
        return null;
    }
    const userOrganizations = await getUserOrganizations(user.id);
    return hasResults(userOrganizations)
        ? userOrganizations[0].organization
        : null;
}
//# sourceMappingURL=queries.js.map