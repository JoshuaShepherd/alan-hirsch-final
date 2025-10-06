import { z } from 'zod';

// Auto-generated Zod schema for userFeatureFlags
// Generated at: 2025-10-06T08:15:17.665Z

export const userFeatureFlagsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string(),
});

export type UserFeatureFlags = z.infer<typeof userFeatureFlagsEntitySchema>;
