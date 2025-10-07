// Auto-generated contracts for analytics
// Generated at: 2025-10-06T20:01:40.350Z

import { z } from 'zod';

// Entity validation schema for userAnalyticsEvents
export const userAnalyticsEventsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid().nullable(),
  eventType: z.string().nullable(),
  eventCategory: z.string().nullable(),
  eventAction: z.string(),
  eventLabel: z.string().nullable(),
  pageUrl: z.string().nullable(),
  referrer: z.string().nullable(),
  userAgent: z.string().nullable(),
  ipAddress: z.string().nullable(),
  contentId: z.string().uuid().nullable(),
  contentType: z.string().nullable(),
  leaderProfileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  communityId: z.string().uuid().nullable(),
  sessionId: z.string().nullable(),
  sessionDuration: z.number().int().nullable(),
  timeOnPage: z.number().int().nullable(),
  scrollDepth: z.number().int().nullable(),
  clickCount: z.number().int().default(0).nullable(),
  apestProfile: z.any(),
  ministryContext: z.any(),
  utmSource: z.string().nullable(),
  utmMedium: z.string().nullable(),
  utmCampaign: z.string().nullable(),
  utmTerm: z.string().nullable(),
  utmContent: z.string().nullable(),
  deviceType: z.string().nullable(),
  browserName: z.string().nullable(),
  operatingSystem: z.string().nullable(),
  screenResolution: z.string().nullable(),
  country: z.string().nullable(),
  region: z.string().nullable(),
  city: z.string().nullable(),
  timezone: z.string().nullable(),
  properties: z.any(),
  createdAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userAnalyticsEvents
export const createuserAnalyticsEventsSchema = z.object({
  userId: z.string().uuid(),
  eventType: z.string(),
  eventCategory: z.string(),
  eventAction: z.string(),
  eventLabel: z.string(),
  pageUrl: z.string(),
  referrer: z.string(),
  userAgent: z.string(),
  ipAddress: z.string(),
  contentId: z.string().uuid(),
  contentType: z.string(),
  leaderProfileId: z.string().uuid(),
  organizationId: z.string().uuid(),
  communityId: z.string().uuid(),
  sessionId: z.string(),
  sessionDuration: z.number().int(),
  timeOnPage: z.number().int(),
  scrollDepth: z.number().int(),
  clickCount: z.number().int().optional().default(0),
  apestProfile: z.any().optional(),
  ministryContext: z.any().optional(),
  utmSource: z.string(),
  utmMedium: z.string(),
  utmCampaign: z.string(),
  utmTerm: z.string(),
  utmContent: z.string(),
  deviceType: z.string(),
  browserName: z.string(),
  operatingSystem: z.string(),
  screenResolution: z.string(),
  country: z.string(),
  region: z.string(),
  city: z.string(),
  timezone: z.string(),
  properties: z.any().optional(),
});

// Update validation schema for userAnalyticsEvents
export const updateuserAnalyticsEventsSchema = z
  .object({
    userId: z.string().uuid(),
    eventType: z.string(),
    eventCategory: z.string(),
    eventAction: z.string(),
    eventLabel: z.string(),
    pageUrl: z.string(),
    referrer: z.string(),
    userAgent: z.string(),
    ipAddress: z.string(),
    contentId: z.string().uuid(),
    contentType: z.string(),
    leaderProfileId: z.string().uuid(),
    organizationId: z.string().uuid(),
    communityId: z.string().uuid(),
    sessionId: z.string(),
    sessionDuration: z.number().int(),
    timeOnPage: z.number().int(),
    scrollDepth: z.number().int(),
    clickCount: z.number().int().optional().default(0),
    apestProfile: z.any().optional(),
    ministryContext: z.any().optional(),
    utmSource: z.string(),
    utmMedium: z.string(),
    utmCampaign: z.string(),
    utmTerm: z.string(),
    utmContent: z.string(),
    deviceType: z.string(),
    browserName: z.string(),
    operatingSystem: z.string(),
    screenResolution: z.string(),
    country: z.string(),
    region: z.string(),
    city: z.string(),
    timezone: z.string(),
    properties: z.any().optional(),
  })
  .partial();

// Query validation schema for userAnalyticsEvents
export const userAnalyticsEventsQuerySchema = z.object({
  userId: z.string().uuid(),
  eventType: z.string(),
  eventCategory: z.string(),
  eventAction: z.string(),
  eventLabel: z.string(),
  pageUrl: z.string(),
  referrer: z.string(),
  userAgent: z.string(),
  ipAddress: z.string(),
  contentId: z.string().uuid(),
  contentType: z.string(),
  leaderProfileId: z.string().uuid(),
  organizationId: z.string().uuid(),
  communityId: z.string().uuid(),
  sessionId: z.string(),
  sessionDuration: z.number().int(),
  timeOnPage: z.number().int(),
  scrollDepth: z.number().int(),
  clickCount: z.number().int().optional().default(0),
  apestProfile: z.any().optional(),
  ministryContext: z.any().optional(),
  utmSource: z.string(),
  utmMedium: z.string(),
  utmCampaign: z.string(),
  utmTerm: z.string(),
  utmContent: z.string(),
  deviceType: z.string(),
  browserName: z.string(),
  operatingSystem: z.string(),
  screenResolution: z.string(),
  country: z.string(),
  region: z.string(),
  city: z.string(),
  timezone: z.string(),
  properties: z.any().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for userContentInteractions
export const userContentInteractionsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  communityId: z.string().uuid().nullable(),
  interactionType: z.string().nullable(),
  progressPercentage: z.number().int().default(0).nullable(),
  timeSpentMinutes: z.number().int().default(0).nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  implementationStatus: z.string().nullable(),
  implementationNotes: z.string().nullable(),
  rating: z.number().int().nullable(),
  feedback: z.string().nullable(),
  wouldRecommend: z.boolean().nullable(),
  firstAccessedAt: z.string().datetime().default('NOW()'),
  lastAccessedAt: z.string().datetime().default('NOW()'),
  completedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userContentInteractions
export const createuserContentInteractionsSchema = z.object({
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  communityId: z.string().uuid(),
  interactionType: z.string(),
  progressPercentage: z.number().int().optional().default(0),
  timeSpentMinutes: z.number().int().optional().default(0),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  implementationStatus: z.string(),
  implementationNotes: z.string(),
  rating: z.number().int(),
  feedback: z.string(),
  wouldRecommend: z.boolean(),
  firstAccessedAt: z.string().datetime().default('NOW()'),
  lastAccessedAt: z.string().datetime().default('NOW()'),
  completedAt: z.string().datetime(),
});

// Update validation schema for userContentInteractions
export const updateuserContentInteractionsSchema = z
  .object({
    userId: z.string().uuid(),
    contentId: z.string().uuid(),
    communityId: z.string().uuid(),
    interactionType: z.string(),
    progressPercentage: z.number().int().optional().default(0),
    timeSpentMinutes: z.number().int().optional().default(0),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    implementationStatus: z.string(),
    implementationNotes: z.string(),
    rating: z.number().int(),
    feedback: z.string(),
    wouldRecommend: z.boolean(),
    firstAccessedAt: z.string().datetime().optional().default('NOW()'),
    lastAccessedAt: z.string().datetime().optional().default('NOW()'),
    completedAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for userContentInteractions
export const userContentInteractionsQuerySchema = z.object({
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  communityId: z.string().uuid(),
  interactionType: z.string(),
  progressPercentage: z.number().int().optional().default(0),
  timeSpentMinutes: z.number().int().optional().default(0),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  implementationStatus: z.string(),
  implementationNotes: z.string(),
  rating: z.number().int(),
  feedback: z.string(),
  wouldRecommend: z.boolean(),
  firstAccessedAt: z.string().datetime().optional().default('NOW()'),
  lastAccessedAt: z.string().datetime().optional().default('NOW()'),
  completedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for learningOutcomes
export const learningOutcomesEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  contentId: z.string().uuid().nullable(),
  outcomeType: z.string().nullable(),
  outcomeDescription: z.string(),
  measurementMethod: z.string().nullable(),
  baselineScore: z.number().int().nullable(),
  currentScore: z.number().int().nullable(),
  improvementPercentage: z.number().nullable(),
  verifiedBy: z.string().nullable(),
  verificationNotes: z.string().nullable(),
  ministryContext: z.any(),
  measuredAt: z.string().datetime(),
  followUpScheduledAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for learningOutcomes
export const createlearningOutcomesSchema = z.object({
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  outcomeType: z.string(),
  outcomeDescription: z.string(),
  measurementMethod: z.string(),
  baselineScore: z.number().int(),
  currentScore: z.number().int(),
  improvementPercentage: z.number(),
  verifiedBy: z.string(),
  verificationNotes: z.string(),
  ministryContext: z.any().optional(),
  measuredAt: z.string().datetime(),
  followUpScheduledAt: z.string().datetime(),
});

// Update validation schema for learningOutcomes
export const updatelearningOutcomesSchema = z
  .object({
    userId: z.string().uuid(),
    contentId: z.string().uuid(),
    outcomeType: z.string(),
    outcomeDescription: z.string(),
    measurementMethod: z.string(),
    baselineScore: z.number().int(),
    currentScore: z.number().int(),
    improvementPercentage: z.number(),
    verifiedBy: z.string(),
    verificationNotes: z.string(),
    ministryContext: z.any().optional(),
    measuredAt: z.string().datetime(),
    followUpScheduledAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for learningOutcomes
export const learningOutcomesQuerySchema = z.object({
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  outcomeType: z.string(),
  outcomeDescription: z.string(),
  measurementMethod: z.string(),
  baselineScore: z.number().int(),
  currentScore: z.number().int(),
  improvementPercentage: z.number(),
  verifiedBy: z.string(),
  verificationNotes: z.string(),
  ministryContext: z.any().optional(),
  measuredAt: z.string().datetime(),
  followUpScheduledAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for movementMetrics
export const movementMetricsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  region: z.string(),
  subregion: z.string().nullable(),
  metricType: z.string().nullable(),
  periodType: z.string().nullable(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  value: z.number(),
  previousValue: z.number().nullable(),
  changePercentage: z.number().nullable(),
  breakdown: z.any(),
  metadata: z.record(z.string(), z.any()),
  createdAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for movementMetrics
export const createmovementMetricsSchema = z.object({
  region: z.string(),
  subregion: z.string(),
  metricType: z.string(),
  periodType: z.string(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  value: z.number(),
  previousValue: z.number(),
  changePercentage: z.number(),
  breakdown: z.any().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Update validation schema for movementMetrics
export const updatemovementMetricsSchema = z
  .object({
    region: z.string(),
    subregion: z.string(),
    metricType: z.string(),
    periodType: z.string(),
    periodStart: z.string().datetime(),
    periodEnd: z.string().datetime(),
    value: z.number(),
    previousValue: z.number(),
    changePercentage: z.number(),
    breakdown: z.any().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
  })
  .partial();

// Query validation schema for movementMetrics
export const movementMetricsQuerySchema = z.object({
  region: z.string(),
  subregion: z.string(),
  metricType: z.string(),
  periodType: z.string(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  value: z.number(),
  previousValue: z.number(),
  changePercentage: z.number(),
  breakdown: z.any().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for performanceReports
export const performanceReportsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid().nullable(),
  reportType: z.string().nullable(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  data: z.any(),
  keyMetrics: z.any(),
  insights: z.any(),
  recommendations: z.any(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  generatedAt: z.string().datetime().default('NOW()'),
  createdAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for performanceReports
export const createperformanceReportsSchema = z.object({
  userId: z.string().uuid(),
  reportType: z.string(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  data: z.any(),
  keyMetrics: z.any().optional(),
  insights: z.any().optional(),
  recommendations: z.any().optional(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  generatedAt: z.string().datetime().default('NOW()'),
});

// Update validation schema for performanceReports
export const updateperformanceReportsSchema = z
  .object({
    userId: z.string().uuid(),
    reportType: z.string(),
    periodStart: z.string().datetime(),
    periodEnd: z.string().datetime(),
    data: z.any().optional(),
    keyMetrics: z.any().optional(),
    insights: z.any().optional(),
    recommendations: z.any().optional(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    generatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for performanceReports
export const performanceReportsQuerySchema = z.object({
  userId: z.string().uuid(),
  reportType: z.string(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  data: z.any().optional(),
  keyMetrics: z.any().optional(),
  insights: z.any().optional(),
  recommendations: z.any().optional(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  generatedAt: z.string().datetime().optional().default('NOW()'),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
