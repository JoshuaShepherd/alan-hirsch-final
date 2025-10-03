import { z } from 'zod';

// User Analytics Event Validation Schemas - ⏳ PLANNED
export const eventTypeSchema = z.enum([
  'page_view',
  'content_view',
  'content_interaction',
  'search',
  'assessment_start',
  'assessment_complete',
  'ai_conversation',
  'community_post',
  'subscription_event',
  'error'
]);

export const deviceTypeSchema = z.enum([
  'desktop',
  'tablet',
  'mobile',
  'other'
]);

export const apestProfileSchema = z.object({
  primary: z.string(),
  scores: z.record(z.string(), z.number())
});

export const ministryContextSchema = z.object({
  role: z.string(),
  experience: z.number().int().min(0)
});

export const userAnalyticsEventSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  
  // Event Classification
  eventType: eventTypeSchema,
  eventCategory: z.string().optional(),
  eventAction: z.string().min(1),
  eventLabel: z.string().optional(),
  
  // Context & Metadata
  pageUrl: z.string().url().optional(),
  referrer: z.string().url().optional(),
  userAgent: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  
  // Content Attribution
  contentId: z.string().uuid().optional(),
  contentType: z.string().optional(),
  
  // Network Attribution
  leaderProfileId: z.string().uuid().optional(),
  
  // Session Information
  sessionId: z.string().optional(),
  sessionDuration: z.number().int().min(0).optional(), // seconds
  
  // Engagement Metrics
  timeOnPage: z.number().int().min(0).optional(), // seconds
  scrollDepth: z.number().int().min(0).max(100).optional(), // percentage
  clickCount: z.number().int().min(0).default(0),
  
  // Personalization Data
  apestProfile: apestProfileSchema.optional(),
  ministryContext: ministryContextSchema.optional(),
  
  // UTM Tracking
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  
  // Device & Technical
  deviceType: deviceTypeSchema.optional(),
  browserName: z.string().optional(),
  operatingSystem: z.string().optional(),
  screenResolution: z.string().optional(),
  
  // Geographic
  country: z.string().length(2).optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  timezone: z.string().optional(),
  
  // Custom Properties
  properties: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  createdAt: z.date()
});

export const newUserAnalyticsEventSchema = userAnalyticsEventSchema.omit({
  createdAt: true
}).partial({
  id: true
});

// User Content Interaction Validation Schemas
export const interactionTypeSchema = z.enum([
  'view',
  'like',
  'bookmark',
  'share',
  'comment',
  'download',
  'complete'
]);

export const interactionStatusSchema = z.enum([
  'not_started',
  'in_progress',
  'completed',
  'bookmarked',
  'skipped'
]);

export const implementationStatusSchema = z.enum([
  'not_applicable',
  'planning',
  'implementing',
  'implemented',
  'abandoned'
]);

export const userContentInteractionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  
  // Interaction Type
  interactionType: interactionTypeSchema,
  
  // Progress Tracking
  progressPercentage: z.number().int().min(0).max(100).default(0),
  timeSpentMinutes: z.number().int().min(0).default(0),
  
  // Learning Status
  status: interactionStatusSchema.default('not_started'),
  
  // Implementation Tracking
  implementationStatus: implementationStatusSchema.optional(),
  implementationNotes: z.string().optional(),
  
  // Quality & Feedback
  rating: z.number().int().min(1).max(5).optional(),
  feedback: z.string().optional(),
  wouldRecommend: z.boolean().optional(),
  
  // Timestamps
  firstAccessedAt: z.date(),
  lastAccessedAt: z.date(),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newUserContentInteractionSchema = userContentInteractionSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  completedAt: true
});

// Learning Outcome Validation Schemas
export const outcomeTypeSchema = z.enum([
  'knowledge_gain',
  'skill_development',
  'behavior_change',
  'ministry_impact',
  'leadership_growth',
  'theological_understanding'
]);

export const measurementMethodSchema = z.enum([
  'self_reported',
  'peer_observed',
  'supervisor_confirmed',
  'objective_metric'
]);

export const verifiedBySchema = z.enum([
  'self',
  'peer',
  'supervisor',
  'third_party'
]);

export const ministryContextLearningSchema = z.object({
  setting: z.string(),
  scope: z.string(),
  duration: z.string()
});

export const learningOutcomeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid().optional(),
  
  // Outcome Classification
  outcomeType: outcomeTypeSchema,
  
  // Measurement
  outcomeDescription: z.string().min(1),
  measurementMethod: measurementMethodSchema,
  
  // Quantitative Measures
  baselineScore: z.number().int().min(0).optional(),
  currentScore: z.number().int().min(0).optional(),
  improvementPercentage: z.number().optional(),
  
  // Verification
  verifiedBy: verifiedBySchema.default('self'),
  verificationNotes: z.string().optional(),
  
  // Context
  ministryContext: ministryContextLearningSchema.optional(),
  
  // Timeline
  measuredAt: z.date(),
  followUpScheduledAt: z.date().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newLearningOutcomeSchema = learningOutcomeSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  followUpScheduledAt: true
});

// Movement Metrics Validation Schemas
export const metricTypeSchema = z.enum([
  'user_growth',
  'content_engagement',
  'assessment_completion',
  'community_activity',
  'leader_development',
  'network_expansion',
  'revenue_growth'
]);

export const periodTypeSchema = z.enum([
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'annual'
]);

export const movementMetricSchema = z.object({
  id: z.string().uuid(),
  
  // Geographic Scope
  region: z.string().min(1),
  subregion: z.string().optional(),
  
  // Metric Classification
  metricType: metricTypeSchema,
  
  // Measurement Period
  periodType: periodTypeSchema,
  periodStart: z.date(),
  periodEnd: z.date(),
  
  // Metrics Data
  value: z.number(),
  previousValue: z.number().optional(),
  changePercentage: z.number().optional(),
  
  // Context & Breakdown
  breakdown: z.record(z.string(), z.number()).default({}),
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  createdAt: z.date()
});

export const newMovementMetricSchema = movementMetricSchema.omit({
  createdAt: true
}).partial({
  id: true
});

// Performance Report Validation Schemas
export const reportTypeSchema = z.enum([
  'leader_dashboard',
  'content_performance',
  'network_analytics',
  'revenue_summary',
  'engagement_report',
  'assessment_insights'
]);

export const reportStatusSchema = z.enum([
  'generating',
  'completed',
  'failed'
]);

export const keyMetricsSchema = z.object({
  totalViews: z.number().int().min(0),
  uniqueUsers: z.number().int().min(0),
  engagementRate: z.number().min(0).max(1),
  revenue: z.number().min(0),
  networkGrowth: z.number().min(0)
});

export const performanceReportSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  
  // Report Configuration
  reportType: reportTypeSchema,
  
  // Time Period
  periodStart: z.date(),
  periodEnd: z.date(),
  
  // Report Data
  data: z.record(z.string(), z.any()),
  
  // Key Metrics Summary
  keyMetrics: keyMetricsSchema.optional(),
  
  // Insights & Recommendations
  insights: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
  
  // Status
  status: reportStatusSchema.default('generating'),
  
  // Timestamps
  generatedAt: z.date(),
  createdAt: z.date()
});

export const newPerformanceReportSchema = performanceReportSchema.omit({
  createdAt: true
}).partial({
  id: true
});

// Type exports
export type UserAnalyticsEvent = z.infer<typeof userAnalyticsEventSchema>;
export type NewUserAnalyticsEvent = z.infer<typeof newUserAnalyticsEventSchema>;
export type UserContentInteraction = z.infer<typeof userContentInteractionSchema>;
export type NewUserContentInteraction = z.infer<typeof newUserContentInteractionSchema>;
export type LearningOutcome = z.infer<typeof learningOutcomeSchema>;
export type NewLearningOutcome = z.infer<typeof newLearningOutcomeSchema>;
export type MovementMetric = z.infer<typeof movementMetricSchema>;
export type NewMovementMetric = z.infer<typeof newMovementMetricSchema>;
export type PerformanceReport = z.infer<typeof performanceReportSchema>;
export type NewPerformanceReport = z.infer<typeof newPerformanceReportSchema>;
