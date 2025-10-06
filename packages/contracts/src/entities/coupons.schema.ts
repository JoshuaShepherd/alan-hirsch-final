import { z } from 'zod';

// Auto-generated Zod schema for coupons
// Generated at: 2025-10-06T08:15:17.665Z

export const couponsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export type Coupons = z.infer<typeof couponsEntitySchema>;
