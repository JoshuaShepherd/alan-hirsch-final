// Analytics Query Module
// Complex queries and joins for ministry analytics and reporting

import { and, count, desc, eq, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  communities,
  communityMemberships,
  contentItems,
  organizationMemberships,
  organizations,
  userAnalyticsEvents,
  userAssessments,
  userContentInteractions,
  userProfiles,
  userSubscriptions,
} from '../schema';
import type { Ctx } from './_ctx';

// ============================================================================
// USER ANALYTICS QUERIES
// ============================================================================

/**
 * Get user engagement metrics
 */
export async function getUserEngagementMetrics(
  userId: string,
  context: Ctx,
  options: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
    eventTypes?: string[];
  } = {}
): Promise<{
  totalEvents: number;
  uniqueEventTypes: number;
  averageEventsPerDay: number;
  mostActiveDay: string;
  topEventTypes: Array<{ eventType: string; count: number }>;
  engagementScore: number;
}> {
  const { timeframe = 'month', eventTypes } = options;

  const timeCondition = {
    day: sql`${userAnalyticsEvents.createdAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${userAnalyticsEvents.createdAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${userAnalyticsEvents.createdAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${userAnalyticsEvents.createdAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const conditions = [eq(userAnalyticsEvents.userId, userId), timeCondition];

  if (eventTypes && eventTypes.length > 0) {
    conditions.push(sql`${userAnalyticsEvents.eventType} = ANY(${eventTypes})`);
  }

  const [totalStats, eventTypeStats, dailyStats] = await Promise.all([
    // Total events and unique event types
    db
      .select({
        totalEvents: count(userAnalyticsEvents.id),
        uniqueEventTypes: count(sql`DISTINCT ${userAnalyticsEvents.eventType}`),
      })
      .from(userAnalyticsEvents)
      .where(and(...conditions)),

    // Top event types
    db
      .select({
        eventType: userAnalyticsEvents.eventType,
        count: count(userAnalyticsEvents.id),
      })
      .from(userAnalyticsEvents)
      .where(and(...conditions))
      .groupBy(userAnalyticsEvents.eventType)
      .orderBy(desc(count(userAnalyticsEvents.id)))
      .limit(5),

    // Daily activity for most active day
    db
      .select({
        day: sql<string>`DATE(${userAnalyticsEvents.createdAt})`,
        count: count(userAnalyticsEvents.id),
      })
      .from(userAnalyticsEvents)
      .where(and(...conditions))
      .groupBy(sql`DATE(${userAnalyticsEvents.createdAt})`)
      .orderBy(desc(count(userAnalyticsEvents.id)))
      .limit(1),
  ]);

  const totalEvents = totalStats[0]?.totalEvents ?? 0;
  const uniqueEventTypes = totalStats[0]?.uniqueEventTypes ?? 0;
  const mostActiveDay = dailyStats[0]?.day ?? '';

  // Calculate engagement score (0-100)
  const engagementScore = Math.min(100, (totalEvents / 30) * 10); // Normalize to 30-day period

  return {
    totalEvents,
    uniqueEventTypes,
    averageEventsPerDay: totalEvents / 30, // Assuming 30-day period
    mostActiveDay,
    topEventTypes: eventTypeStats,
    engagementScore,
  };
}

/**
 * Get content performance analytics
 */
export async function getContentPerformanceAnalytics(
  authorId: string,
  context: Ctx,
  options: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
    contentType?: string;
  } = {}
): Promise<{
  totalContent: number;
  publishedContent: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  averageViewsPerContent: number;
  topPerformingContent: Array<{
    id: string;
    title: string;
    views: number;
    likes: number;
    shares: number;
  }>;
  contentEngagementRate: number;
}> {
  const { timeframe = 'month', contentType } = options;

  const timeCondition = {
    day: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const conditions = [
    eq(contentItems.authorId, authorId),
    eq(contentItems.status, 'published'),
    timeCondition,
  ];

  if (contentType) {
    conditions.push(eq(contentItems.contentType, contentType as any));
  }

  const [totalStats, topContent] = await Promise.all([
    // Overall content statistics
    db
      .select({
        totalContent: count(contentItems.id),
        publishedContent: count(
          sql`CASE WHEN ${contentItems.status} = 'published' THEN 1 END`
        ),
        totalViews: sql<number>`COALESCE(SUM(${contentItems.viewCount}), 0)`,
        totalLikes: sql<number>`COALESCE(SUM(${contentItems.likeCount}), 0)`,
        totalShares: sql<number>`COALESCE(SUM(${contentItems.shareCount}), 0)`,
        totalComments: sql<number>`COALESCE(SUM(${contentItems.commentCount}), 0)`,
      })
      .from(contentItems)
      .where(and(...conditions)),

    // Top performing content
    db
      .select({
        id: contentItems.id,
        title: contentItems.title,
        views: sql<number>`COALESCE(${contentItems.viewCount}, 0)`,
        likes: sql<number>`COALESCE(${contentItems.likeCount}, 0)`,
        shares: sql<number>`COALESCE(${contentItems.shareCount}, 0)`,
      })
      .from(contentItems)
      .where(and(...conditions))
      .orderBy(
        desc(
          sql`${contentItems.viewCount} + ${contentItems.likeCount} + ${contentItems.shareCount}`
        )
      )
      .limit(10),
  ]);

  const totalContent = totalStats[0]?.totalContent ?? 0;
  const totalViews = totalStats[0]?.totalViews ?? 0;
  const totalLikes = totalStats[0]?.totalLikes ?? 0;
  const totalShares = totalStats[0]?.totalShares ?? 0;

  return {
    totalContent,
    publishedContent: totalStats[0]?.publishedContent ?? 0,
    totalViews,
    totalLikes,
    totalShares,
    totalComments: totalStats[0]?.totalComments ?? 0,
    averageViewsPerContent: totalContent > 0 ? totalViews / totalContent : 0,
    topPerformingContent: topContent,
    contentEngagementRate:
      totalViews > 0 ? (totalLikes + totalShares) / totalViews : 0,
  };
}

/**
 * Get community engagement analytics
 */
export async function getCommunityEngagementAnalytics(
  communityId: string,
  context: Ctx,
  options: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
  } = {}
): Promise<{
  totalMembers: number;
  activeMembers: number;
  newMembers: number;
  totalPosts: number;
  totalComments: number;
  totalVotes: number;
  averagePostsPerMember: number;
  memberRetentionRate: number;
  topContributors: Array<{
    userId: string;
    displayName: string;
    postCount: number;
    commentCount: number;
  }>;
}> {
  const { timeframe = 'month' } = options;

  const timeCondition = {
    day: sql`${communityMemberships.joinedAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${communityMemberships.joinedAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${communityMemberships.joinedAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${communityMemberships.joinedAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const [memberStats, postStats, topContributors] = await Promise.all([
    // Member statistics
    db
      .select({
        totalMembers: count(communityMemberships.id),
        activeMembers: count(
          sql`CASE WHEN ${communityMemberships.status} = 'active' THEN 1 END`
        ),
        newMembers: count(sql`CASE WHEN ${timeCondition} THEN 1 END`),
      })
      .from(communityMemberships)
      .where(eq(communityMemberships.communityId, communityId)),

    // Post statistics
    db
      .select({
        totalPosts: count(sql`DISTINCT ${userContentInteractions.contentId}`),
        totalComments: count(
          sql`CASE WHEN ${userContentInteractions.interactionType} = 'comment' THEN 1 END`
        ),
        totalVotes: count(
          sql`CASE WHEN ${userContentInteractions.interactionType} = 'vote' THEN 1 END`
        ),
      })
      .from(userContentInteractions)
      .where(
        and(eq(userContentInteractions.communityId, communityId), timeCondition)
      ),

    // Top contributors
    db
      .select({
        userId: userContentInteractions.userId,
        displayName: sql<string>`COALESCE(${userProfiles.displayName}, ${userProfiles.firstName} || ' ' || ${userProfiles.lastName})`,
        postCount: count(
          sql`CASE WHEN ${userContentInteractions.interactionType} = 'post' THEN 1 END`
        ),
        commentCount: count(
          sql`CASE WHEN ${userContentInteractions.interactionType} = 'comment' THEN 1 END`
        ),
      })
      .from(userContentInteractions)
      .leftJoin(
        userProfiles,
        eq(userContentInteractions.userId, userProfiles.id)
      )
      .where(
        and(eq(userContentInteractions.communityId, communityId), timeCondition)
      )
      .groupBy(userContentInteractions.userId, userProfiles.displayName)
      .orderBy(desc(count(userContentInteractions.id)))
      .limit(10),
  ]);

  const totalMembers = memberStats[0]?.totalMembers ?? 0;
  const activeMembers = memberStats[0]?.activeMembers ?? 0;
  const totalPosts = postStats[0]?.totalPosts ?? 0;

  return {
    totalMembers,
    activeMembers,
    newMembers: memberStats[0]?.newMembers ?? 0,
    totalPosts,
    totalComments: postStats[0]?.totalComments ?? 0,
    totalVotes: postStats[0]?.totalVotes ?? 0,
    averagePostsPerMember: totalMembers > 0 ? totalPosts / totalMembers : 0,
    memberRetentionRate: totalMembers > 0 ? activeMembers / totalMembers : 0,
    topContributors,
  };
}

/**
 * Get organization analytics
 */
export async function getOrganizationAnalytics(
  organizationId: string,
  context: Ctx,
  options: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
  } = {}
): Promise<{
  totalMembers: number;
  activeMembers: number;
  newMembers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  totalRevenue: number;
  memberGrowthRate: number;
  revenueGrowthRate: number;
  topPerformingMembers: Array<{
    userId: string;
    displayName: string;
    contentCount: number;
    engagementScore: number;
  }>;
}> {
  const { timeframe = 'month' } = options;

  const timeCondition = {
    day: sql`${organizationMemberships.joinedAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${organizationMemberships.joinedAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${organizationMemberships.joinedAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${organizationMemberships.joinedAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const [memberStats, subscriptionStats, topMembers] = await Promise.all([
    // Member statistics
    db
      .select({
        totalMembers: count(organizationMemberships.id),
        activeMembers: count(
          sql`CASE WHEN ${organizationMemberships.status} = 'active' THEN 1 END`
        ),
        newMembers: count(sql`CASE WHEN ${timeCondition} THEN 1 END`),
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

    // Top performing members
    db
      .select({
        userId: userProfiles.id,
        displayName: sql<string>`COALESCE(${userProfiles.displayName}, ${userProfiles.firstName} || ' ' || ${userProfiles.lastName})`,
        contentCount: count(contentItems.id),
        engagementScore: sql<number>`COALESCE(SUM(${userAnalyticsEvents.id}), 0)`,
      })
      .from(userProfiles)
      .leftJoin(contentItems, eq(userProfiles.id, contentItems.authorId))
      .leftJoin(
        userAnalyticsEvents,
        eq(userProfiles.id, userAnalyticsEvents.userId)
      )
      .innerJoin(
        organizationMemberships,
        eq(userProfiles.id, organizationMemberships.userId)
      )
      .where(
        and(
          eq(organizationMemberships.organizationId, organizationId),
          eq(organizationMemberships.status, 'active')
        )
      )
      .groupBy(userProfiles.id, userProfiles.displayName)
      .orderBy(desc(count(contentItems.id)))
      .limit(10),
  ]);

  const totalMembers = memberStats[0]?.totalMembers ?? 0;
  const activeMembers = memberStats[0]?.activeMembers ?? 0;
  const newMembers = memberStats[0]?.newMembers ?? 0;

  return {
    totalMembers,
    activeMembers,
    newMembers,
    totalSubscriptions: subscriptionStats[0]?.totalSubscriptions ?? 0,
    activeSubscriptions: subscriptionStats[0]?.activeSubscriptions ?? 0,
    monthlyRevenue: subscriptionStats[0]?.monthlyRevenue ?? 0,
    totalRevenue: subscriptionStats[0]?.totalRevenue ?? 0,
    memberGrowthRate: totalMembers > 0 ? newMembers / totalMembers : 0,
    revenueGrowthRate: 0, // Would need historical data to calculate
    topPerformingMembers: topMembers,
  };
}

/**
 * Get platform-wide analytics
 */
export async function getPlatformAnalytics(
  context: Ctx,
  options: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
  } = {}
): Promise<{
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalContent: number;
  totalCommunities: number;
  totalOrganizations: number;
  totalSubscriptions: number;
  monthlyRecurringRevenue: number;
  userGrowthRate: number;
  contentGrowthRate: number;
  topContentCategories: Array<{
    categoryId: string;
    categoryName: string;
    contentCount: number;
  }>;
  topCommunities: Array<{
    communityId: string;
    communityName: string;
    memberCount: number;
  }>;
}> {
  const { timeframe = 'month' } = options;

  const timeCondition = {
    day: sql`${userProfiles.createdAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${userProfiles.createdAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${userProfiles.createdAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${userProfiles.createdAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const [
    userStats,
    contentStats,
    communityStats,
    organizationStats,
    subscriptionStats,
    topCategories,
    topCommunities,
  ] = await Promise.all([
    // User statistics
    db
      .select({
        totalUsers: count(userProfiles.id),
        activeUsers: count(
          sql`CASE WHEN ${userProfiles.lastActiveAt} >= NOW() - INTERVAL '30 days' THEN 1 END`
        ),
        newUsers: count(sql`CASE WHEN ${timeCondition} THEN 1 END`),
      })
      .from(userProfiles),

    // Content statistics
    db
      .select({
        totalContent: count(contentItems.id),
        publishedContent: count(
          sql`CASE WHEN ${contentItems.status} = 'published' THEN 1 END`
        ),
      })
      .from(contentItems),

    // Community statistics
    db
      .select({
        totalCommunities: count(communities.id),
        activeCommunities: count(
          sql`CASE WHEN ${communities.isActive} = true THEN 1 END`
        ),
      })
      .from(communities),

    // Organization statistics
    db
      .select({
        totalOrganizations: count(organizations.id),
        activeOrganizations: count(
          sql`CASE WHEN ${organizations.status} = 'active' THEN 1 END`
        ),
      })
      .from(organizations),

    // Subscription statistics
    db
      .select({
        totalSubscriptions: count(userSubscriptions.id),
        activeSubscriptions: count(
          sql`CASE WHEN ${userSubscriptions.status} = 'active' THEN 1 END`
        ),
        monthlyRecurringRevenue: sql<number>`COALESCE(SUM(CASE WHEN ${userSubscriptions.status} = 'active' THEN ${userSubscriptions.amount} ELSE 0 END), 0)`,
      })
      .from(userSubscriptions),

    // Top content categories
    db
      .select({
        categoryId: sql<string>`primary_category_id`,
        categoryName: sql<string>`'Unknown'`, // Would need to join with content_categories
        contentCount: count(contentItems.id),
      })
      .from(contentItems)
      .where(eq(contentItems.status, 'published'))
      .groupBy(sql`primary_category_id`)
      .orderBy(desc(count(contentItems.id)))
      .limit(10),

    // Top communities
    db
      .select({
        communityId: communities.id,
        communityName: communities.name,
        memberCount: sql<number>`COALESCE(${communities.currentMemberCount}, 0)`,
      })
      .from(communities)
      .where(eq(communities.isActive, true))
      .orderBy(desc(communities.currentMemberCount))
      .limit(10),
  ]);

  const totalUsers = userStats[0]?.totalUsers ?? 0;
  const newUsers = userStats[0]?.newUsers ?? 0;
  const totalContent = contentStats[0]?.totalContent ?? 0;

  return {
    totalUsers,
    activeUsers: userStats[0]?.activeUsers ?? 0,
    newUsers,
    totalContent,
    totalCommunities: communityStats[0]?.totalCommunities ?? 0,
    totalOrganizations: organizationStats[0]?.totalOrganizations ?? 0,
    totalSubscriptions: subscriptionStats[0]?.totalSubscriptions ?? 0,
    monthlyRecurringRevenue: subscriptionStats[0]?.monthlyRecurringRevenue ?? 0,
    userGrowthRate: totalUsers > 0 ? newUsers / totalUsers : 0,
    contentGrowthRate: 0, // Would need historical data to calculate
    topContentCategories: topCategories,
    topCommunities,
  };
}

/**
 * Get assessment analytics
 */
export async function getAssessmentAnalytics(
  context: Ctx,
  options: {
    assessmentId?: string;
    timeframe?: 'day' | 'week' | 'month' | 'year';
  } = {}
): Promise<{
  totalAssessments: number;
  completedAssessments: number;
  completionRate: number;
  averageScore: number;
  averageCompletionTime: number;
  topGifts: Array<{
    gift: string;
    count: number;
    percentage: number;
  }>;
  culturalDistribution: Array<{
    culturalContext: string;
    count: number;
    percentage: number;
  }>;
}> {
  const { assessmentId, timeframe = 'month' } = options;

  const timeCondition = {
    day: sql`${userAssessments.createdAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${userAssessments.createdAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${userAssessments.createdAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${userAssessments.createdAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const conditions = [timeCondition];
  if (assessmentId) {
    conditions.push(eq(userAssessments.assessmentId, assessmentId));
  }

  const [totalStats, giftStats, culturalStats] = await Promise.all([
    // Overall assessment statistics
    db
      .select({
        totalAssessments: count(userAssessments.id),
        completedAssessments: count(
          sql`CASE WHEN ${userAssessments.completedAt} IS NOT NULL THEN 1 END`
        ),
        averageScore: sql<number>`COALESCE(AVG(${userAssessments.totalScore}), 0)`,
        averageCompletionTime: sql<number>`COALESCE(AVG(${userAssessments.completionTime}), 0)`,
      })
      .from(userAssessments)
      .where(and(...conditions)),

    // Top gifts distribution
    db
      .select({
        gift: userAssessments.primaryGift,
        count: count(userAssessments.id),
      })
      .from(userAssessments)
      .where(
        and(
          ...conditions,
          sql`${userAssessments.completedAt} IS NOT NULL`,
          sql`${userAssessments.primaryGift} IS NOT NULL`
        )
      )
      .groupBy(userAssessments.primaryGift)
      .orderBy(desc(count(userAssessments.id)))
      .limit(10),

    // Cultural distribution
    db
      .select({
        culturalContext: userProfiles.culturalContext,
        count: count(userAssessments.id),
      })
      .from(userAssessments)
      .leftJoin(userProfiles, eq(userAssessments.userId, userProfiles.id))
      .where(
        and(...conditions, sql`${userAssessments.completedAt} IS NOT NULL`)
      )
      .groupBy(userProfiles.culturalContext)
      .orderBy(desc(count(userAssessments.id)))
      .limit(10),
  ]);

  const totalAssessments = totalStats[0]?.totalAssessments ?? 0;
  const completedAssessments = totalStats[0]?.completedAssessments ?? 0;
  const totalGiftCount = giftStats.reduce((sum, item) => sum + item.count, 0);
  const totalCulturalCount = culturalStats.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return {
    totalAssessments,
    completedAssessments,
    completionRate:
      totalAssessments > 0 ? completedAssessments / totalAssessments : 0,
    averageScore: totalStats[0]?.averageScore ?? 0,
    averageCompletionTime: totalStats[0]?.averageCompletionTime ?? 0,
    topGifts: giftStats.map(item => ({
      gift: item.gift ?? 'Unknown',
      count: item.count,
      percentage: totalGiftCount > 0 ? (item.count / totalGiftCount) * 100 : 0,
    })),
    culturalDistribution: culturalStats.map(item => ({
      culturalContext: item.culturalContext ?? 'Unknown',
      count: item.count,
      percentage:
        totalCulturalCount > 0 ? (item.count / totalCulturalCount) * 100 : 0,
    })),
  };
}
