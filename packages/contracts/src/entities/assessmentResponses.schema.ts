import { z } from 'zod';

// Auto-generated Zod schema for assessmentResponses
// Generated at: 2025-10-06T08:15:17.664Z

export const assessmentResponsesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userAssessmentId: z.string().nullable().optional(),
});

export type AssessmentResponses = z.infer<typeof assessmentResponsesEntitySchema>;
