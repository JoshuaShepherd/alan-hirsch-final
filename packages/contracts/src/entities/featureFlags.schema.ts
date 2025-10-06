import { z } from 'zod';

// Auto-generated Zod schema for featureFlags
// Generated at: 2025-10-06T08:15:17.665Z

export const featureFlagsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string(),
  key: z.string(),
  description: z.string().nullable().optional(),
});

export type FeatureFlags = z.infer<typeof featureFlagsEntitySchema>;
