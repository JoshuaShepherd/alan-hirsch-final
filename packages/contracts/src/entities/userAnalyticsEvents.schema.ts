import { z } from 'zod';

// Auto-generated Zod schema for userAnalyticsEvents
// Generated at: 2025-10-06T08:15:17.665Z

export const userAnalyticsEventsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type UserAnalyticsEvents = z.infer<typeof userAnalyticsEventsEntitySchema>;
