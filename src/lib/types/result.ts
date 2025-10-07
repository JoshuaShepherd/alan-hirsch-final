import { z } from 'zod';

export type Result<T, E = { code: string; message: string }> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
});
