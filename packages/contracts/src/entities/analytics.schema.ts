import { z } from 'zod';

// ============================================================================
// ANALYTICS & TRACKING ENTITY SCHEMAS
// ============================================================================
// Placeholder schemas for analytics and tracking functionality

// User Analytics Event Entity Schema
export const userAnalyticsEventEntitySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  eventType: z.string().min(1).max(100),
  eventName: z.string().min(1).max(100),
  properties: z.record(z.unknown()).optional(),
  sessionId: z.string().optional(),
  pageUrl: z.string().url().optional(),
  referrer: z.string().url().optional(),
  userAgent: z.string().max(500).optional(),
  ipAddress: z.string().ip().optional(),
  timestamp: z.string().datetime(),
  createdAt: z.string().datetime(),
});

// User Content Interaction Entity Schema
export const userContentInteractionEntitySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  interactionType: z.enum([
    'view',
    'like',
    'share',
    'bookmark',
    'comment',
    'download',
  ]),
  duration: z.number().int().min(0).optional(), // in seconds
  metadata: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime(),
  createdAt: z.string().datetime(),
});

// Learning Outcome Entity Schema
export const learningOutcomeEntitySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid().optional(),
  contentId: z.string().uuid().optional(),
  outcomeType: z.enum(['knowledge', 'skill', 'attitude', 'behavior']),
  description: z.string().min(1).max(500),
  score: z.number().min(0).max(100).optional(),
  evidence: z.string().max(1000).optional(),
  achievedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Movement Metric Entity Schema
export const movementMetricEntitySchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid().optional(),
  metricType: z.enum(['engagement', 'growth', 'impact', 'revenue', 'reach']),
  metricName: z.string().min(1).max(100),
  value: z.number(),
  unit: z.string().max(20).optional(),
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Performance Report Entity Schema
export const performanceReportEntitySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  reportType: z.enum(['individual', 'organization', 'system']),
  period: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  metrics: z.record(z.unknown()),
  insights: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
  generatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// CREATE SCHEMAS
// ============================================================================

export const createUserAnalyticsEventSchema =
  userAnalyticsEventEntitySchema.omit({
    id: true,
    createdAt: true,
  });

export const createUserContentInteractionSchema =
  userContentInteractionEntitySchema.omit({
    id: true,
    createdAt: true,
  });

export const createLearningOutcomeSchema = learningOutcomeEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createMovementMetricSchema = movementMetricEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createPerformanceReportSchema = performanceReportEntitySchema.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  }
);

// ============================================================================
// UPDATE SCHEMAS
// ============================================================================

export const updateLearningOutcomeSchema =
  createLearningOutcomeSchema.partial();
export const updateMovementMetricSchema = createMovementMetricSchema.partial();
export const updatePerformanceReportSchema =
  createPerformanceReportSchema.partial();

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type UserAnalyticsEventEntity = z.infer<
  typeof userAnalyticsEventEntitySchema
>;
export type UserContentInteractionEntity = z.infer<
  typeof userContentInteractionEntitySchema
>;
export type LearningOutcomeEntity = z.infer<typeof learningOutcomeEntitySchema>;
export type MovementMetricEntity = z.infer<typeof movementMetricEntitySchema>;
export type PerformanceReportEntity = z.infer<
  typeof performanceReportEntitySchema
>;

export type CreateUserAnalyticsEvent = z.infer<
  typeof createUserAnalyticsEventSchema
>;
export type CreateUserContentInteraction = z.infer<
  typeof createUserContentInteractionSchema
>;
export type CreateLearningOutcome = z.infer<typeof createLearningOutcomeSchema>;
export type CreateMovementMetric = z.infer<typeof createMovementMetricSchema>;
export type CreatePerformanceReport = z.infer<
  typeof createPerformanceReportSchema
>;

export type UpdateLearningOutcome = z.infer<typeof updateLearningOutcomeSchema>;
export type UpdateMovementMetric = z.infer<typeof updateMovementMetricSchema>;
export type UpdatePerformanceReport = z.infer<
  typeof updatePerformanceReportSchema
>;

// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================

export const userAnalyticsEventSchema = userAnalyticsEventEntitySchema;
export const userContentInteractionSchema = userContentInteractionEntitySchema;
export const learningOutcomeSchema = learningOutcomeEntitySchema;
export const movementMetricSchema = movementMetricEntitySchema;
export const performanceReportSchema = performanceReportEntitySchema;
export const newUserAnalyticsEventSchema = createUserAnalyticsEventSchema;
export const newUserContentInteractionSchema =
  createUserContentInteractionSchema;

// Legacy aliases for backward compatibility
export type UserAnalyticsEvent = UserAnalyticsEventEntity;
export type UserContentInteraction = UserContentInteractionEntity;
export type LearningOutcome = LearningOutcomeEntity;
export type MovementMetric = MovementMetricEntity;
export type PerformanceReport = PerformanceReportEntity;

export type NewUserAnalyticsEvent = CreateUserAnalyticsEvent;
export type NewUserContentInteraction = CreateUserContentInteraction;
export type NewLearningOutcome = CreateLearningOutcome;
export type NewMovementMetric = CreateMovementMetric;
export type NewPerformanceReport = CreatePerformanceReport;
