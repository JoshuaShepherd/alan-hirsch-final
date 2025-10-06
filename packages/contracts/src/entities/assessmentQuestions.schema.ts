import { z } from 'zod';

// Auto-generated Zod schema for assessmentQuestions
// Generated at: 2025-10-06T08:15:17.664Z

export const assessmentQuestionsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  assessmentId: z.string().nullable().optional(),
});

export type AssessmentQuestions = z.infer<typeof assessmentQuestionsEntitySchema>;
