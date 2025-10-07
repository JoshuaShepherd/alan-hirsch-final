import { z } from "zod";

// Shared enums
export const MetricTypeEnum = z.enum([
  "user_growth",
  "content_engagement",
  "assessment_completion",
  "community_activity",
  "leader_development",
  "network_expansion",
  "revenue_growth",
]);

export const PeriodTypeEnum = z.enum([
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "annual",
]);

// Ingress (Create/Update DTOs)
export const MovementMetricCreateSchema = z.object({
  region: z.string(),
  subregion: z.string().optional(),
  metricType: MetricTypeEnum,
  periodType: PeriodTypeEnum,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  value: z.number().min(0),
  previousValue: z.number().min(0).optional(),
  changePercentage: z.number().min(-100).max(100).optional(),
  breakdown: z.record(z.string(), z.number()).default({}),
  metadata: z.record(z.unknown()).default({}),
});

export const MovementMetricUpdateSchema = z.object({
  id: z.string().uuid(),
  region: z.string().optional(),
  subregion: z.string().optional(),
  metricType: MetricTypeEnum.optional(),
  periodType: PeriodTypeEnum.optional(),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  value: z.number().min(0).optional(),
  previousValue: z.number().min(0).optional(),
  changePercentage: z.number().min(-100).max(100).optional(),
  breakdown: z.record(z.string(), z.number()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Egress (API Response DTO)
export const MovementMetricResponseSchema = z.object({
  id: z.string().uuid(),
  region: z.string(),
  subregion: z.string().nullable(),
  metricType: MetricTypeEnum,
  periodType: PeriodTypeEnum,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  value: z.number(),
  previousValue: z.number().nullable(),
  changePercentage: z.number().nullable(),
  breakdown: z.record(z.string(), z.number()),
  metadata: z.record(z.unknown()),
  createdAt: z.string().datetime(),
});

// List envelope (standardized)
export const MovementMetricListResponseSchema = z.object({
  data: z.array(MovementMetricResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type MovementMetricCreate = z.infer<typeof MovementMetricCreateSchema>;
export type MovementMetricUpdate = z.infer<typeof MovementMetricUpdateSchema>;
export type MovementMetricResponse = z.infer<typeof MovementMetricResponseSchema>;
export type MovementMetricListResponse = z.infer<typeof MovementMetricListResponseSchema>;

