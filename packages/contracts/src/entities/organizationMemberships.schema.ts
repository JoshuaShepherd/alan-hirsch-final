import { z } from 'zod';

// Auto-generated Zod schema for organizationMemberships
// Generated at: 2025-10-06T08:15:17.664Z

export const organizationMembershipsEntitySchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
});

export type OrganizationMemberships = z.infer<typeof organizationMembershipsEntitySchema>;
