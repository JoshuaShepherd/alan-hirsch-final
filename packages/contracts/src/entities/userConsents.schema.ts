import { z } from 'zod';

// Auto-generated Zod schema for userConsents
// Generated at: 2025-10-06T08:15:17.666Z

export const userConsentsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string(),
});

export type UserConsents = z.infer<typeof userConsentsEntitySchema>;
