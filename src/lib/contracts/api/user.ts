// Auto-generated contracts for api
// Generated at: 2025-10-06T17:43:35.889Z

import { z } from 'zod';

// User profile request validation schema
export const userProfileRequestSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  ministryRole: z.enum([
    'senior_pastor',
    'associate_pastor',
    'church_planter',
    'denominational_leader',
    'seminary_professor',
    'seminary_student',
    'ministry_staff',
    'missionary',
    'marketplace_minister',
    'nonprofit_leader',
    'consultant',
    'academic_researcher',
    'emerging_leader',
    'other',
  ]),
  bio: z.string().max(1000).trim().optional(),
  avatarUrl: z.string().url().optional(),
});

// User list query validation schema
export const userListQuerySchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  ministryRole: z
    .enum([
      'senior_pastor',
      'associate_pastor',
      'church_planter',
      'denominational_leader',
      'seminary_professor',
      'seminary_student',
      'ministry_staff',
      'missionary',
      'marketplace_minister',
      'nonprofit_leader',
      'consultant',
      'academic_researcher',
      'emerging_leader',
      'other',
    ])
    .optional(),
  country: z.string().length(2).optional(),
  search: z.string().min(2).max(100).optional(),
});
