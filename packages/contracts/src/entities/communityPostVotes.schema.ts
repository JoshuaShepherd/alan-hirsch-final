import { z } from 'zod';

// Auto-generated Zod schema for communityPostVotes
// Generated at: 2025-10-06T08:15:17.665Z

export const communityPostVotesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  postId: z.string().nullable().optional(),
});

export type CommunityPostVotes = z.infer<typeof communityPostVotesEntitySchema>;
