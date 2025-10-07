import { z } from "zod";

// Shared enums
export const OutcomeTypeEnum = z.enum([
  "knowledge_gain",
  "skill_development",
  "behavior_change",
  "ministry_impact",
  "leadership_growth",
  "theological_understanding",
]);

export const MeasurementMethodEnum = z.enum([
  "self_reported",
  "peer_observed",
  "supervisor_confirmed",
  "objective_metric",
]);

export const VerificationMethodEnum = z.enum([
  "self",
  "peer",
  "supervisor",
  "third_party",
]);

// Ingress (Create/Update DTOs)
export const LearningOutcomeCreateSchema = z.object({
  userId: z.string().uuid(),
  contentId: z.string().uuid().optional(),
  outcomeType: OutcomeTypeEnum,
  outcomeDescription: z.string(),
  measurementMethod: MeasurementMethodEnum,
  baselineScore: z.number().int().optional(),
  currentScore: z.number().int().optional(),
  improvementPercentage: z.number().min(0).max(100).optional(),
  verifiedBy: VerificationMethodEnum.default("self"),
  verificationNotes: z.string().optional(),
  ministryContext: z.object({
    setting: z.string(),
    scope: z.string(),
    duration: z.string(),
  }).optional(),
  measuredAt: z.string().datetime(),
  followUpScheduledAt: z.string().datetime().optional(),
});

export const LearningOutcomeUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  contentId: z.string().uuid().optional(),
  outcomeType: OutcomeTypeEnum.optional(),
  outcomeDescription: z.string().optional(),
  measurementMethod: MeasurementMethodEnum.optional(),
  baselineScore: z.number().int().optional(),
  currentScore: z.number().int().optional(),
  improvementPercentage: z.number().min(0).max(100).optional(),
  verifiedBy: VerificationMethodEnum.optional(),
  verificationNotes: z.string().optional(),
  ministryContext: z.object({
    setting: z.string(),
    scope: z.string(),
    duration: z.string(),
  }).optional(),
  measuredAt: z.string().datetime().optional(),
  followUpScheduledAt: z.string().datetime().optional(),
});

// Egress (API Response DTO)
export const LearningOutcomeResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid().nullable(),
  outcomeType: OutcomeTypeEnum,
  outcomeDescription: z.string(),
  measurementMethod: MeasurementMethodEnum,
  baselineScore: z.number().int().nullable(),
  currentScore: z.number().int().nullable(),
  improvementPercentage: z.number().nullable(),
  verifiedBy: VerificationMethodEnum,
  verificationNotes: z.string().nullable(),
  ministryContext: z.object({
    setting: z.string(),
    scope: z.string(),
    duration: z.string(),
  }).nullable(),
  measuredAt: z.string().datetime(),
  followUpScheduledAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const LearningOutcomeListResponseSchema = z.object({
  data: z.array(LearningOutcomeResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type LearningOutcomeCreate = z.infer<typeof LearningOutcomeCreateSchema>;
export type LearningOutcomeUpdate = z.infer<typeof LearningOutcomeUpdateSchema>;
export type LearningOutcomeResponse = z.infer<typeof LearningOutcomeResponseSchema>;
export type LearningOutcomeListResponse = z.infer<typeof LearningOutcomeListResponseSchema>;

