// Auto-generated contracts for api
// Generated at: 2025-10-06T14:05:02.270Z

import { z } from 'zod';

// Assessment request validation schema
export const assessmentRequestSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  assessmentType: z.enum(['apest', 'mdna', 'cultural_intelligence', 'leadership_style', 'spiritual_gifts', 'other']),
  description: z.string().max(1000).trim().optional(),
  instructions: z.string().max(2000).trim().optional(),
});

// Assessment question request validation schema
export const assessmentQuestionRequestSchema = z.object({
  assessmentId: z.string().uuid(),
  questionText: z.string().min(1).max(500).trim(),
  questionType: z.enum(['multiple_choice', 'likert_scale', 'text', 'number']),
  orderIndex: z.number().int().positive(),
  isRequired: z.boolean().default(true),
  answerOptions: z.array(z.object({
    value: z.string(),
    label: z.string(),
    score: z.number().optional(),
  })).optional(),
});

// Assessment response request validation schema
export const assessmentResponseRequestSchema = z.object({
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.number().optional(),
  responseText: z.string().max(1000).optional(),
  skipped: z.boolean().default(false),
  responseTime: z.number().positive().optional(),
  confidence: z.number().min(1).max(5).optional(),
});


