// Auto-generated contracts for business
// Generated at: 2025-10-06T14:05:02.271Z

import { z } from 'zod';

// User engagement metrics validation schema
export const userEngagementMetricsSchema = z.object({
  userId: z.string().uuid(),
  contentViews: z.number().int().nonnegative(),
  assessmentsCompleted: z.number().int().nonnegative(),
  communityPosts: z.number().int().nonnegative(),
  engagementScore: z.number().nonnegative(),
  lastActiveAt: z.string().datetime().nullable(),
});

// Content performance metrics validation schema
export const contentPerformanceMetricsSchema = z.object({
  contentId: z.string().uuid(),
  viewCount: z.number().int().nonnegative(),
  engagementScore: z.number().nonnegative(),
  shareCount: z.number().int().nonnegative(),
  commentCount: z.number().int().nonnegative(),
  averageRating: z.number().min(1).max(5).nullable(),
});


