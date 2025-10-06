import { z } from 'zod';

// Auto-generated Zod schema for aiCrossReferenceSuggestions
// Generated at: 2025-10-06T08:15:17.664Z

export const aiCrossReferenceSuggestionsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  sourceContentId: z.string(),
});

export type AiCrossReferenceSuggestions = z.infer<typeof aiCrossReferenceSuggestionsEntitySchema>;
