import { z } from 'zod';

// Auto-generated Zod schema for organizations
// Generated at: 2025-10-06T08:15:17.664Z

export const organizationsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
});

export type Organizations = z.infer<typeof organizationsEntitySchema>;
