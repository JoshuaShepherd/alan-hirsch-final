import { z } from "zod";

// Shared enums
export const AssessmentTypeEnum = z.enum([
  "apest",
  "mdna",
  "cultural_intelligence",
  "leadership_style",
  "spiritual_gifts",
  "other",
]);

export const CulturalAdaptationEnum = z.enum([
  "western",
  "eastern",
  "african",
  "latin_american",
  "middle_eastern",
  "oceanic",
  "universal",
  "global",
]);

export const ScoringMethodEnum = z.enum([
  "likert_5",
  "likert_7",
  "binary",
  "ranking",
  "weighted",
]);

export const AssessmentStatusEnum = z.enum([
  "draft",
  "active",
  "archived",
  "under_review",
]);

// Ingress (Create/Update DTOs)
export const AssessmentCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  assessmentType: AssessmentTypeEnum,
  questionsCount: z.number().int().min(1),
  estimatedDuration: z.number().int().min(1).optional(),
  passingScore: z.number().int().min(0).optional(),
  version: z.string().default("1.0"),
  language: z.string().default("en"),
  culturalAdaptation: CulturalAdaptationEnum.default("universal"),
  researchBacked: z.boolean().default(false),
  validityScore: z.number().min(0).max(1).optional(),
  reliabilityScore: z.number().min(0).max(1).optional(),
  instructions: z.string().optional(),
  scoringMethod: ScoringMethodEnum.default("likert_5"),
  status: AssessmentStatusEnum.default("draft"),
});

export const AssessmentUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  assessmentType: AssessmentTypeEnum.optional(),
  questionsCount: z.number().int().min(1).optional(),
  estimatedDuration: z.number().int().min(1).optional(),
  passingScore: z.number().int().min(0).optional(),
  version: z.string().optional(),
  language: z.string().optional(),
  culturalAdaptation: CulturalAdaptationEnum.optional(),
  researchBacked: z.boolean().optional(),
  validityScore: z.number().min(0).max(1).optional(),
  reliabilityScore: z.number().min(0).max(1).optional(),
  instructions: z.string().optional(),
  scoringMethod: ScoringMethodEnum.optional(),
  status: AssessmentStatusEnum.optional(),
});

// Egress (API Response DTO)
export const AssessmentResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  assessmentType: AssessmentTypeEnum,
  questionsCount: z.number().int(),
  estimatedDuration: z.number().int().nullable(),
  passingScore: z.number().int().nullable(),
  version: z.string(),
  language: z.string(),
  culturalAdaptation: CulturalAdaptationEnum,
  researchBacked: z.boolean(),
  validityScore: z.number().nullable(),
  reliabilityScore: z.number().nullable(),
  instructions: z.string().nullable(),
  scoringMethod: ScoringMethodEnum,
  status: AssessmentStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
});

// List envelope (standardized)
export const AssessmentListResponseSchema = z.object({
  data: z.array(AssessmentResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AssessmentCreate = z.infer<typeof AssessmentCreateSchema>;
export type AssessmentUpdate = z.infer<typeof AssessmentUpdateSchema>;
export type AssessmentResponse = z.infer<typeof AssessmentResponseSchema>;
export type AssessmentListResponse = z.infer<typeof AssessmentListResponseSchema>;

