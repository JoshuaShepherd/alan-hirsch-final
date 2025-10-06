import { z } from 'zod';

// Auto-generated Zod schema for apiKeys
// Generated at: 2025-10-06T08:15:17.666Z

export const apiKeysEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type ApiKeys = z.infer<typeof apiKeysEntitySchema>;
