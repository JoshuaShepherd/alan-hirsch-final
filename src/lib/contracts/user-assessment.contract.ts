import { z } from "zod";

// Ingress (Create/Update DTOs)
export const UserAssessmentCreateSchema = z.object({
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  completionPercentage: z.number().int().min(0).max(100).default(0),
  rawScores: z.record(z.string(), z.number()).optional(),
  totalScore: z.number().int().optional(),
  maxPossibleScore: z.number().int().optional(),
  apostolicScore: z.number().int().optional(),
  propheticScore: z.number().int().optional(),
  evangelisticScore: z.number().int().optional(),
  shepherdingScore: z.number().int().optional(),
  teachingScore: z.number().int().optional(),
  normalizedScores: z.record(z.string(), z.number()).optional(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  responseConsistency: z.number().min(0).max(1).optional(),
  completionTime: z.number().int().min(0).optional(),
  confidenceLevel: z.number().int().min(1).max(5).optional(),
  culturalAdjustmentApplied: z.boolean().default(false),
  culturalAdjustmentFactor: z.number().min(0).max(2).optional(),
  aiInsights: z.string().optional(),
  personalizedRecommendations: z.object({
    strengths: z.array(z.string()),
    growthAreas: z.array(z.string()),
    actionItems: z.array(z.string()),
    contentRecommendations: z.array(z.string()),
  }).optional(),
  suggestedPeers: z.array(z.string()).optional(),
  complementaryGifts: z.array(z.string()).optional(),
});

export const UserAssessmentUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  assessmentId: z.string().uuid().optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  completionPercentage: z.number().int().min(0).max(100).optional(),
  rawScores: z.record(z.string(), z.number()).optional(),
  totalScore: z.number().int().optional(),
  maxPossibleScore: z.number().int().optional(),
  apostolicScore: z.number().int().optional(),
  propheticScore: z.number().int().optional(),
  evangelisticScore: z.number().int().optional(),
  shepherdingScore: z.number().int().optional(),
  teachingScore: z.number().int().optional(),
  normalizedScores: z.record(z.string(), z.number()).optional(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  responseConsistency: z.number().min(0).max(1).optional(),
  completionTime: z.number().int().min(0).optional(),
  confidenceLevel: z.number().int().min(1).max(5).optional(),
  culturalAdjustmentApplied: z.boolean().optional(),
  culturalAdjustmentFactor: z.number().min(0).max(2).optional(),
  aiInsights: z.string().optional(),
  personalizedRecommendations: z.object({
    strengths: z.array(z.string()),
    growthAreas: z.array(z.string()),
    actionItems: z.array(z.string()),
    contentRecommendations: z.array(z.string()),
  }).optional(),
  suggestedPeers: z.array(z.string()).optional(),
  complementaryGifts: z.array(z.string()).optional(),
});

// Egress (API Response DTO)
export const UserAssessmentResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
  completionPercentage: z.number().int(),
  rawScores: z.record(z.string(), z.number()).nullable(),
  totalScore: z.number().int().nullable(),
  maxPossibleScore: z.number().int().nullable(),
  apostolicScore: z.number().int().nullable(),
  propheticScore: z.number().int().nullable(),
  evangelisticScore: z.number().int().nullable(),
  shepherdingScore: z.number().int().nullable(),
  teachingScore: z.number().int().nullable(),
  normalizedScores: z.record(z.string(), z.number()).nullable(),
  primaryGift: z.string().nullable(),
  secondaryGift: z.string().nullable(),
  responseConsistency: z.number().nullable(),
  completionTime: z.number().int().nullable(),
  confidenceLevel: z.number().int().nullable(),
  culturalAdjustmentApplied: z.boolean(),
  culturalAdjustmentFactor: z.number().nullable(),
  aiInsights: z.string().nullable(),
  personalizedRecommendations: z.object({
    strengths: z.array(z.string()),
    growthAreas: z.array(z.string()),
    actionItems: z.array(z.string()),
    contentRecommendations: z.array(z.string()),
  }).nullable(),
  suggestedPeers: z.array(z.string()).nullable(),
  complementaryGifts: z.array(z.string()).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserAssessmentListResponseSchema = z.object({
  data: z.array(UserAssessmentResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserAssessmentCreate = z.infer<typeof UserAssessmentCreateSchema>;
export type UserAssessmentUpdate = z.infer<typeof UserAssessmentUpdateSchema>;
export type UserAssessmentResponse = z.infer<typeof UserAssessmentResponseSchema>;
export type UserAssessmentListResponse = z.infer<typeof UserAssessmentListResponseSchema>;

