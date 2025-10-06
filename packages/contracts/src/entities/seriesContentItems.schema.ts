import { z } from 'zod';

// Auto-generated Zod schema for seriesContentItems
// Generated at: 2025-10-06T08:15:17.664Z

export const seriesContentItemsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  seriesId: z.string().nullable().optional(),
});

export type SeriesContentItems = z.infer<typeof seriesContentItemsEntitySchema>;
