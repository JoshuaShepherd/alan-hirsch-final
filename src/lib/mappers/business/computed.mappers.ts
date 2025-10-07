// Auto-generated computed mappers
// Generated at: 2025-10-06T17:55:56.828Z

// Transform user engagement metrics
export function userEngagementMetricsMapper(
  userId: string,
  analytics: any[],
  assessments: any[],
  interactions: any[]
): any {
  const contentViews = analytics.filter(a => a.eventType === 'content_view').length;
  const assessmentsCompleted = assessments.filter(a => a.status === 'completed').length;
  const communityPosts = analytics.filter(a => a.eventType === 'community_post').length;

  return {
    userId,
    contentViews,
    assessmentsCompleted,
    communityPosts,
    engagementScore: calculateEngagementScore(contentViews, assessmentsCompleted, communityPosts),
    lastActiveAt: analytics.length > 0 ? analytics[0].createdAt : null,
  };
}

// Transform content performance metrics
export function contentPerformanceMetricsMapper(
  contentId: string,
  viewCount: number,
  engagementScore: number,
  shareCount: number,
  commentCount: number,
  averageRating: number | null
): any {
  return {
    contentId,
    viewCount,
    engagementScore,
    shareCount,
    commentCount,
    averageRating,
  };
}

// Transform assessment completion stats
export function assessmentCompletionStatsMapper(
  assessmentId: string,
  totalAttempts: number,
  completedAttempts: number,
  averageScore: number | null,
  averageCompletionTime: number | null
): any {
  return {
    assessmentId,
    totalAttempts,
    completedAttempts,
    averageScore,
    averageCompletionTime,
  };
}

// Helper function to calculate engagement score
function calculateEngagementScore(views: number, assessments: number, posts: number): number {
  return views * 1 + assessments * 5 + posts * 3;
}
