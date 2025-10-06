import { z } from 'zod';

// Auto-generated Zod schema for auditLogs
// Generated at: 2025-10-06T08:15:17.665Z

export const auditLogsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().nullable().optional(),
});

export type AuditLogs = z.infer<typeof auditLogsEntitySchema>;
