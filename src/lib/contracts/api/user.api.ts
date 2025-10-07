// Auto-generated contracts for api
// Generated at: 2025-10-06T14:05:02.270Z

import { z } from 'zod';

// User profile request validation schema
export const userProfileRequestSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  ministryRole: z.enum(['senior_pastor', 'associate_pastor', 'church_planter', 'denominational_leader', 'seminary_professor', 'ministry_leader', 'lay_leader', 'missionary', 'other']),
  bio: z.string().max(1000).trim().optional(),
  avatarUrl: z.string().url().optional(),
});

// User list query validation schema
export const userListQuerySchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  ministryRole: z.enum(['senior_pastor', 'associate_pastor', 'church_planter', 'denominational_leader', 'seminary_professor', 'ministry_leader', 'lay_leader', 'missionary', 'other']).optional(),
  country: z.string().length(2).optional(),
  search: z.string().min(2).max(100).optional(),
});

// User profile response validation schema
export const userProfileResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  ministryRole: z.enum(['senior_pastor', 'associate_pastor', 'church_planter', 'denominational_leader', 'seminary_professor', 'ministry_leader', 'lay_leader', 'missionary', 'other']),
  bio: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});


