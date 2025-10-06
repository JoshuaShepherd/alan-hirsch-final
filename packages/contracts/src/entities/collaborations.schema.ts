import { z } from 'zod';

// Auto-generated Zod schema for collaborations
// Generated at: 2025-10-06T08:15:17.665Z

export const collaborationsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
});

export type Collaborations = z.infer<typeof collaborationsEntitySchema>;
