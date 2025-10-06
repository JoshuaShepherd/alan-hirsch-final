import { z } from 'zod';

// Auto-generated Zod schema for aiMessages
// Generated at: 2025-10-06T08:15:17.664Z

export const aiMessagesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  conversationId: z.string(),
});

export type AiMessages = z.infer<typeof aiMessagesEntitySchema>;
