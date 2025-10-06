import { z } from 'zod';

// Auto-generated Zod schema for learningOutcomes
// Generated at: 2025-10-06T08:15:17.665Z

export const learningOutcomesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type LearningOutcomes = z.infer<typeof learningOutcomesEntitySchema>;
