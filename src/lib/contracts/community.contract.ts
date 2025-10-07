import { z } from "zod";

// Shared enums
export const CommunityTypeEnum = z.enum([
  "general_discussion",
  "church_planting_cohort",
  "leadership_development",
  "theological_study",
  "regional_network",
  "ministry_focus",
  "apest_group",
]);

export const CommunityVisibilityEnum = z.enum([
  "public",
  "private",
  "invite_only",
  "organization",
]);

export const ModerationLevelEnum = z.enum([
  "open",
  "moderated",
  "strict",
]);

export const CommunityStatusEnum = z.enum([
  "active",
  "inactive",
  "archived",
]);

// Ingress (Create/Update DTOs)
export const CommunityCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  communityType: CommunityTypeEnum,
  geographicFocus: z.array(z.string()).default([]),
  culturalContext: z.string().default("global"),
  languagePrimary: z.string().default("en"),
  languagesSupported: z.array(z.string()).default(["en"]),
  visibility: CommunityVisibilityEnum.default("public"),
  joinApprovalRequired: z.boolean().default(false),
  maxMembers: z.number().int().min(1).optional(),
  allowGuestPosts: z.boolean().default(false),
  moderationLevel: ModerationLevelEnum.default("moderated"),
  guidelines: z.string().optional(),
  rules: z.array(z.string()).default([]),
  createdBy: z.string().uuid(),
  moderators: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  status: CommunityStatusEnum.default("active"),
  focus: z.string().optional(),
});

export const CommunityUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  communityType: CommunityTypeEnum.optional(),
  geographicFocus: z.array(z.string()).optional(),
  culturalContext: z.string().optional(),
  languagePrimary: z.string().optional(),
  languagesSupported: z.array(z.string()).optional(),
  visibility: CommunityVisibilityEnum.optional(),
  joinApprovalRequired: z.boolean().optional(),
  maxMembers: z.number().int().min(1).optional(),
  allowGuestPosts: z.boolean().optional(),
  moderationLevel: ModerationLevelEnum.optional(),
  guidelines: z.string().optional(),
  rules: z.array(z.string()).optional(),
  createdBy: z.string().uuid().optional(),
  moderators: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  status: CommunityStatusEnum.optional(),
  focus: z.string().optional(),
});

// Egress (API Response DTO)
export const CommunityResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  communityType: CommunityTypeEnum,
  geographicFocus: z.array(z.string()),
  culturalContext: z.string(),
  languagePrimary: z.string(),
  languagesSupported: z.array(z.string()),
  visibility: CommunityVisibilityEnum,
  joinApprovalRequired: z.boolean(),
  maxMembers: z.number().int().nullable(),
  allowGuestPosts: z.boolean(),
  moderationLevel: ModerationLevelEnum,
  currentMemberCount: z.number().int(),
  memberCount: z.number().int(),
  totalPostsCount: z.number().int(),
  guidelines: z.string().nullable(),
  rules: z.array(z.string()),
  createdBy: z.string().uuid(),
  moderators: z.array(z.string()),
  isActive: z.boolean(),
  status: CommunityStatusEnum,
  focus: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const CommunityListResponseSchema = z.object({
  data: z.array(CommunityResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type CommunityCreate = z.infer<typeof CommunityCreateSchema>;
export type CommunityUpdate = z.infer<typeof CommunityUpdateSchema>;
export type CommunityResponse = z.infer<typeof CommunityResponseSchema>;
export type CommunityListResponse = z.infer<typeof CommunityListResponseSchema>;

