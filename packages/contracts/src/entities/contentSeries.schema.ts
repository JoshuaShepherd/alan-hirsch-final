import { z } from 'zod';

// Auto-generated Zod schema for contentSeries
// Generated at: 2025-10-06T08:15:17.664Z

export const contentSeriesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  excerpt: z.string().nullable().optional(),
  authorId: z.string().nullable().optional(),
  collaborators: z.any().nullable().optional(),
});

export type ContentSeries = z.infer<typeof contentSeriesEntitySchema>;
