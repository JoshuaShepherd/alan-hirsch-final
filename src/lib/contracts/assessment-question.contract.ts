import { z } from "zod";

// Shared enums
export const QuestionTypeEnum = z.enum([
  "likert",
  "multiple_choice",
  "binary",
  "ranking",
  "text",
]);

export const ApestDimensionEnum = z.enum([
  "apostolic",
  "prophetic",
  "evangelistic",
  "shepherding",
  "teaching",
]);

// Ingress (Create/Update DTOs)
export const AssessmentQuestionCreateSchema = z.object({
  assessmentId: z.string().uuid(),
  questionText: z.string(),
  questionType: QuestionTypeEnum,
  orderIndex: z.number().int().min(0),
  isRequired: z.boolean().default(true),
  category: z.string().optional(),
  weight: z.number().min(0).max(10).default(1.0),
  reverseScored: z.boolean().default(false),
  apestDimension: ApestDimensionEnum.optional(),
  answerOptions: z.array(z.object({
    value: z.number(),
    label: z.string(),
    description: z.string().optional(),
  })).optional(),
});

export const AssessmentQuestionUpdateSchema = z.object({
  id: z.string().uuid(),
  assessmentId: z.string().uuid().optional(),
  questionText: z.string().optional(),
  questionType: QuestionTypeEnum.optional(),
  orderIndex: z.number().int().min(0).optional(),
  isRequired: z.boolean().optional(),
  category: z.string().optional(),
  weight: z.number().min(0).max(10).optional(),
  reverseScored: z.boolean().optional(),
  apestDimension: ApestDimensionEnum.optional(),
  answerOptions: z.array(z.object({
    value: z.number(),
    label: z.string(),
    description: z.string().optional(),
  })).optional(),
});

// Egress (API Response DTO)
export const AssessmentQuestionResponseSchema = z.object({
  id: z.string().uuid(),
  assessmentId: z.string().uuid(),
  questionText: z.string(),
  questionType: QuestionTypeEnum,
  orderIndex: z.number().int(),
  isRequired: z.boolean(),
  category: z.string().nullable(),
  weight: z.number(),
  reverseScored: z.boolean(),
  apestDimension: ApestDimensionEnum.nullable(),
  answerOptions: z.array(z.object({
    value: z.number(),
    label: z.string(),
    description: z.string().optional(),
  })).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const AssessmentQuestionListResponseSchema = z.object({
  data: z.array(AssessmentQuestionResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AssessmentQuestionCreate = z.infer<typeof AssessmentQuestionCreateSchema>;
export type AssessmentQuestionUpdate = z.infer<typeof AssessmentQuestionUpdateSchema>;
export type AssessmentQuestionResponse = z.infer<typeof AssessmentQuestionResponseSchema>;
export type AssessmentQuestionListResponse = z.infer<typeof AssessmentQuestionListResponseSchema>;

