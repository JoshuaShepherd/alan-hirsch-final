import { z } from 'zod';

// Auto-generated Zod schema for userSubscriptions
// Generated at: 2025-10-06T08:15:17.665Z

export const userSubscriptionsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type UserSubscriptions = z.infer<typeof userSubscriptionsEntitySchema>;
