import { z } from 'zod';

// Auto-generated Zod schema for userProfiles
// Generated at: 2025-10-06T08:15:17.664Z

export const userProfilesEntitySchema = z.object({
  id: z.string().nullable().optional(),
  email: z.string(),
  passwordHash: z.string().nullable().optional(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
});

export type UserProfiles = z.infer<typeof userProfilesEntitySchema>;
