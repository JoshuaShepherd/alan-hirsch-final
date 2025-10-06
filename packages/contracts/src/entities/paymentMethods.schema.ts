import { z } from 'zod';

// Auto-generated Zod schema for paymentMethods
// Generated at: 2025-10-06T08:15:17.665Z

export const paymentMethodsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type PaymentMethods = z.infer<typeof paymentMethodsEntitySchema>;
