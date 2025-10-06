import { z } from 'zod';

// Auto-generated Zod schema for movementMetrics
// Generated at: 2025-10-06T08:15:17.665Z

export const movementMetricsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  region: z.string(),
  subregion: z.string().nullable().optional(),
});

export type MovementMetrics = z.infer<typeof movementMetricsEntitySchema>;
