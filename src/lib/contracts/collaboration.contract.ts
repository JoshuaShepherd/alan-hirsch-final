import { z } from "zod";

// Shared enums
export const CollaborationTypeEnum = z.enum([
  "content_creation",
  "research_project",
  "course_development",
  "book_writing",
  "event_planning",
]);

export const RevenueShareModelEnum = z.enum([
  "equal",
  "weighted",
  "lead_majority",
  "custom",
]);

export const CollaborationStatusEnum = z.enum([
  "planning",
  "active",
  "review",
  "completed",
  "cancelled",
]);

// Ingress (Create/Update DTOs)
export const CollaborationCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  collaborationType: CollaborationTypeEnum,
  leadAuthorId: z.string().uuid(),
  collaborators: z.array(z.object({
    userId: z.string(),
    role: z.string(),
    revenueShare: z.number().min(0).max(100),
    joinedAt: z.string().datetime(),
  })).default([]),
  revenueShareModel: RevenueShareModelEnum.default("equal"),
  totalRevenueShare: z.number().int().min(0).max(100).default(100),
  status: CollaborationStatusEnum.default("planning"),
  startDate: z.string().datetime().optional(),
  targetCompletionDate: z.string().datetime().optional(),
  expectedDeliverables: z.array(z.object({
    type: z.string(),
    description: z.string(),
    dueDate: z.string().datetime(),
    completed: z.boolean(),
  })).default([]),
  networkAmplificationGoal: z.number().int().min(0).optional(),
  communicationChannels: z.array(z.object({
    type: z.string(),
    url: z.string(),
    primary: z.boolean(),
  })).default([]),
});

export const CollaborationUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  collaborationType: CollaborationTypeEnum.optional(),
  leadAuthorId: z.string().uuid().optional(),
  collaborators: z.array(z.object({
    userId: z.string(),
    role: z.string(),
    revenueShare: z.number().min(0).max(100),
    joinedAt: z.string().datetime(),
  })).optional(),
  revenueShareModel: RevenueShareModelEnum.optional(),
  totalRevenueShare: z.number().int().min(0).max(100).optional(),
  status: CollaborationStatusEnum.optional(),
  startDate: z.string().datetime().optional(),
  targetCompletionDate: z.string().datetime().optional(),
  actualCompletionDate: z.string().datetime().optional(),
  expectedDeliverables: z.array(z.object({
    type: z.string(),
    description: z.string(),
    dueDate: z.string().datetime(),
    completed: z.boolean(),
  })).optional(),
  networkAmplificationGoal: z.number().int().min(0).optional(),
  actualNetworkImpact: z.number().int().min(0).optional(),
  communicationChannels: z.array(z.object({
    type: z.string(),
    url: z.string(),
    primary: z.boolean(),
  })).optional(),
});

// Egress (API Response DTO)
export const CollaborationResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  collaborationType: CollaborationTypeEnum,
  leadAuthorId: z.string().uuid(),
  collaborators: z.array(z.object({
    userId: z.string(),
    role: z.string(),
    revenueShare: z.number(),
    joinedAt: z.string(),
  })),
  revenueShareModel: RevenueShareModelEnum,
  totalRevenueShare: z.number().int(),
  status: CollaborationStatusEnum,
  startDate: z.string().datetime().nullable(),
  targetCompletionDate: z.string().datetime().nullable(),
  actualCompletionDate: z.string().datetime().nullable(),
  expectedDeliverables: z.array(z.object({
    type: z.string(),
    description: z.string(),
    dueDate: z.string(),
    completed: z.boolean(),
  })),
  networkAmplificationGoal: z.number().int().nullable(),
  actualNetworkImpact: z.number().int().nullable(),
  communicationChannels: z.array(z.object({
    type: z.string(),
    url: z.string(),
    primary: z.boolean(),
  })),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const CollaborationListResponseSchema = z.object({
  data: z.array(CollaborationResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type CollaborationCreate = z.infer<typeof CollaborationCreateSchema>;
export type CollaborationUpdate = z.infer<typeof CollaborationUpdateSchema>;
export type CollaborationResponse = z.infer<typeof CollaborationResponseSchema>;
export type CollaborationListResponse = z.infer<typeof CollaborationListResponseSchema>;

