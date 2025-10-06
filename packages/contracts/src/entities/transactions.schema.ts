import { z } from 'zod';

// Auto-generated Zod schema for transactions
// Generated at: 2025-10-06T08:15:17.665Z

export const transactionsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  subscriptionId: z.string().nullable().optional(),
});

export type Transactions = z.infer<typeof transactionsEntitySchema>;
