import { z } from 'zod';

// Auto-generated Zod schema for assessments
// Generated at: 2025-10-06T08:15:17.664Z

export const assessmentsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
});

export type Assessments = z.infer<typeof assessmentsEntitySchema>;
