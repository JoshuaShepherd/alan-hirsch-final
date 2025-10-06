import { z } from 'zod';

// Auto-generated Zod schema for aiContentJobs
// Generated at: 2025-10-06T08:15:17.664Z

export const aiContentJobsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  contentId: z.string().nullable().optional(),
});

export type AiContentJobs = z.infer<typeof aiContentJobsEntitySchema>;
