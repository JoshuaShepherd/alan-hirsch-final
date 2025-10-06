import { z } from 'zod';

// Auto-generated Zod schema for aiConversations
// Generated at: 2025-10-06T08:15:17.664Z

export const aiConversationsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string(),
});

export type AiConversations = z.infer<typeof aiConversationsEntitySchema>;
