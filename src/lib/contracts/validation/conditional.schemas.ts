// Auto-generated contracts for validation
// Generated at: 2025-10-06T14:05:02.271Z

import { z } from 'zod';

// Conditional user validation schema
export const conditionalUserSchema = z.object({
  type: z.enum(['individual', 'organization']),
  data: z.union([
    z.object({ type: z.literal('individual'), profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
    }) }),
    z.object({ type: z.literal('organization'), organization: z.object({
      name: z.string(),
      organizationType: z.string(),
    }) })
  ])
});

// Conditional content validation schema
export const conditionalContentSchema = z.object({
  contentType: z.enum(['article', 'video', 'podcast']),
  content: z.union([
    z.object({ contentType: z.literal('article'), text: z.string() }),
    z.object({ contentType: z.literal('video'), videoUrl: z.string().url() }),
    z.object({ contentType: z.literal('podcast'), audioUrl: z.string().url() })
  ])
});


