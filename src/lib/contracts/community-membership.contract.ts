import { z } from "zod";

// Shared enums
export const CommunityRoleEnum = z.enum([
  "member",
  "moderator",
  "admin",
  "owner",
]);

export const CommunityMembershipStatusEnum = z.enum([
  "active",
  "inactive",
  "pending",
  "banned",
  "left",
]);

// Ingress (Create/Update DTOs)
export const CommunityMembershipCreateSchema = z.object({
  userId: z.string().uuid(),
  communityId: z.string().uuid(),
  role: CommunityRoleEnum.default("member"),
  status: CommunityMembershipStatusEnum.default("pending"),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
});

export const CommunityMembershipUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  communityId: z.string().uuid().optional(),
  role: CommunityRoleEnum.optional(),
  status: CommunityMembershipStatusEnum.optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
});

// Egress (API Response DTO)
export const CommunityMembershipResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  communityId: z.string().uuid(),
  role: CommunityRoleEnum,
  status: CommunityMembershipStatusEnum,
  postsCount: z.number().int(),
  commentsCount: z.number().int(),
  lastActiveAt: z.string().datetime().nullable(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  joinedAt: z.string().datetime().nullable(),
  approvedAt: z.string().datetime().nullable(),
  leftAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const CommunityMembershipListResponseSchema = z.object({
  data: z.array(CommunityMembershipResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type CommunityMembershipCreate = z.infer<typeof CommunityMembershipCreateSchema>;
export type CommunityMembershipUpdate = z.infer<typeof CommunityMembershipUpdateSchema>;
export type CommunityMembershipResponse = z.infer<typeof CommunityMembershipResponseSchema>;
export type CommunityMembershipListResponse = z.infer<typeof CommunityMembershipListResponseSchema>;

