import { z } from 'zod';

// Auto-generated Zod schema for communities
// Generated at: 2025-10-06T08:15:17.665Z

export const communitiesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
});

export type Communities = z.infer<typeof communitiesEntitySchema>;
