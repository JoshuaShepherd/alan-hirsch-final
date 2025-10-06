import { z } from 'zod';

// Auto-generated Zod schema for theologicalConcepts
// Generated at: 2025-10-06T08:15:17.665Z

export const theologicalConceptsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string(),
  slug: z.string(),
  definition: z.string().nullable().optional(),
});

export type TheologicalConcepts = z.infer<typeof theologicalConceptsEntitySchema>;
