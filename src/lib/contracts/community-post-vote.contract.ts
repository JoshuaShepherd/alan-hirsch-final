import { z } from "zod";

// Shared enums
export const VoteTypeEnum = z.enum([
  "upvote",
  "downvote",
]);

// Ingress (Create/Update DTOs)
export const CommunityPostVoteCreateSchema = z.object({
  postId: z.string().uuid(),
  userId: z.string().uuid(),
  voteType: VoteTypeEnum,
});

export const CommunityPostVoteUpdateSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  voteType: VoteTypeEnum.optional(),
});

// Egress (API Response DTO)
export const CommunityPostVoteResponseSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  userId: z.string().uuid(),
  voteType: VoteTypeEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const CommunityPostVoteListResponseSchema = z.object({
  data: z.array(CommunityPostVoteResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type CommunityPostVoteCreate = z.infer<typeof CommunityPostVoteCreateSchema>;
export type CommunityPostVoteUpdate = z.infer<typeof CommunityPostVoteUpdateSchema>;
export type CommunityPostVoteResponse = z.infer<typeof CommunityPostVoteResponseSchema>;
export type CommunityPostVoteListResponse = z.infer<typeof CommunityPostVoteListResponseSchema>;

