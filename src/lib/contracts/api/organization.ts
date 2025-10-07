// Auto-generated contracts for api
// Generated at: 2025-10-06T17:43:35.889Z

import { z } from 'zod';

// Organization request validation schema
export const organizationRequestSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),
  organizationType: z.enum([
    'church',
    'denomination',
    'seminary',
    'ministry_network',
    'nonprofit',
    'business',
    'other',
  ]),
  description: z.string().max(1000).trim().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
});
