import { z } from "zod";

// Shared enums
export const PostTypeEnum = z.enum([
  "discussion",
  "question",
  "announcement",
  "resource_share",
  "prayer_request",
  "testimony",
]);

export const PostStatusEnum = z.enum([
  "published",
  "draft",
  "pending_review",
  "flagged",
  "removed",
]);

// Ingress (Create/Update DTOs)
export const CommunityPostCreateSchema = z.object({
  communityId: z.string().uuid(),
  authorId: z.string().uuid(),
  title: z.string().optional(),
  content: z.string(),
  postType: PostTypeEnum.default("discussion"),
  parentPostId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })).default([]),
});

export const CommunityPostUpdateSchema = z.object({
  id: z.string().uuid(),
  communityId: z.string().uuid().optional(),
  authorId: z.string().uuid().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  postType: PostTypeEnum.optional(),
  parentPostId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })).optional(),
});

// Egress (API Response DTO)
export const CommunityPostResponseSchema = z.object({
  id: z.string().uuid(),
  communityId: z.string().uuid(),
  authorId: z.string().uuid(),
  title: z.string().nullable(),
  content: z.string(),
  postType: PostTypeEnum,
  parentPostId: z.string().uuid().nullable(),
  replyCount: z.number().int(),
  upvotes: z.number().int(),
  downvotes: z.number().int(),
  viewCount: z.number().int(),
  tags: z.array(z.string()),
  status: PostStatusEnum,
  flaggedCount: z.number().int(),
  moderationNotes: z.string().nullable(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
});

// List envelope (standardized)
export const CommunityPostListResponseSchema = z.object({
  data: z.array(CommunityPostResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type CommunityPostCreate = z.infer<typeof CommunityPostCreateSchema>;
export type CommunityPostUpdate = z.infer<typeof CommunityPostUpdateSchema>;
export type CommunityPostResponse = z.infer<typeof CommunityPostResponseSchema>;
export type CommunityPostListResponse = z.infer<typeof CommunityPostListResponseSchema>;

