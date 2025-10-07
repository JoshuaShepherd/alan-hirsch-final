// Auto-generated API contracts for analytics
// Generated at: 2025-10-06T20:01:40.350Z

import { z } from 'zod';
import {
  userAnalyticsEventsEntitySchema,
  createuserAnalyticsEventsSchema,
  updateuserAnalyticsEventsSchema,
  userAnalyticsEventsQuerySchema,
  userContentInteractionsEntitySchema,
  createuserContentInteractionsSchema,
  updateuserContentInteractionsSchema,
  userContentInteractionsQuerySchema,
  learningOutcomesEntitySchema,
  createlearningOutcomesSchema,
  updatelearningOutcomesSchema,
  learningOutcomesQuerySchema,
  movementMetricsEntitySchema,
  createmovementMetricsSchema,
  updatemovementMetricsSchema,
  movementMetricsQuerySchema,
  performanceReportsEntitySchema,
  createperformanceReportsSchema,
  updateperformanceReportsSchema,
  performanceReportsQuerySchema,
} from '../schemas/analytics';

// API schemas for analytics
// API request/response schemas for userAnalyticsEvents
export const userAnalyticsEventsApiRequestSchema = createuserAnalyticsEventsSchema;
export const userAnalyticsEventsApiResponseSchema = userAnalyticsEventsEntitySchema;
export const userAnalyticsEventsApiUpdateSchema = updateuserAnalyticsEventsSchema;
export const userAnalyticsEventsApiQuerySchema = userAnalyticsEventsQuerySchema;

// API request/response schemas for userContentInteractions
export const userContentInteractionsApiRequestSchema = createuserContentInteractionsSchema;
export const userContentInteractionsApiResponseSchema = userContentInteractionsEntitySchema;
export const userContentInteractionsApiUpdateSchema = updateuserContentInteractionsSchema;
export const userContentInteractionsApiQuerySchema = userContentInteractionsQuerySchema;

// API request/response schemas for learningOutcomes
export const learningOutcomesApiRequestSchema = createlearningOutcomesSchema;
export const learningOutcomesApiResponseSchema = learningOutcomesEntitySchema;
export const learningOutcomesApiUpdateSchema = updatelearningOutcomesSchema;
export const learningOutcomesApiQuerySchema = learningOutcomesQuerySchema;

// API request/response schemas for movementMetrics
export const movementMetricsApiRequestSchema = createmovementMetricsSchema;
export const movementMetricsApiResponseSchema = movementMetricsEntitySchema;
export const movementMetricsApiUpdateSchema = updatemovementMetricsSchema;
export const movementMetricsApiQuerySchema = movementMetricsQuerySchema;

// API request/response schemas for performanceReports
export const performanceReportsApiRequestSchema = createperformanceReportsSchema;
export const performanceReportsApiResponseSchema = performanceReportsEntitySchema;
export const performanceReportsApiUpdateSchema = updateperformanceReportsSchema;
export const performanceReportsApiQuerySchema = performanceReportsQuerySchema;

