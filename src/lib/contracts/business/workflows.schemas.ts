// Auto-generated contracts for business
// Generated at: 2025-10-06T14:05:02.271Z

import { z } from 'zod';

// Assessment workflow validation schema
export const assessmentWorkflowSchema = z.object({
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'abandoned']),
  currentQuestionIndex: z.number().int().nonnegative(),
  responses: z.array(z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    assessmentId: z.string().uuid(),
    questionId: z.string().uuid(),
    responseValue: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
});

// Content publishing workflow validation schema
export const contentPublishingWorkflowSchema = z.object({
  contentId: z.string().uuid(),
  status: z.enum(['draft', 'review', 'approved', 'published', 'rejected']),
  reviewerId: z.string().uuid().nullable(),
  reviewNotes: z.string().max(1000).nullable(),
  scheduledPublishAt: z.string().datetime().nullable(),
});


