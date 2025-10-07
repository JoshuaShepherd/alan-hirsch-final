// Auto-generated contracts for business
// Generated at: 2025-10-06T14:05:02.271Z

import { z } from 'zod';

// User profile with organization validation schema
export const userProfileWithOrganizationSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    ministryRole: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  organization: z.object({
    id: z.string().uuid(),
    name: z.string(),
    organizationType: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }).nullable(),
  membership: z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    organizationId: z.string().uuid(),
    role: z.string(),
    joinedAt: z.string().datetime(),
  }).nullable(),
});

// Assessment with questions validation schema
export const assessmentWithQuestionsSchema = z.object({
  assessment: z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    assessmentType: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  questions: z.array(z.object({
    id: z.string().uuid(),
    assessmentId: z.string().uuid(),
    questionText: z.string(),
    questionType: z.string(),
    order: z.number().int(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  questionCount: z.number().int().positive(),
});


