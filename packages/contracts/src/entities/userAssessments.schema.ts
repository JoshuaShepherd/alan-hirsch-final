import { z } from 'zod';

// Auto-generated Zod schema for userAssessments
// Generated at: 2025-10-06T08:15:17.664Z

export const userAssessmentsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type UserAssessments = z.infer<typeof userAssessmentsEntitySchema>;
