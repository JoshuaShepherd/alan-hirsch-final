// Auto-generated types for business
// Generated at: 2025-10-06T16:27:57.960Z

export interface UserEngagementMetrics {
  userId: string;
  contentViews: number;
  assessmentsCompleted: number;
  communityPosts: number;
  engagementScore: number;
  lastActiveAt: string | null;
}

export interface ContentPerformanceMetrics {
  contentId: string;
  viewCount: number;
  engagementScore: number;
  shareCount: number;
  commentCount: number;
  averageRating: number | null;
}

export interface AssessmentCompletionStats {
  assessmentId: string;
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number | null;
  averageCompletionTime: number | null;
}
