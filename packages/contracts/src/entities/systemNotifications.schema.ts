import { z } from 'zod';

// Auto-generated Zod schema for systemNotifications
// Generated at: 2025-10-06T08:15:17.666Z

export const systemNotificationsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string(),
  message: z.string(),
});

export type SystemNotifications = z.infer<typeof systemNotificationsEntitySchema>;
