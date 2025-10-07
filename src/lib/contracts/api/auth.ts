// Auto-generated contracts for api
// Generated at: 2025-10-06T17:43:35.889Z

import { z } from 'zod';
import { userProfilesEntitySchema } from '../schemas/auth.js';

// Login request validation schema
export const loginRequestSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
  rememberMe: z.boolean().optional().default(false),
});

// Login response validation schema
export const loginResponseSchema = z.object({
  user: userProfilesEntitySchema,
  token: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string().datetime(),
});

// Registration request validation schema
export const registerRequestSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number'
    ),
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
  organizationId: z.string().uuid().optional(),
});

// Registration response validation schema
export const registerResponseSchema = z.object({
  user: userProfilesEntitySchema,
  token: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string().datetime(),
});
