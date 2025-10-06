import { z } from 'zod';

// Auto-generated Zod schema for contentItems
// Generated at: 2025-10-06T08:15:17.664Z

export const contentItemsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  authorId: z.string().nullable().optional(),
  coAuthors: z.any().nullable().optional(),
});

export type ContentItems = z.infer<typeof contentItemsEntitySchema>;
