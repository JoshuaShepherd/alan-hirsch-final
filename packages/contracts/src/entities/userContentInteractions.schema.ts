import { z } from 'zod';

// Auto-generated Zod schema for userContentInteractions
// Generated at: 2025-10-06T08:15:17.665Z

export const userContentInteractionsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type UserContentInteractions = z.infer<typeof userContentInteractionsEntitySchema>;
