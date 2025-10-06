import { z } from 'zod';

// Auto-generated Zod schema for userNotificationStatus
// Generated at: 2025-10-06T08:15:17.666Z

export const userNotificationStatusEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string(),
});

export type UserNotificationStatus = z.infer<typeof userNotificationStatusEntitySchema>;
