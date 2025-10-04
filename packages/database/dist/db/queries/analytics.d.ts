import type { QueryContext } from './index';
/**
 * Get user engagement metrics
 */
export declare function getUserEngagementMetrics(userId: string, context: QueryContext, options?: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
    eventTypes?: string[];
}): Promise<{
    totalEvents: number;
    uniqueEventTypes: number;
    averageEventsPerDay: number;
    mostActiveDay: string;
    topEventTypes: Array<{
        eventType: string;
        count: number;
    }>;
    engagementScore: number;
}>;
/**
 * Get content performance analytics
 */
export declare function getContentPerformanceAnalytics(authorId: string, context: QueryContext, options?: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
    contentType?: string;
}): Promise<{
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
}>;
/**
 * Get community engagement analytics
 */
export declare function getCommunityEngagementAnalytics(communityId: string, context: QueryContext, options?: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
}): Promise<{
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
}>;
/**
 * Get organization analytics
 */
export declare function getOrganizationAnalytics(organizationId: string, context: QueryContext, options?: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
}): Promise<{
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
}>;
/**
 * Get platform-wide analytics
 */
export declare function getPlatformAnalytics(context: QueryContext, options?: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
}): Promise<{
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
}>;
/**
 * Get assessment analytics
 */
export declare function getAssessmentAnalytics(context: QueryContext, options?: {
    assessmentId?: string;
    timeframe?: 'day' | 'week' | 'month' | 'year';
}): Promise<{
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
}>;
//# sourceMappingURL=analytics.d.ts.map