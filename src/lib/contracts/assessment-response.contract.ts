import { z } from "zod";

// Ingress (Create/Update DTOs)
export const AssessmentResponseCreateSchema = z.object({
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.number().int().optional(),
  responseText: z.string().optional(),
  responseTime: z.number().int().min(0).optional(),
  confidence: z.number().int().min(1).max(5).optional(),
  skipped: z.boolean().default(false),
});

export const AssessmentResponseUpdateSchema = z.object({
  id: z.string().uuid(),
  userAssessmentId: z.string().uuid().optional(),
  questionId: z.string().uuid().optional(),
  responseValue: z.number().int().optional(),
  responseText: z.string().optional(),
  responseTime: z.number().int().min(0).optional(),
  confidence: z.number().int().min(1).max(5).optional(),
  skipped: z.boolean().optional(),
});

// Egress (API Response DTO)
export const AssessmentResponseResponseSchema = z.object({
  id: z.string().uuid(),
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.number().int().nullable(),
  responseText: z.string().nullable(),
  responseTime: z.number().int().nullable(),
  confidence: z.number().int().nullable(),
  skipped: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const AssessmentResponseListResponseSchema = z.object({
  data: z.array(AssessmentResponseResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AssessmentResponseCreate = z.infer<typeof AssessmentResponseCreateSchema>;
export type AssessmentResponseUpdate = z.infer<typeof AssessmentResponseUpdateSchema>;
export type AssessmentResponseResponse = z.infer<typeof AssessmentResponseResponseSchema>;
export type AssessmentResponseListResponse = z.infer<typeof AssessmentResponseListResponseSchema>;

