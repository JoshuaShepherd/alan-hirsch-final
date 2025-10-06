import { z } from 'zod';

// Auto-generated Zod schema for contentCrossReferences
// Generated at: 2025-10-06T08:15:17.664Z

export const contentCrossReferencesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  sourceContentId: z.string().nullable().optional(),
});

export type ContentCrossReferences = z.infer<typeof contentCrossReferencesEntitySchema>;
