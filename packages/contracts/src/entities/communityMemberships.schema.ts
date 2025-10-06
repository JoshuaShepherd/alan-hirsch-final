import { z } from 'zod';

// Auto-generated Zod schema for communityMemberships
// Generated at: 2025-10-06T08:15:17.665Z

export const communityMembershipsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type CommunityMemberships = z.infer<typeof communityMembershipsEntitySchema>;
